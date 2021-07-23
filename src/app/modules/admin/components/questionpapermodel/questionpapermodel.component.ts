import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
// import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor/jsoneditor/jsoneditor.component';
@Component({
    selector: 'app-questionpapermodel',
    templateUrl: './questionpapermodel.component.html',
    styleUrls: ['./questionpapermodel.component.css']
})
export class QuestionpapermodelComponent implements OnInit {

    public editorOptions: JsonEditorOptions;
    public data: any;
    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

    constructor() {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
        this.editorOptions.expandAll = true;
        this.editorOptions.mainMenuBar = true;
        this.editorOptions.mode = "code";
        this.data = {
            "model": {
                "scheme2017": {
                    "internal": {
                        "headerSection": {
                            "regNo": 10,
                            "headerDetails": {
                                "title": "G.PULLAREDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL",
                                "examDetails": "",
                                "sessional": "",
                                "department": "",
                                "subject": "",
                                "scheme": ""
                            },
                            "examDetails": {
                                "time": "2 hours",
                                "date": "",
                                "marks": "30",
                                "note": "Answer all from question No.1 and one question from each."
                            }
                        },
                        "questionsSection": {
                            "units": 3,
                            "sections": [
                                {
                                    "name": "1",
                                    "count": 3,
                                    "marks": 2,
                                    "type": "all",
                                    "marksList": [2]
                                },
                                {
                                    "name": "Section-I",
                                    "marks": 8,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 8]
                                },
                                {
                                    "name": "Section-II",
                                    "marks": 8,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 8]
                                },
                                {
                                    "name": "Section-III",
                                    "marks": 8,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 8]
                                }
                            ]
                        }
                    },
                    "external": {
                        "headerSection": {
                            "regNo": 10,
                            "headerDetails": {
                                "title": "G.PULLAREDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL",
                                "examDetails": "",
                                "sessional": "",
                                "department": "",
                                "subject": "",
                                "scheme": ""
                            },
                            "examDetails": {
                                "time": "3 hours",
                                "date": "",
                                "marks": "60",
                                "note": "Answer all from question No.1 and one question from each section."
                            }
                        },
                        "questionsSection": {
                            "units": 3,
                            "sections": [
                                {
                                    "name": "1",
                                    "count": 5,
                                    "marks": 2,
                                    "type": "all",
                                    "marksList": [2]
                                },
                                {
                                    "name": "Section-I",
                                    "marks": 10,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 6, 7, 10]
                                },
                                {
                                    "name": "Section-II",
                                    "marks": 10,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 6, 7, 10]
                                },
                                {
                                    "name": "Section-III",
                                    "marks": 10,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 6, 7, 10]
                                },
                                {
                                    "name": "Section-IV",
                                    "marks": 10,
                                    "type": "or",
                                    "co": "",
                                    "marksList": [3, 4, 5, 6, 7, 10]
                                },
                                {
                                    "name": "Section-V",
                                    "marks": 10,
                                    "type": "or",
                                    "marksList": [3, 4, 5, 6, 7, 10]
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
    ngOnInit(): void {
    }

}
