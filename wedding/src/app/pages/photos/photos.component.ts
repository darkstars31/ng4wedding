import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class PhotosComponent {
  public photoAlbums: photoAlbumModel[] = [
    {title: "2017 Breckenridge", image: "/assets/images/breckenridge.jpg", url: "https://goo.gl/photos/ah2jUs2fVxkyhY3p6"},
    {title: "2016 Chicago",      image: "/assets/images/chicago.jpg", url:"https://goo.gl/photos/pTJsd7MK3Rur3rgYA"},
    {title: "2016 Ireland",      image: "/assets/images/ireland.jpg", url:"https://goo.gl/photos/PkBzStrufu5pUbhZ7"},
    {title: "2016 Lake of the Ozarks", image: "/assets/images/ozarks.jpg", url:"https://goo.gl/photos/QscszmzQJEDANDjT8"}
  ];
}

class photoAlbumModel {
  title: string;
  image: string;
  url: string;
}

