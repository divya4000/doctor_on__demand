const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

exports.getPDF = async (file) => {
    file = file.trim();
  let readFileSync = fs.readFileSync(path.resolve(__dirname, file));
  try {
    let pdfExtract = await pdfParse(readFileSync)
    const data = pdfExtract.text.split('\n').slice(2,);
    console.log(data);
    const res = {};
    data.map(lines => {
        lines = lines.trim();
        // console.log(lines);
        if(lines.length !== 0){
            const head = lines.split(': ')[0].toLowerCase();
            const val = lines.split(': ')[1];
            if(head === 'email' || head === 'name'){
                //nothing to do
            }
            else{
                switch(head){
                    case "lastvisiteddate": res.lastVisitedDate = val;
                                            break;
                    case "address": res.address = val;
                                            break;
                    case "doctorid": res.doctorId = val;
                                            break;
                    case "diagnosis": res.diagnosis = val;
                                            break;
                    case "study": res.study = val;
                                            break;
                    case "advice": res.advice = val;
                                            break;
                    case "startdate": res.startDate = val;
                                            break;
                    case "end": res.endDate = val;
                                            break;
                    case "gender": res.gender = val;
                                            break;
                    case "age": res.age = val;
                                            break;
                    case "description": res.description = val;
                                            break;
                    case "mobile": res.mobile = val;
                                            break;
                    case "prescription": res.prescription = val;
                                            break;
                    case "doctorname": res.doctorName = val;
                                            break;
                    case "medicine": const meds = [];
                                    val.split(', ').map(med => {
                                        const name = med.split(' ')[0], qty = med.split(' ')[1], time = med.split(' ')[2];
                                        meds.push({time: time, dose: qty, name: name});
                                    });
                                    res.medicines = meds;
                                   break;
                    default: console.log('wrong type', head); 
                }
            }
        }
    });
    // console.log(res);
    return res;
  } catch (error) {
    throw new Error(error)
  }
}

// getPDF('../reports/somone-patient (1).pdf')