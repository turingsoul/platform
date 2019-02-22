

	const rightArrow = (slipArrowObj)=>{
        let labelNameLength = slipArrowObj.labelNameList.length;

	    if(!slipArrowObj.labelNameList[labelNameLength-1].pluginPath){

	      slipArrowObj.fileName.push(slipArrowObj.labelNameList.pathName);
	      slipArrowObj.folderPath.push(slipArrowObj.labelNameList.pathName);
	      slipArrowObj.pluginPathParam.push(slipArrowObj.labelNameList.pathName);
	      slipArrowObj.labelNameList.pop();

	    }else if(slipArrowObj.labelNameList[labelNameLength-1].pluginPath){

	      slipArrowObj.pluginPathParam.push(slipArrowObj.labelNameList.pluginPath);                     
	      var nameParam = (slipArrowObj.labelNameList.pluginPath).substr(slipArrowObj.labelNameList.pluginPath.lastIndexOf('/')+1,slipArrowObj.labelNameList.pluginPath.length);
	      slipArrowObj.fileName.push(nameParam);
	      slipArrowObj.folderPath.push((slipArrowObj.labelNameList.pluginPath).substr(0,slipArrowObj.labelNameList.pluginPath.lastIndexOf('/')));                                  
	      slipArrowObj.labelNameList.pop();

	    }
	    
    }
    const leftArrow = (slipArrowObj)=>{
	                  
    } 

export {rightArrow,leftArrow};