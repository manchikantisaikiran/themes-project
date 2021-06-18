// import { Injectable } from '@angular/core'
// import { Observable } from 'rxjs'

// // in bytes, compress images larger than 1MB
// const fileSizeMax = 1 * 1024 * 1024
// // in pixels, compress images have the width or height larger than 1024px
// const widthHeightMax = 1024
// const defaultWidthHeightRatio = 1
// const defaultQualityRatio = 0.7

// @Injectable({
//     providedIn: 'root'
// })
// export class CompressImageService {
//     // compress(file: File): Observable<File> {
//     //     const imageType = file.type || 'image/jpeg'
//     //     const reader = new FileReader()
//     //     reader.readAsDataURL(file)

//     //     return Observable.create((observer: any) => {
//     //         // This event is triggered each time the reading operation is successfully completed.
//     //         reader.onload = ev => {
//     //             // Create an html image element
//     //             const img = this.createImage(ev)
//     //             // Choose the side (width or height) that longer than the other
//     //             const imgWH = img.width > img.height ? img.width : img.height

//     //             // Determines the ratios to compress the image
//     //             let withHeightRatio = (imgWH > widthHeightMax) ? widthHeightMax / imgWH : defaultWidthHeightRatio
//     //             let qualityRatio = (file.size > fileSizeMax) ? fileSizeMax / file.size : defaultQualityRatio

//     //             // Fires immediately after the browser loads the object
//     //             img.onload = () => {
//     //                 const elem = document.createElement('canvas')
//     //                 // resize width, height
//     //                 elem.width = img.width * withHeightRatio
//     //                 elem.height = img.height * withHeightRatio

//     //                 const ctx = <CanvasRenderingContext2D>elem.getContext('2d')
//     //                 ctx.drawImage(img, 0, 0, elem.width, elem.height)
//     //                 ctx.canvas.toBlob(
//     //                     // callback, called when blob created
//     //                     blob => {
//     //                         if (blob) {
//     //                             observer.next(new File(
//     //                                 [blob],
//     //                                 file.name,
//     //                                 {
//     //                                     type: imageType,
//     //                                     lastModified: Date.now(),
//     //                                 }
//     //                             ))
//     //                         }
//     //                     },
//     //                     imageType,
//     //                     qualityRatio, // reduce image quantity
//     //                 )
//     //             }
//     //         }

//     //         // Catch errors when reading file
//     //         reader.onerror = error => observer.error(error)
//     //     })
//     // }

//     // private createImage(ev:any) {
//     //     let imageContent = ev.target.result
//     //     const img = new Image()
//     //     img.src = imageContent
//     //     return img
//     // }

    
// }


import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {ImageCompress} from '../image-compression/image-compress';
// import {DOC_ORIENTATION} from './DOC_ORIENTATION';

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

@Injectable({
    providedIn:"root"
})
export class NgxImageCompressService {

  private render: Renderer2;

  public DOC_ORIENTATION = DOC_ORIENTATION;

  constructor(rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  public byteCount(image:any) {
    return ImageCompress.byteCount(image);
  }

  /** Get the correct Orientation value from the EXIF tags in the specified file. */
  public getOrientation(file: File): Promise<DOC_ORIENTATION> {
    return new Promise<DOC_ORIENTATION>((resolve) => {
      ImageCompress.getOrientation(file, (result) => {
        resolve(result);
      });
    });
  }

  public uploadFile(): Promise<{ image: string, orientation: DOC_ORIENTATION }> {
    return ImageCompress.uploadFile(this.render);
  }

  public compressFile(image: string, orientation: DOC_ORIENTATION, ratio: number = 50, quality: number = 50): Promise<string> {
    console.log('compress file in service')
    return ImageCompress.compress(image, orientation, this.render, ratio, quality);
  }

}