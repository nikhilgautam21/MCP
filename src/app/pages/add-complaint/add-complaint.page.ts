import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidationService } from 'src/app/services/validation.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import {SuccessComplaintComponent} from 'src/app/shared/components/success-complaint/success-complaint.component'

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
  pictures: any = []
  added: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public domSanitizer: DomSanitizer,
    public validationService: ValidationService,
    public complaintService: ComplaintService,
    public popoverController: PopoverController
  ) {
    this.complaintForm = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", [Validators.required, validationService.phoneValidator]],
      address: ["", Validators.required],
      notes: ["", Validators.required]
    })
  }

  ngOnInit() {
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

  deleteImage(index) {
    this.pictures = this.pictures.filter((item, i) => {
      return i != index
    })
  }

  addComplaint() {
    if (this.complaintForm.valid) {
      let form = this.complaintForm.value
      let complaint = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        notes: form.notes,
        images: this.pictures,
        date: new Date()
      }
      this.complaintService.addComplaint(complaint).subscribe(res=>{

      },err=>{
        debugger
        this.added = true;
        this.presentPopover();
      })
    }
  }


  async presentPopover(ev: any = null) {
    debugger
    const popover = await this.popoverController.create({
      component: SuccessComplaintComponent,
      event: ev,
      translucent: true,
      cssClass: 'pop-over-style'
    });
    return await popover.present();
  }
}
