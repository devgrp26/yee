// Method to upload a valid excel file


const excelToJson = function(){

    let data=[]


    const ej = function(file){
      //return void
          try {
              let reader = new FileReader();
              reader.readAsBinaryString(file);
              reader.onload = function(e) {
                let data = e.target.result;
                let workbook = XLSX.read(data, {
                  type : 'binary'
                }
              );
                let result = {};
                workbook.SheetNames.forEach(function(sheetName) {
                  let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                  if (roa.length > 0) {
                    result[sheetName] = roa;
                  }
                }
              );
              
              console.log(result)
              

              let t = setInterval(()=>{
                if(data){
                  clearInterval(t)
                  alert(true)
                }
              },1000)

              

                //displaying the json result
               /*  let resultEle=document.getElementById("json-result");
                resultEle.value=JSON.stringify(result, null, 4);
                resultEle.style.display='block'; */
              }
            }
            catch(e){
              console.error(`Exception Error:${e.toString()}`);
            }
      }
    return {
        upload:(fileInputId)=>{
        
        //return void
            let files = document.getElementById(String(fileInputId)).files;
            if(files.length==0){
              alert("Please choose any file...");
              return;
            }
            let filename = files[0].name;
            let extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();


            
            if (extension == '.XLS' || extension == '.XLSX') {
              ej(files[0])
            }
            else{
              alert("Please select a valid excel file.");
            }
        },
        
        getData:()=>{
            return data
        }
    }
}
