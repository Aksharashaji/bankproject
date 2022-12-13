import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  // to recive values from parent use input child
  @Input() item:string | undefined
  @Input() serverMsg:string | undefined

  // to send valus from child to parent use output in child
  // oncancel is a user defineed event
 @Output() onCancel= new EventEmitter()
 @Output() onDelete= new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
// coour the cancel event here using emit()
this.onCancel.emit()
  }


  deleteChild(){
    let deleteConfirm=true
 this.onDelete.emit([this.item,deleteConfirm])
 this.item
  }

}
