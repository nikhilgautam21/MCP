import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidationService } from 'src/app/services/validation.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { SuccessComplaintComponent } from 'src/app/shared/components/success-complaint/success-complaint.component'
import { UtilityService } from 'src/app/services/utility.service';

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
  pictures: any = [];
  uploadImages: any = [];
  added: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public domSanitizer: DomSanitizer,
    public validationService: ValidationService,
    public complaintService: ComplaintService,
    public popoverController: PopoverController,
    public utils: UtilityService
  ) {
    this.complaintForm = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", [Validators.required, validationService.phoneValidator]],
      address: ["", Validators.required],
      notes: [""]
    })
  }

  ngOnInit() {
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let image = "data:image/jpeg;base64," + imageData;
      this.pictures.push(image)

      // let newImage = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      // const date = new Date().valueOf();

      // // Replace extension according to your media type
      // const imageName = "MCP_Complaint" + date + '.jpeg';
      // // call method that creates a blob from dataUri
      // const imageBlob = this.dataURItoBlob(imageData);
      // const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' })
      // this.uploadImages.push(imageFile)
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

  deleteImage(index) {
    this.pictures = this.pictures.filter((item, i) => {
      return i != index
    })
  }

  addComplaint() {
    if (this.complaintForm.valid) {
      let form = this.complaintForm.value
      let todayDate = new Date();
      let date = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
      let complaint = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        notes: form.notes,
        date: date,
        status: "inprogress"
      }
      this.complaintService.addComplaint(complaint).subscribe(res => {
        let complaintNumber = res.complaint_number
        let complaintId = res._id
        this.complaintForm.reset();
        if (this.pictures.length > 0) {
          let imagePayload = {
            complaint_id: complaintId,
            images: this.pictures
          }
          this.complaintService.uploadPhotos(imagePayload).subscribe(resp => {
            this.pictures = []
            this.presentPopover(null, complaintNumber);
          })
        }
        else{
          this.pictures = []
          this.presentPopover(null, complaintNumber);
        }
      }, err => {
        this.utils.showToast("Something went wrong. Please try again")
      })
    }
  }


  async presentPopover(ev: any = null, complaintNumber) {
    const popover = await this.popoverController.create({
      component: SuccessComplaintComponent,
      event: ev,
      translucent: true,
      componentProps: { "complaintId": complaintNumber }
    })
    return await popover.present();
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}
