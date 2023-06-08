import ICmsImage from "./ICmsImage";

 export default interface IBlogData {
  published_date: string;
  title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  introduction_header: string;
  introduction: string;
  body: string;
  image: ICmsImage;
  slices: any;
}