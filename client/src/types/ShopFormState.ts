import { Shop } from './Shop'

export type ShopFormState = {
  shop: {
    name: Shop['name'],
    prefixName: Shop['prefixName'],
    description: Shop['description'],
    intro: Shop['intro'],
    imageLink: Shop['imageLink'],
    menuImageLink: Shop['menuImageLink'],
    facebookLink: Shop['facebookLink'],
    homepageLink: Shop['homepageLink'],
    instaLink: Shop['instaLink'],
    lineLink: Shop['lineLink'],
    twitterLink: Shop['twitterLink'],
    uberEatsLink: Shop['uberEatsLink'],
    youtubeLink: Shop['youtubeLink'],
    instaShopLink: Shop['instaShopLink'],
    instaNumber: Shop['instaNumber'],
    priority: Shop['priority'],
    priceRange: Shop['priceRange'],
    public: Shop['public'],
    tel: Shop['tel'],
    address: Shop['address'],
    buildingName: Shop['buildingName'],
    postal: Shop['postal'],
    canTakeout: Shop['canTakeout'],
    businessHour1: Shop['businessHour1']
    businessHour2: Shop['businessHour2']
    parkingLot: Shop['parkingLot']
    regularHoliday: Shop['regularHoliday']
    seat: Shop['seat'],
    latitude: Shop['latitude'],
    longitude: Shop['longitude'],
    dishes: Shop['dishes'],
    keywords: Shop['keywords'],
    timeZone: Shop['timeZone']
  }
}
