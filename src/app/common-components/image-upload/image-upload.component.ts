import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.sass"]
})
export class ImageUploadComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  @Output("on-image-uploaded")
  onImageUploaded: EventEmitter<any> = new EventEmitter();

  preview(files) {
    if (files.length === 0) return;

    var mineType = files[0].type;
    if (mineType.match(/image\/*/) == null) {
      this.message = "images are supported.";
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
    this.onImageUploaded.emit({ file: files });
  }

  constructor() {}

  ngOnInit() {}
}
