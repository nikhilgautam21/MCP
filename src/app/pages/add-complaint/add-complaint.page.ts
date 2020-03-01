import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser'; 
import { ValidationService } from 'src/app/services/validation.service';

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
    public domSanitizer: DomSanitizer,
    public validationService: ValidationService
  ) {
    this.complaintForm = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", [Validators.required, validationService.phoneValidator]],
      address: ["", Validators.required],
      images: [""],
      notes: ["", Validators.required]
    })
  }

  ngOnInit() {
  }

  addComplaint() {
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
      }
      ]
    });
    await actionSheet.present();
  }

  deleteImage(index){
    this.pictures = this.pictures.filter((item,i)=>{
      return i!=index
    })
  }
}
