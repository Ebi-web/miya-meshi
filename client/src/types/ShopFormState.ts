import { Shop } from './Shop'

export type ShopFormState = {
  shop: {
    name: Shop['name'],
    description: Shop['description'],
    intro: Shop['intro'],
    imageLink: Shop['imageLink'],
    facebookLink: Shop['facebookLink'],
    homepageLink: Shop['homepageLink'],
    instaLink: Shop['instaLink'],
    lineLink: Shop['lineLink'],
    twitterLink: Shop['twitterLink'],
    uberEatsLink: Shop['uberEatsLink'],
    youtubeLink: Shop['youtubeLink'],
    priority: Shop['priority'],
    public: Shop['public'],
    tel: Shop['tel'],
    address: Shop['address'],
    buildingName: Shop['buildingName'],
    postal: Shop['postal']
  }
}
