const path=require("path");
const fs=require("fs");
const crypto = require('crypto');
/**
 * @Description：生成全局唯一id
 * @Author：qinzhen
 * @Date：2021-06-22
*/
const guid=()=> {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};
/**
 * @Description：md5值计算
 * @Author：qinzhen
 * @Date：2021-06-17
*/
const MD5=(text)=>{
  let m = crypto.createHash('md5');
  m.update(text, 'utf8');
  return m.digest('hex').toLowerCase();
};
/**
 * @Description：获取文件夹目录
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const getFolderContents=(folder,fPath)=>{
  const distPath=path.join(fPath,folder);
  const isExist=fs.existsSync(distPath);
  if(!isExist){
    console.error('文件夹路径错误');
    return null;
  }
  let stat = fs.statSync(distPath);
  if(stat.isDirectory()){
    const contents=[];
    const files = fs.readdirSync(distPath);
    files.forEach((item)=>{
      const itemPath=path.join(fPath,folder,item);
      const fileStat=fs.statSync(itemPath);
      const file={
        id:MD5(itemPath),
        name:item,
        type:"file",
        path:itemPath,
        birthtime:fileStat.birthtime,
        mtime:fileStat.mtime
      };
      if(fileStat.isDirectory()){
        file.type='folder';
      }else {
        file.size=fileStat.size;
      }
      contents.push(file)
    });
    return contents;
  }else {
    console.error("该路径不是一个文件夹")
    return null;
  }
};
/**
 * @Description：获取目录树结构
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const getFolderTree=(folder,fPath,deep=0)=>{
  const distPath=path.join(fPath,folder);
  const isExist=fs.existsSync(distPath);
  if(!isExist){
    return [];
  }
  const files = fs.readdirSync(distPath);
  const arr=[];
  files.forEach((item)=>{
    let curPath = path.join(fPath,folder,item);
    let itemPath=path.join(folder,item);
    let stat = fs.statSync(curPath);
    let file={
      id:MD5(curPath),
      name:item,
      type:"file",
      path:itemPath,
      birthtime:stat.birthtime,
      mtime:stat.mtime,
      deep:deep
    };
    if(stat.isDirectory()){
      file.type='folder';
      file.children=getFolderTree(file.path,fPath,deep+1);
      file.isOpen=false;
    }else {
      file.size=stat.size;
    }
    arr.push(file)
  });
  return arr.sort((a,b)=>{
    if(a.type==='folder'&&b.type==='folder'){
      return 0
    }
    if(a.type!=='folder'&&b.type==='folder'){
      return 1
    }
    if(a.type==='folder'&&b.type!=='folder'){
      return -1
    }
    return 0
  });
};
/**
 * @Description：遍历文件目录树
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const forEachTree= (trees,fn,deep=0)=>{
  trees.forEach((node)=>{
    fn(node,deep);
    if(node.children&&node.children.length>0){
      forEachTree(node.children,fn,deep+1)
    }
  })
}
/**
 * @Description：打印目录树结构
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const logTree=(trees)=>{
  forEachTree(trees,(node,deep)=>{
    let pre="├─";
    for (let i = 0; i < deep; i++) {
      if(i<(deep-1)){
        pre+="| ";
      }else {
        pre+="├-";
      }
    }
    if(deep===0){
      pre="├─"
    }
    console.log(pre+node.name);
  });
};
/**
 * @Description：map遍历目录树返会新的目录树
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const mapTree=(trees,fn,deep=0) => {
  return trees.map((node) => {
    let item=fn(node,deep);
    if(node.children&&node.children.length>0){
      item.children=mapTree(node.children,fn,deep+1)
    }
    return item;
  })
};
/**
 * @Description：过滤目录树结构返回新的目录树
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const filterTree=(trees,fn,deep=0) => {
  return trees.filter((node) => {
    if(node.children&&node.children.length>0){
      let list=filterTree(node.children,fn,deep+1);
      if(list.length>0){
        return true
      }else {
        node.children=list;
        return fn(node,deep)
      }
    }else {
      return fn(node,deep);
    }
  })
};
/**
 * @Description：生成公钥和私钥
 * @Author：qinzhen
 * @Date：2021-06-10
*/
const generateKey=() => {
  const generate=crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
  return {
    publicKey:generate.publicKey.toString('ascii'),
    privateKey:generate.privateKey.toString('ascii')
  }
};
/**
 * @Description：公钥加密
 * @Author：qinzhen
 * @Date：2021-03-31
 */
const pubEncrypt=(publicKey,text)=>{
  return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
};
/**
 * @Description：私钥解密
 * @Author：qinzhen
 * @Date：2021-03-31
 */
const priDecrypt=(privateKey,ciphertext)=>{
  return crypto.privateDecrypt(privateKey, Buffer.from(ciphertext.toString('base64'), 'base64'));
};
/**
 * @Description：AES192解密算法
 * @Author：qinzhen
 * @Date：2021-03-31
 */
const decrypt=function(encrypted,key){
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
/**
 * @Description：AES192加密算法
 * @Author：qinzhen
 * @Date：2021-03-31
 */
const encrypt=function(data,key){
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};
/**
 * @Description：获取文件的hash值
 * @Author：qinzhen
 * @Date：2021-05-21
 */
const getFileHash=(filePath)=> {
  return new Promise((resolve, reject) => {
    let stream=fs.createReadStream(filePath);
    let fsHash=crypto.createHash("md5");
    stream.on("data",(d)=>{
      fsHash.update(d);
    })
    stream.on('error',(err)=>{
      reject(err)
      console.log(err);
    })
    stream.on("end",()=>{
      let md5=fsHash.digest("hex");
      console.log(md5)
      resolve(md5)
    })
  })
};
/**
 * @Description：id与pid的关系列表生成树形结构数据
 * @Author：qinzhen
 * @Date：2021-06-22
*/
const generateTree=(items) => {
  let map={};
  let result=[];
  items.forEach((item) => {
    map[item.id]=item;
  });
  items.forEach((item) => {
    const parent=map[item.pid];
    if(parent){
      if(!parent.children){
        parent.children=[];
      }
      parent.children.push(item)
    }else {
      result.push(item)
    }
  });
  return result;
};
// 下划线转换驼峰
const toHump=(name)=> {
  return name.replace(/_(\w)/g, function(all, letter){
    return letter.toUpperCase();
  });
}
//下划线转驼峰
const toLine=(name)=>{
  return name.replace(/([A-Z])/g,(all,letter) => {
    return '_'+letter.toLowerCase();
  })
}
/**
 * @Description：获取计算机外部IPv4地址信息
 * @Author：qinzhen
 * @Date：2021-03-31
 */
const getNetworkIPv4=()=>{
  const os = require("os");
  const network=os.networkInterfaces();
  let ips=[];
  for (const key in network) {
    ips=ips.concat(network[key])
  }
  return ips.filter((item)=>{
    return item.family==='IPv4'&&!item.internal;
  })[0]
};
module.exports={
  guid,
  MD5,
  toHump,
  toLine,
  getFolderContents,
  getFolderTree,
  forEachTree,
  logTree,
  mapTree,
  filterTree,
  generateKey,
  pubEncrypt,
  priDecrypt,
  decrypt,
  encrypt,
  getFileHash,
  generateTree,
  getNetworkIPv4
};
