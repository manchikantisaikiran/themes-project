import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { NgxImageCompressService } from '../services/compress-image.service';
import { take } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';

enum DOC_ORIENTATION {
  Up = 1,
  Down = 3,
  Right = 6,
  Left = 8,
  UpMirrored = 2,
  DownMirrored = 4,
  LeftMirrored = 5,
  RightMirrored = 7,
  NotJpeg = -1,
  NotDefined = -2
}

@Component({
  selector: 'app-image-compression',
  templateUrl: './image-compression.component.html',
  styleUrls: ['./image-compression.component.scss']
})
export class ImageCompressionComponent implements OnInit {

  imgResultAfterCompress!: string;
  imgResultBeforeCompress!: string;
  a = 1;

  constructor(private http: HttpClient,
    // private compressImage: CompressImageService,
    private ngZone: NgZone,
    private imageCompresService: NgxImageCompressService) {
    http.get('../../assets/banner_image.png', { responseType: 'blob' }).subscribe((file) => {
      console.log(file);
      const image = new File([file], 'banner.png', { type: 'image/png', lastModified: Date.now() });
      console.log(image)
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('RESULT', typeof reader.result)
        if (typeof reader.result === 'string') {
          console.log('came here')
          this.imageCompresService.compressFile(reader.result, 1)
            .then((res) => this.imgResultAfterCompress = res)
            .catch((err) => console.log(err))
        }
      }
      reader.readAsDataURL(image);
      // this.upload(image)
      console.log(typeof reader.result === 'string')
    })
  }

  ngOnInit(): void {
  }

  // compressFile() {

  //   this.imageCompresService.uploadFile().then(({ image, orientation }) => {

  //     this.imgResultBeforeCompress = image;
  //     console.warn('Size in bytes was:', this.imageCompresService.byteCount(image));

  //     this.imageCompresService.compressFile(image, orientation, 75, 50).then(
  //       result => {
  //         console.log(result);
  //         this.imgResultAfterCompress = result;
  //         console.warn('Size in bytes is now:', this.imageCompresService.byteCount(result));
  //       }
  //     );

  //   });
  // }

  // upload(file: File) {
  //   let image: File = file;
  //   console.log(`Image size before compressed: ${image.size} bytes.`);

  //   this.compressImage
  //     .compress(image)
  //     .pipe(take(1))
  //     .subscribe(compressedImage => {
  //       console.log(
  //         `Image size after compressed: ${compressedImage.size} bytes.`
  //       );
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onloadend = () => {
  //         // const img = <HTMLImageElement>document.querySelector('#image');
  //         // if (typeof reader.result === 'string')
  //         // img.src = reader.result
  //         console.log(this.imgResultAfterCompress)


  //         this.ngZone.run(() => {
  //           if (typeof reader.result === 'string')
  //             this.imgResultAfterCompress = reader.result;
  //           this.a = 2;
  //         });
  //         console.log(this.imgResultAfterCompress)
  //       }
  //     });
  // }
}