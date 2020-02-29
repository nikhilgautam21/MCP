import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser'; 

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.page.html',
  styleUrls: ['./add-complaint.page.scss'],
})
export class AddComplaintPage implements OnInit {

  complaintForm: FormGroup;
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 3,
    quality: 50
  };
  pictures:any = []

  constructor(
    public formBuilder: FormBuilder,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private webview: WebView,
    public domSanitizer: DomSanitizer
  ) {
    this.complaintForm = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      images: [""],
      notes: ["", Validators.required]
    })
  }

  ngOnInit() {
  }

  addComplaint() {
    debugger
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let image = 'data:image/jpeg;base64,' + imageData;
      this.pictures.push(image)
      //this.displayImage = this.domSanitizer.bypassSecurityTrustUrl(imageData)
      // const tempFilename = imageData.substr(imageData.lastIndexOf('/') + 1);
      // const tempBaseFilesystemPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);

      // const newBaseFilesystemPath = this.file.dataDirectory;

      // this.file.copyFile(tempBaseFilesystemPath, tempFilename,
      //   newBaseFilesystemPath, tempFilename);

      // const storedPhoto = newBaseFilesystemPath + tempFilename;
      // this.displayImage = this.webview.convertFileSrc(storedPhoto);
      debugger
    }, (err) => {
      // Handle error
    });
  }


  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  deleteImage(index){
    this.pictures = this.pictures.filter((item,i)=>{
      return i!=index
    })
    debugger
  }
}
