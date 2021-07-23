import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionpaperService } from '../../../../services/questionpaper/questionpaper.service';

@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.css']
})
export class QuestionpaperComponent implements OnInit {

  paperId:string = '';
  questionPaper:any;
  letters:string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q,','r','s','t','u','v','w','x','y','z']
  headerSection:any = ""

  constructor(private route:ActivatedRoute,private qpservice:QuestionpaperService) { }

  ngOnInit(): void {
    this.paperId = this.route.snapshot.paramMap.get('paperId');
    this.qpservice.getQuestionPaperById(this.paperId).subscribe((res)=>{
      console.log(res);
      this.questionPaper = JSON.parse(res.data.paper);
    })
  }

  paperprint(){
    var divContents = document.querySelector(".printdiv").innerHTML; 
    var a = window.open('', '', 'width=680'); 
    a.document.write('<html><body>'); 
    a.document.write(divContents); 
    a.document.write('</body></html>');
    a.print();
    a.document.close();
}

  wordGenerate() {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.querySelector('.main').innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    var filename = 'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
  };

}
