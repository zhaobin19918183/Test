export const getTimeChange=(d1)=>{
	//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    let dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000))//计算出小时数
    //计算相差分钟数
    let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
    //计算相差秒数
    let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000)

    let value = '刚刚'
    if(dayDiff!=0){
        value=`${dayDiff}天前`
    } else if(hours!=0){
        value=`${hours}小时前`
    } else if(minutes!=0){
        value=`${minutes}分钟前`
    }
    return value
    // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
    // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
    //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
}