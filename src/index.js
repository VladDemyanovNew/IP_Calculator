
var Long = require("long");
 
let ip = "192.168.89.16";
let mask = "255.255.0.0";

let subnet, host, broadcast, ip_, mask_;

function main() {
    mask = mask.split(".");
    ip   = ip.split(".");

    if (ip.find(CheckAddress) != undefined)
        console.log("Вы ввели неправильный IP!");
    else if (mask.find(CheckAddress) != undefined || CheckMask(mask))
        console.log("Вы ввели неправильную маску!");
    else {
        mask_ = Long.fromNumber(binFromStr(mask));
        ip_   = Long.fromNumber(binFromStr(ip));
        subnet = ip_.and(mask_);
        host = ip_.and(mask_.not());
        broadcast = ip_.and(mask_).or(Long.fromInt(mask_).not());
    
        ip = ip.join(".");
        mask = mask.join(".");
    
        console.log("IP:\t" + ip);
        console.log("MASK:\t" + mask);
        console.log("SUBNET:\t" + strFromBin(subnet.toString(2)));
        console.log("HOST:\t" + strFromBin(host.toString(2)));
        console.log("BROADCAST:\t" + strFromBin(broadcast.toString(2)));
    }
}

main();

function strFromBin(address) {
    let n = address.length;
    if (address.length != 32)
    {
        let str = "0".repeat(32 - n);
        address = str + address;
    }
    return address.match(/.{1,8}/g).map(item => parseInt(item, 2)).join(".");
}

function binFromStr(address) {
    address = address.map(item => {
        let n = ((+item).toString(2)).length;
        if (n < 8)
        {
            let str = "0".repeat(8 - n);
            return str + (+item).toString(2);
        }
        else
        {
            return (+item).toString(2);
        }
    });
    return parseInt(address.join(""), 2);
}

function CheckAddress (item, index, array) {
    if (item.length > 3 || array.length != 4 || !isFinite(item) || item.includes(" ") || item === "" || +item > 255 || +item < 0)
        return true;
};

function CheckMask (address) {
    address = (Long.fromNumber(binFromStr(address))).toString(2);
    let n = address.length;
    if (address.length != 32)
    {
        let str = "0".repeat(32 - n);
        address = str + address;
    }
    
    if (address.includes("01"))
    {
        console.log("Warning:\t" + address);
        return true;    
    }     
    else
        return false;      
};