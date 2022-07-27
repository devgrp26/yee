// Method to upload a valid excel file


const excelToJson = function(){

    let vdata=[]


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

                    vdata=result
                  }
                }
              );
              

              let t = setInterval(()=>{
                if(vdata){
                  console.log('success!')
                  clearInterval(t)
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
            let ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();



            const excelFiles = ['.xls','.xlsx','.csv','.xlsb']

            if(excelFiles.indexOf(ext)!=-1){
              ej(files[0])
            }
            else{
              alert("Please select a valid excel file.");
            }
        },
        
        getData:()=>{
            return vdata
        }
    }
}
