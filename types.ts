export type Icon = {
  name: string
  icon: JSX.Element
}

export enum Icons {
  Star = 'star',
  List = 'list',
  Globe = 'globe',
  Person = 'person',
  Like = 'like',
  Thought = 'thought',
  Tick = 'tick',
  Bookmark = 'bookmark'

}

export type GridBlock = {
  icon?: Icons
  title: string
  description: string
  bullets?: string[]
  ctaButtonText?: string
  ctaLink?: string
}
