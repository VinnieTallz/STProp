// In-memory storage for simplicity
let reservations = [
  {
    id: "0100edc0-b524-5647-80fb-1e6883b8b8b1",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "217c8c2e-5e78-5881-9615-194602dd523d",
      thumbnails: [
        "https://www.dropbox.com/s/e5vhok2qt4a5tml/Motel%2031.jpg?dl=0"
      ],
      alias: "Gateway Motel 31",
      address:
        "800 Harvie Heights Rd, Harvie Heights, AB T1W 2W2 ** Unit on the second floor",
      bathrooms: 1,
      bedrooms: 0,
      internetName: "Glacier",
      internetPassword: "banff2020",
      parkingInstruction:
        "Free, unassigned parking anywhere in the parking lot No parking in at least 12 feets from the garbage bin located on the west side of the builidng, to facilitate garbage pickup.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0195a714-ab26-5924-94be-804c1a8e92d2",
    checkin: "2025-09-13T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "d7bb2ee7-00fb-520b-9b37-960ffeb62c78",
      thumbnails: [
        "https://www.dropbox.com/s/7mrc73yziders8r/Cabin%2017.jpg?dl=0"
      ],
      alias: "Cabin 17",
      address: "17 - 2924 kicking horse road Golden BC V0A 1H7",
      bathrooms: 2,
      bedrooms: 2,
      internetName:
        "TELUS0E7F Back-up internet: WIFI NAME: airCube-FA7 BACK UP WIFI PASSWORD: RZtywFzLHYm Owner's internet: TELUS4D824C PASSWORD: 5Y8655Y5N5",
      internetPassword: "7cK5uan2rVdV",
      parkingInstruction:
        "Parking Outside, not assigned, plugs available during cold season",
      groupName: "Golden - Kicking Horse - Cabin"
    }
  },
  {
    id: "01de30f0-f9d3-5502-b5a7-a06f63147866",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "3c4917a4-9512-5d6d-9d98-5c60b5b59b80",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/j30cly0b425u8m39daw3y/103-Skyridge.jpg?rlkey=t5gwcgsb4b5ala76ll3opybjc&st=lz8ehiwf&dl=0"
      ],
      alias: "212 Skyridge (15)",
      address: "212-750 Harvie Heights Rd, Harvie Heights, AB T1W 2W2",
      bathrooms: 1.5,
      bedrooms: 3,
      internetName: "Sky212",
      internetPassword: "Rundle212",
      parkingInstruction:
        "Stall #P-212 Behind the building after entering where the building name (Skyridge)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0419a604-926d-5b84-9908-ed3ebc8fbbb3",
    checkin: "2025-09-18T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "367076be-fa85-5753-9c74-f95177500164",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/z38crq2x7jj6fm5zo5ium/204-Rundle-Cliff.jpg?rlkey=qwbepibeq4qe8pnznvlg61vgr&dl=0"
      ],
      alias: "204 Rundle Cliff (RC)",
      address: "204 - 379 Springcreek Drive Canmore AB T1W 0G8",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "204 Rundlecliff",
      internetPassword: "StCar202438!",
      parkingInstruction:
        "Stall# P204 Covered, secured parking. 85266# - Universal code created by the Building management in case the new codes per guest didn't work. The Parkade Remotelock keypad in the courtyard near the yellow bollards has been relocated to the lefthand side of the wall as you go down the ramp into the parkade. Some helpful tips: 1) Your garage door remotes still work and can be used instead of the keypad. 2) It might be easier to just pull up beside the keypad and open the vehicle door and exit to enter the code (rather than trying to reach out the window). 3) Vehicles will need to enter and exit the parkade diligently as traffic will need to take turns.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "05f0fa50-6235-54a3-a5cf-66686c8cc262",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "7adc24fa-42af-5734-9b85-8cd886f3c31d",
      thumbnails: [
        "https://www.dropbox.com/s/4o5sdwcs0rl5r52/701%20Beltline.jpg?dl=0"
      ],
      alias: "701 Beltline",
      address: "701 Beltline, 1010 6 ST SW, Calgary T2R 0E2",
      bathrooms: 1,
      bedrooms: 2,
      internetName: "S&T PROPERTIES",
      internetPassword: "New - B60247004406 Old - B51217052377",
      parkingInstruction:
        "Stall# 484 - underground parking As soon as you reach the entrance of the parking lot, press number 1 in the remote control, which will open the first door, after coming down to the second level of the parking lot you will reach the second door, and you will press bottom 2 in the remote and it will allow e to go enter the parking lot. Come down until you find parking spot number 484.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "07497854-fb71-533a-88d9-cfb49bf7b5e4",
    checkin: "2025-09-12T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "b8fff85d-0d3f-5d51-8700-c8e8765cf6ba",
      thumbnails: [
        "https://www.dropbox.com/s/1dqiz679i67hvid/223%20Solara%20Aurora.jpg?dl=0"
      ],
      alias: "223 Solara Aurora Bldg. A",
      address: "223 - 173 Kananaskis Way, Canmore, AB, T1W 0A3, Canada",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "Solara Wireless",
      internetPassword: "3Sisterscanmore",
      parkingInstruction:
        "No spot assigned, Guest can park at any empty spot. Code is 688315# Old code: 755517# PARKADE ACCESS NOTE: The inbound parkade door opens automatically from 8 AM to 10 PM. Between 10 PM and 8 AM, please use the provided access code to enter.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "079e47eb-533b-5581-834b-454d668a20c0",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "7c73fd91-8303-505a-841b-35838b3fd9dd",
      thumbnails: [
        "https://www.dropbox.com/s/m5piho9z29s6eam/211%20Lincoln%20Park.jpg?dl=0"
      ],
      alias: "211 Lincoln Park (LP)",
      address: "211- 10 Lincoln Park Canmore AB T1W 3E9",
      bathrooms: 1,
      bedrooms: 0,
      internetName: "HitronE95B0",
      internetPassword: "B51213075626",
      parkingInstruction:
        "Unassigned parking around the building Note that trailer and RV parking on Lincoln Road is not permitted under the Lincoln Park Condominium Bylaws. There is a bike rack/storage located at the right end of the outdoor parking lot. Bug: https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000024007/1224579000022138548",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "081ad860-bc08-5860-8dc0-17dab72d11b4",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "3c4917a4-9512-5d6d-9d98-5c60b5b59b80",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/fo3zuijianc2ryg2fm72z/214-Skyridge.jpg?rlkey=2b0wo57aaaz0jsb934lu9xx4t&st=1r0bjlsu&dl=0"
      ],
      alias: "214 Skyridge (17)",
      address: "214 - 750 Harvie Heights Rd, Harvie Heights, AB T1W 2W2",
      bathrooms: 1.5,
      bedrooms: 3,
      internetName: "Sky214",
      internetPassword: "Rundle214",
      parkingInstruction:
        "Stall #P-214 Behind the building after entering where the building name (Skyridge)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "08595407-1d9f-5d5b-9c4f-a504f6a991d3",
    checkin: "2025-09-14T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "543f8b82-9f4d-555c-9d30-59b750b6266a",
      thumbnails: [
        "https://www.dropbox.com/s/sjtf72mn1cjd5tw/223%20Stoneridge.jpg?dl=0"
      ],
      alias: "223 Stoneridge",
      address: "223 - 30 Lincoln Park Canmore, AB T1W 3E9",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "Stoneridge",
      internetPassword: "smr2022!",
      parkingInstruction:
        "You will find 1 key card at the kitchen counter, you can use that key card to access the building garage, there are no spots assigned, you could park anywhere once inside In case Key card is missing and Front desk is not providing temporary card: 1 person enters throught the front desk and open the garage door Manually from the inside, pushing the button. Enter through the front desk walk to the elevator, go down to the main floor, then enter the garage and push the button to the left of the parkade doors",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "09a142ad-b7b5-5499-a6a1-c21c2b5359ec",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "26fb0479-ba7f-5125-8b44-e5b38a907fb3",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/wyp1r7ukd4igrkbubh7mt/719-Penticton.jpg?rlkey=k8oi25qbri4vdw2ep15ovwzd8&st=nevug1y9&dl=0"
      ],
      alias: "719 Penticton",
      address: "719 Alexander Ave, Penticton, BC V2A 1E6",
      bathrooms: 4.5,
      bedrooms: 4,
      internetName: "Telus719",
      internetPassword: "719GuestStay",
      parkingInstruction:
        "Private garage parking for 1 car. Guest Garage Outside keypad code : - Code 2535 Owner Garage Door Codes : - 0123# There is a back up key for the garage kept in the pantry closet.",
      groupName: "Penticton"
    }
  },
  {
    id: "09ca443c-b523-57cf-bd88-8bc636c933d3",
    checkin: "2025-09-18T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "3c4917a4-9512-5d6d-9d98-5c60b5b59b80",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/jmdr2mlyf5ik9x1mnunc0/213-Skyridge.png?rlkey=pmanytejqsj5ukei4om2q3dfr&st=597esvwp&dl=0"
      ],
      alias: "213 Skyridge (16)",
      address: "213 - 750 Harvie Heights Rd, Harvie Heights, AB T1W 2W2",
      bathrooms: 1.5,
      bedrooms: 3,
      internetName: "Sky213",
      internetPassword: "Rundle213",
      parkingInstruction:
        "Stall #P-213 Behind the building after entering where the building name (Skyridge)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0a04b8be-8651-53bf-b479-7394131f4eb8",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "52e75770-e244-512e-ae9f-dc0e7949d77e",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/omsw4et6jtsutxxogfszr/322-Lodges-Wolf.jpg?rlkey=1vj70mhviuesxku1k53nqa5xb&dl=0"
      ],
      alias: "322 Lodges Wolf",
      address: "322 - 107 Montane Road Canmore, AB T1W 3J2",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "LodgesatCanmore",
      internetPassword: "MontaneRoad",
      parkingInstruction:
        "Underground, secured parking which is located to the left of the main entrance of the Wolf Lodge. Guests need key cards to get in, which will be explained by the front desk",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0a1c02be-4bf1-5a49-84c1-2ae445f1da11",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "4729b690-f2bb-5f80-9a17-259f07c00bf2",
      thumbnails: [
        "https://www.dropbox.com/s/tm1p5oovvdsjpkz/992%20Dewdney.jpg?dl=0"
      ],
      alias: "992 Dewdney",
      address: "992 Dewdney Way, Kimberley, BC V1A 3E9",
      bathrooms: 2,
      bedrooms: 3,
      internetName: "992 Dewdney way",
      internetPassword: "weLcome2992",
      parkingInstruction:
        "We have two parking spaces immediately available outside the unit.",
      groupName: "Kimberley"
    }
  },
  {
    id: "0c136437-db66-5613-a810-235b55aef9d0",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "7c73fd91-8303-505a-841b-35838b3fd9dd",
      thumbnails: [
        "https://www.dropbox.com/s/wtguac40ljc5133/308%20lpPNG.jpg?dl=0"
      ],
      alias: "308 Lincoln Park (LP)",
      address: "308- 10 Lincoln Park Canmore AB T1W 3E9",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "HitronD5360",
      internetPassword: "B51215017183",
      parkingInstruction:
        "Unassigned parking around the building Note that trailer and RV parking on Lincoln Road is not permitted under the Lincoln Park Condominium Bylaws. There is a bike rack/storage located at the right end of the outdoor parking lot. Bug: https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000024007/1224579000022138548",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0c686488-329c-550b-bfa0-f02d5483849b",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "d7bb2ee7-00fb-520b-9b37-960ffeb62c78",
      thumbnails: [
        "https://www.dropbox.com/s/j8mjs92osb8a87c/cabin%2012.JPG?dl=0"
      ],
      alias: "Cabin 12",
      address: "12 - 2924 Kickinghorse Road Golden BC V0A 1H7",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "airCube-F92",
      internetPassword: "Tqe2scYq3F7",
      parkingInstruction:
        "Parking Outside, not assigned, plugs available during cold season",
      groupName: "Golden - Kicking Horse - Cabin"
    }
  },
  {
    id: "0c857cb9-b90a-5c04-a20d-36e9f4cd6237",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "6514a030-d208-5718-b5d7-f79193f76380",
      thumbnails: [
        "https://www.dropbox.com/s/11clfu8n0a1fn01/306B%20Tamarack.jpg?dl=0"
      ],
      alias: "306B Tamarack",
      address: "306B - 1012 Spring Creek Dr, Canmore, AB T1W 0N1",
      bathrooms: 2.5,
      bedrooms: 2,
      internetName: "THREE SISTERS",
      internetPassword: "PROTECTOR5",
      parkingInstruction:
        "Stall# 306B *Parking is underground. Tandem stall that parks 2 vehicle's in length",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0d235629-3db4-524a-a33d-ea8eb94ae8cf",
    checkin: "2025-09-19T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "336dcbc2-2e0e-5015-9899-b7ed95892d4d",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/je3wx8ig9ft0fcaplq0ta/201-109-Kananaskis.jpg?rlkey=3xx1aikuj7ghkbyvicy0vafpr&dl=0"
      ],
      alias: "201 - 109 Kananaskis",
      address: "109 Kananaskis Way Canmore, AB T1W 1N7, Canada",
      bathrooms: 1.5,
      bedrooms: 3,
      internetName: "201109Skyline",
      internetPassword: "201condoskyline109",
      parkingInstruction:
        "Stall labeled: #60 Located at the FRONT of 105 Parking space is standard size so bigger SUVs/Trucks might find the space to be tight.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0d53a6fc-e39b-5696-a69e-e523ff644af4",
    checkin: "2025-09-18T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "6ba5c67c-cfe2-59b5-bc31-d866ec33b8ca",
      thumbnails: [
        "https://www.dropbox.com/s/avdyv0bhs2wzhgj/333%20GR.jpg?dl=0"
      ],
      alias: "333 Grande Rockies (GRR)",
      address: "333 - 901 Mountain Street Canmore AB T1W 0C9",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "GRR-Guest",
      internetPassword: "3sisters",
      parkingInstruction:
        "Code: 6405 https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000613037/1224579000027685787 Parking stall #: 104 https://projects.zoho.com/portal/stproperties#buginfo/1224579000000613037/1224579000033830245 NOTE: If the guest reported that the parking stall is occupied, ask the guest if the vehicle has a parking pass from the resort and ask for a photo. We can call Front desk to contact the owner of the vehicle to remove the car on our spot.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0e857c7a-2af6-5197-b028-a372f45eea40",
    checkin: "2025-09-10T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "64aa096b-0c13-5307-8b74-4f89b20ecba1",
      thumbnails: [
        "https://workdrive.zoho.com/file/6px08428f53d0d42e4db9beee8679aaad6315"
      ],
      alias: "802 Ink",
      address: "802 - 624 8th Ave SE Calgary AB T2G 0M1",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "HitronEDE80- Easy connect",
      internetPassword: "ADCAEHitron",
      parkingInstruction:
        "Stall# 143 -underground parking -before parking your vehicle, make sure to get the key fob first from the unit or else you will be stuck in the garage. Access to the parking garage is at the back of the building around the corner of the block. You'll need to use the key fob with 4 buttons on it to open the garage door. Use button 1. Video from Parking spot to elevator: https://youtube.com/shorts/KDMRuHn6NTs?feature=share",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0e86cbbc-9879-501d-88ac-8e96f7d253f2",
    checkin: "2025-09-14T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "c247004b-83c3-5e94-9533-12132024a12f",
      thumbnails: [
        "https://workdrive.zoho.com/file/m542me70d8877ed004682af20f74f0894023b"
      ],
      alias: "317 Riverstone",
      address: "317 - 901 7th St. North, Golden BC, V0A 1H0",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "CaptainJim",
      internetPassword: "Jphs-905",
      parkingInstruction:
        "GARAGE OPENER- garage located around back of building , parking lot outside of garage as well",
      groupName: "Golden - Kicking Horse - Cabin"
    }
  },
  {
    id: "0ea14c46-3e8a-50c3-b8b6-91160791eb2a",
    checkin: "2025-09-13T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "7c73fd91-8303-505a-841b-35838b3fd9dd",
      thumbnails: [
        "https://www.dropbox.com/s/iztchidojkezh0f/304%20LP.jpg?dl=0"
      ],
      alias: "304 Lincoln Park (LP)",
      address: "304 - 10 Lincoln Park Canmore AB T1W 3E9",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "Hitron D6730",
      internetPassword: "B51215017500",
      parkingInstruction:
        "Unassigned parking around the building Note that trailer and RV parking on Lincoln Road is not permitted under the Lincoln Park Condominium Bylaws. There is a bike rack/storage located at the right end of the outdoor parking lot. Bug: https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000024007/1224579000022138548",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "0f368060-b060-5de6-a087-a9438a1e7d7e",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "e7725dd8-e8ab-56fe-9bf2-6f1ff329602f",
      thumbnails: ["https://www.dropbox.com/s/jlc240lt613srj4/407CC.jpeg?dl=0"],
      alias: "407 Canmore Crossing Bldg. C (CC)",
      address: "407 Building C , 1120 Railway Avenue, Canmore, T1W 1P4",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "SHAW-5DB490",
      internetPassword: "251169004421",
      parkingInstruction:
        "Stall# 12 Garage code: 23654# New elevator code: 23654# as of Jan 1 2023 Tandem parking is prohibited. No back to back parking One Vehicle only. If you are bringing two vehicles, you may park in Safeway or in the paid street parking. Video (using the stairways from the parkade) - https://youtu.be/vm7DwB5EMpY",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "10888c63-3ed2-50f6-9d71-48737b53b4e2",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "6ba5c67c-cfe2-59b5-bc31-d866ec33b8ca",
      thumbnails: [
        "https://www.dropbox.com/s/3jmqdipntbhrs8f/238%20Grand%20Rockies%20Hotel.JPG?dl=0"
      ],
      alias: "238 Grande Rockies (GRR)",
      address: "238 - 901 Mountain Street Canmore AB T1W 0C9",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "GRR-guest",
      internetPassword: "3sisters",
      parkingInstruction:
        'No titled stalls. You can use the underground parking, which is around the back of the building. Please park in any stall that has a "GR" Grande Rockies Bellstar sign/mark. Update 09/16/2025 https://www.cleanover.com/admin/jobs-management/solution-cases?q=resolutionCaseId%253As%253A1380a946-66c4-4105-a6d1-79cc41cd94d1 NOTE: If the guest reported that the parking stall is occupied, ask the guest if the vehicle has a parking pass from the resort and ask for a photo. We can call Front desk to contact the owner of the vehicle to remove the car on our spot.',
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "11079028-146d-5ca0-9772-1a679fccaeac",
    checkin: "2025-09-13T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "57366207-f590-5cd0-ba1d-46dcea6bf07d",
      thumbnails: [
        "https://workdrive.zoho.com/file/mrste03f8f865f33e4b098935b5df82cdeb8c"
      ],
      alias: "2111 Sparrowhawk",
      address: "2111 - 200 2nd St, Dead Man's Flats, Alberta T1W 2W4",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "Sparrowhawk Lodge",
      internetPassword: "09565449",
      parkingInstruction: "",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "152fa5fa-2766-53da-bc5b-802dfb1776f2",
    checkin: "2025-09-18T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "376832b1-b3d7-5be0-9d91-0d7fa837ec6f",
      thumbnails: [
        "https://www.dropbox.com/s/xr9xlhrc24995l0/306%20Stylish%20Condo.JPG?dl=0"
      ],
      alias: "306 Richmond",
      address: "306 - 111 14 Ave SE Calgary AB T2G 1C7",
      bathrooms: 1,
      bedrooms: 2,
      internetName: "SHAW-01V0",
      internetPassword: "B51215013691",
      parkingInstruction:
        "Stall# 80 - covered, secured parking The underground parking garage at The Richmond is 30 meters left of the main entrance and the parking spot is #80. There are sensors to get into the building/garage. Scan the fob on the black box located on the left upon entering the garage.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "15f132d8-ff6b-592a-b267-3787431b8ba5",
    checkin: "2025-09-13T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "dfdc24b9-6aad-5545-aa00-fdf6b88a0a6f",
      thumbnails: [
        "https://www.dropbox.com/s/e4hxjoqn5bsxdnr/402%20Falcon.jpg?dl=0"
      ],
      alias: "402 Falcon Crest",
      address: "402 - 190 Kananaskis Way, Canmore, AB T1W 3K5, Canada.",
      bathrooms: 1,
      bedrooms: 1,
      internetName:
        "Falcon Lodge For smart devices: Username: BluRay Password: 4036786150",
      internetPassword: "#ILuvFCL",
      parkingInstruction:
        "Garage door code: 6432 6''7 maximum height Parkade/Garbage Room: (old 6432) – New 7842 New code takes effect on September 19",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1648bd60-119b-555b-a170-66f84ea55acf",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "709a2b64-7941-5458-93ce-3410f91e562c",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/hdnvaviwpqe9f6hxbh22s/410-Blackstone.jpg?rlkey=tx371l13poxqpvngg955b2ne1&st=fdub7hnc&dl=0"
      ],
      alias: "410 Blackstone",
      address: "410 - 170 Kananaskis Way, Canmore, AB, T1W 0A8",
      bathrooms: 2,
      bedrooms: 3,
      internetName: "Blackstone Lodge",
      internetPassword: "LoveBlackstone",
      parkingInstruction:
        "It is scrambled parking in the underground. Not assigned and each unit gets the use of one stall. Parkade Code: 5397 (Sept 15, 2025) Owners Storage Area: 6389 (Sept 15, 2025)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "16c63ca9-080c-5c2d-93f9-e438d563cf5d",
    checkin: "2025-09-18T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "217c8c2e-5e78-5881-9615-194602dd523d",
      thumbnails: [
        "https://www.dropbox.com/s/ytefhkn7md73b3h/Town%20house%2010.jpg?dl=0"
      ],
      alias: "Townhouse 10 (TH)",
      address: "900 Harvie Heights Rd, Harvie Heights, AB T1W 2W2",
      bathrooms: 1.5,
      bedrooms: 2,
      internetName: "S&TGuests",
      internetPassword: "GUESTSTH2021",
      parkingInstruction:
        "Free, unassigned parking anywhere in the parking lot",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "181984ee-10ff-5aaa-b2c5-ba8ed8fa6675",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "6b1733f4-22d9-556d-9295-35a68f1a17f2",
      thumbnails: [
        "https://workdrive.zoho.com/file/iph9x794b225beb0642caa01405ba162ea2cb"
      ],
      alias: "323B Solara Bow Bldg. B",
      address:
        "323 - 187 Kananaskis Way Canmore, AB T1W 0A3 Canada Bow Building: Building is the first left when you enter the parkade",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "Solara Wireless",
      internetPassword: "3Sisterscanmore",
      parkingInstruction: "",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1a871b00-64e2-55f2-8a4a-60d912344257",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "4c78c34a-b57e-5b00-b018-e1409002ecde",
      thumbnails: [
        "https://www.dropbox.com/s/vkpggpq0cxerots/209%20Canmore%20Place.jpg?dl=0"
      ],
      alias: "209 Canmore Place",
      address: "209 - 1002 8 Avenue, Canmore, Alberta T1W0C4",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "SHAW-EC53",
      internetPassword: "cellar2474below",
      parkingInstruction:
        "Parking garage 1 stall + visitor underground Keyfob inside the unit *Guests can also access the parking garage by using the button near the door (there is a switch inside the garage door that can be used without a keyfob to open the garage door manually - to access, use the door beside the garage door using code 05638)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1b2d1a7a-7503-52ba-92b6-0f644be9c22b",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "e7725dd8-e8ab-56fe-9bf2-6f1ff329602f",
      thumbnails: [
        "https://www.dropbox.com/s/vr1neknza70hhh5/305%20CC.jpg?dl=0"
      ],
      alias: "305 Canmore Crossing Bldg. A (CC)",
      address: "305 Building A- 1160 Railway Ave, Canmore, AB T1W 1P4, Canada",
      bathrooms: 2,
      bedrooms: 3,
      internetName: "hitronD8F0-easyconnect",
      internetPassword: "B51213071165",
      parkingInstruction:
        "Stall# 82 new Elevator and Garage Code: 12543# as of Jan 1 2023 Tandem parking is prohibited. No back-to-back parking One Vehicle only. If you are bringing two vehicles, you may park in Safeway or in the paid street parking. Video (using the stairways from the parkade) - https://youtu.be/tbZSmq7SBhg",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1b62e044-cb04-5414-992c-46baad579b12",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "52e75770-e244-512e-ae9f-dc0e7949d77e",
      thumbnails: [
        "https://www.dropbox.com/s/bxn2hhsrf5zre6m/0R2A4264.jpg?dl=0"
      ],
      alias: "101 Lodges Wolf",
      address:
        "101 - 107 Montane Road Canmore, Alberta T1W3J2 Floor: From the front desk (main floor), you need to go to the 1st floor where the unit is located. If you come from the back of the building, the unit is located at ground level.",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "Lodges at Canmore",
      internetPassword: "MontaneRoad",
      parkingInstruction:
        "Underground, secured parking which is located to the left of the main entrance of the Wolf Lodge. Guests need key cards to get in, which will be explained by the front desk",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1e02adf5-5375-5bde-8a85-502d80c6cf2e",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "376832b1-b3d7-5be0-9d91-0d7fa837ec6f",
      thumbnails: [
        "https://www.dropbox.com/s/xr9xlhrc24995l0/306%20Stylish%20Condo.JPG?dl=0"
      ],
      alias: "306 Richmond",
      address: "306 - 111 14 Ave SE Calgary AB T2G 1C7",
      bathrooms: 1,
      bedrooms: 2,
      internetName: "SHAW-01V0",
      internetPassword: "B51215013691",
      parkingInstruction:
        "Stall# 80 - covered, secured parking The underground parking garage at The Richmond is 30 meters left of the main entrance and the parking spot is #80. There are sensors to get into the building/garage. Scan the fob on the black box located on the left upon entering the garage.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1e387168-6244-54ff-856b-a544ce6ae48e",
    checkin: "2025-09-15T00:00:00.000Z",
    checkout: "2025-09-20T00:00:00.000Z",
    property: {
      propertyGroupId: "b8fff85d-0d3f-5d51-8700-c8e8765cf6ba",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/eozlnb9y9ck1hwl485usu/315-Solara-Aurora.jpg?rlkey=a3qjfrlzyfvju04j15ysjspse&st=n4up03nz&dl=0"
      ],
      alias: "315 Solara Aurora Bldg. A - Old Listing",
      address: "315 - 173 Kananaskis Way, Canmore, AB T1W 0A3, Canada",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "Solara Guest",
      internetPassword: "3Sisters",
      parkingInstruction:
        "No spot assigned, Guest can park at any empty spot. Code is 755517# The 3 buildings Chinook, Bow and Aurora can be accessed using the only underground parking entrance. PARKADE ACCESS NOTE: The inbound parkade door opens automatically from 8 AM to 10 PM. Between 10 PM and 8 AM, please use the provided access code to enter.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1edd99d9-6a0e-5640-958b-60d4f12f6090",
    checkin: "2025-09-18T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "7c73fd91-8303-505a-841b-35838b3fd9dd",
      thumbnails: [
        "https://www.dropbox.com/s/8ajitc2hf01ww0k/305%20lincoln.JPG?dl=0"
      ],
      alias: "306 Lincoln Park (LP)",
      address: "306- 10 Lincoln Park Canmore AB T1W 3E9",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "Shaw Internet(shared with 206)",
      internetPassword: "B51217054916",
      parkingInstruction:
        "Unassigned parking around the building Note that trailer and RV parking on Lincoln Road is not permitted under the Lincoln Park Condominium Bylaws. There is a bike rack/storage located at the right end of the outdoor parking lot. Bug: https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000024007/1224579000022138548",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1ee96c07-3683-5859-a6a1-95c6605c7845",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "c382d51c-0656-5ebf-9299-1df09ac46941",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/1w9ypp40bc8wmlr0qmel6/Golden-Ridge-9.jpg?rlkey=e1qy67dfyzrosdy0yn9w5kmkd&st=hg5p8a5f&dl=0"
      ],
      alias: "9 Golden Ridge",
      address: "9 - 1717B Mountain Ave, Canmore, AB T1W 2W1",
      bathrooms: 1.5,
      bedrooms: 1,
      internetName: "9 Golden Ridge Wifi Name: CGN-E9B0",
      internetPassword: "B60241019243 Wifi Password: cgnaa2016",
      parkingInstruction:
        "Parking spot #8 (USE THE PARKING PASS PROVIDED) Parkade code: 3790#",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1fa1bded-bd36-592b-b211-8534e0b45ded",
    checkin: "2025-09-14T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "7c73fd91-8303-505a-841b-35838b3fd9dd",
      thumbnails: [
        "https://www.dropbox.com/s/m5piho9z29s6eam/211%20Lincoln%20Park.jpg?dl=0"
      ],
      alias: "211 Lincoln Park (LP)",
      address: "211- 10 Lincoln Park Canmore AB T1W 3E9",
      bathrooms: 1,
      bedrooms: 0,
      internetName: "HitronE95B0",
      internetPassword: "B51213075626",
      parkingInstruction:
        "Unassigned parking around the building Note that trailer and RV parking on Lincoln Road is not permitted under the Lincoln Park Condominium Bylaws. There is a bike rack/storage located at the right end of the outdoor parking lot. Bug: https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000024007/1224579000022138548",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "1fa221d3-8bd9-5d7b-998a-ed84d57ff31d",
    checkin: "2025-09-13T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "33c16183-cd3e-507e-bad6-60f2dda68cf7",
      thumbnails: [
        "https://www.dropbox.com/s/qo1icz3gupcxp6d/306%20Boardwalk.jpg?dl=0"
      ],
      alias: "306 Boardwalk",
      address: "306 - 743 Railway Ave, Canmore, AB T1W 1P2, Canada",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "306Boardwalk",
      internetPassword: "boardwalk306st2023",
      parkingInstruction:
        "Stall# 33, marked as 306 Underground parking ONLY is available during your stay which can be accessed from Railway Avenue, (The outdoor parking lot next to the building is reserved for patrons of the The Boardwalk's businesses and is strictly enforced.) The garage door automatically opens during the day but closes in the evening at -8:00pm in which you will need to enter a code for access: 1230# . Mackenzie Creekside (towards the back of the garage).",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "21ce5ffa-ee73-5c2f-8f18-537fc18d5213",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "86f77b99-4894-50dd-9ad8-87e2bfb01ca9",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/y77r35px87vln7di99307/327-Windtower-New.jpg?rlkey=qqzvghn23d5xesrgv0ybpodwf&st=ayhys9y4&dl=0"
      ],
      alias: "327 Windtower (WT)",
      address: "327 - 160 Kananaskis Way Canmore AB T1W 3E2",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "SPSETUP-52FC",
      internetPassword: "design2145agree",
      parkingInstruction: "Stall# 182 Garage door code: 9627",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "21dd0d81-d68a-5194-b62a-6ffea889eb20",
    checkin: "2025-09-14T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "e7725dd8-e8ab-56fe-9bf2-6f1ff329602f",
      thumbnails: [
        "https://www.dropbox.com/s/8fq53fidv0xdovi/401%20Canmore%20Crossings.jpg?dl=0"
      ],
      alias: "401 Canmore Crossing Bldg. B (CC)",
      address: "401 Building B - 1140 Railway Ave, Canmore, AB T1W 1P4, Canada",
      bathrooms: 2,
      bedrooms: 3,
      internetName: "CODA 4582 Secondary Account (used for the TV):",
      internetPassword:
        "B51215019866 Secondary Account (used for the TV): GuestPassword",
      parkingInstruction:
        "Stall# 85 New elevator code: 61900# as of Jan 1 2023 or 14774# Tandem parking is prohibited. No back-to-back parking One Vehicle only. If you are bringing two vehicles, you may park in Safeway or in the paid street parking. BUILDING B - Due to the frequency of issues with this elevator, door pads have now been added at the stairwell on the west end of the building. in the event of a lock out, your guests can access there unit by utilizing the parkade entrance. The code for the keypad is the same as your elevator code. Video (using the stairways from the parkade) - https://youtu.be/C2xdgVCrxL0",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "22a832ed-4e9a-56cf-8462-c683d4257528",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "57366207-f590-5cd0-ba1d-46dcea6bf07d",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/c4nnw79b253wx5xru5sxr/1305-Sparrowhwak.jpg?rlkey=j9xmcby94hqd0ffgqx1fozd2a&st=z68nqcns&dl=0"
      ],
      alias: "1305 Sparrowhawk",
      address: "1305 - 200 2nd St, Dead Man's Flats, Alberta T1W 2W4",
      bathrooms: 2,
      bedrooms: 3,
      internetName: "Sparrowhawk Lodge",
      internetPassword:
        "60911666 (expires in Dec 01 2030, please contact Intello) https://portal.intello.com/l/7x357mw8jh9z3x Link to be used to change password IF needed.",
      parkingInstruction:
        "Update from Tina (July 24, 2024): There is underground parking for 1305 Sparrowhaw, it's first come first serve and the door code will work on all access points in the building. Open parking outside (no access to the garage yet) *As of July 21,2024 (inspection form)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "23c3f713-8595-5cd1-89dd-3268cc4034b4",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "be9a2828-2802-567f-b2c1-ba2d3ea5f3ce",
      thumbnails: [
        "https://www.dropbox.com/s/z8i3q8pf701r9fe/418%20Grizzly%20Lodge.jpg?dl=0"
      ],
      alias: "418 Lodges Grizzly",
      address: "418, 101 Montane Road, Grizzly, Canmore, Alberta T1W 0G2",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "LodgesatCanmore",
      internetPassword: "MontaneRoad",
      parkingInstruction:
        "You can use the underground parking at Grizzly Lodge building. Once you get the keycard from the front desk, just ask where is the parking located.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "24165e1e-7a7a-5197-b4fe-b9dd0825bc72",
    checkin: "2025-09-16T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "e711801a-7f4f-5b96-99c1-af57cd66a530",
      thumbnails: [
        "https://workdrive.zoho.com/file/qlr1347e8f8f1ce8d449992b2a9783198f4e7"
      ],
      alias: "202 Parkland Plaza",
      address: "202 - 999 Bow Valley Trail, Canmore, AB T1W 1N4",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "202parkland",
      internetPassword: "3sisters",
      parkingInstruction:
        "inside grande rockies resort parking garage. Labled private 202 need to walk from there to parkand plaza building",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "245d0e36-db29-558c-95ce-ccaee136f34b",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "57f52b2a-2735-5766-a606-b27fd9c95efa",
      thumbnails: [
        "https://www.dropbox.com/s/2juhg7nsvdznn1d/4206%20Copperstone.jpg?dl=0"
      ],
      alias: "4206 Copperstone",
      address: "4206 - 250 2 Ave Dead Man's Flats AB T1W 2W4 - Unit 4206",
      bathrooms: 2,
      bedrooms: 3,
      internetName: "COWNERS",
      internetPassword: "luvcps17",
      parkingInstruction:
        "PARKING CODE: 9687# / 7911# NEW BUILDING CODE: 9879# 9/5/2024 PROMO CODE: I1XU1 Old Code: 6210# ***************************************************************************** The parking garage is 25m left of the main entrance and there are is no assigned parking. IMPORTANT INFORMATION: - Guests will need to provide their license plates, make, model, and state for registration. - Once provided, please log into https://indigoneo.ca/en to complete the registration of the vehicle(s). - ONLY 1 vehicle can be registered per unit. - Vehicle information per unit needs to be removed upon checkout. How do I start/register a guest's vehicle/parking session online? 1. Log into https://indigoneo.ca/en (Credentials can be found in Zoho Vault) 2. Type “C606” for Copperstone Resort parking under Find and book my Parking (One-Time Purchase) 3. Parking should be under Hourly and click Book Now. 4. Input the guest’s check-in and checkout time and date then click Next. 5. Choose how many days the guest is staying. 6. Add the Promo code provided by the Copperstone Resort to reflect 0 amount then click ADD 7. Under Select Vehicle, click Add vehicle and input the information needed. 8. Click Back to booking once vehicle has been registered 9. Make sure the vehicle selected is correct based on the unit and click Pay for Parking at the bottom page to receive the QR and confirmation email. Loom Video on how to register vehicle information: https://www.loom.com/share/a56b425ad8c1406e8f50394846e6aeb7 How to remove vehicle information: 1. Log in to https://indigoneo.ca/en. 2. Follow the steps 1-6 above. 3. On the add vehicle page, move the cursor on the right side of the existing vehicle information and click the trash icon to delete the old license information. **You can also remove the vehicle information after logging in, you may click the human Icon and go to dashboard. Click my Vehicle on top of the page to view the registered vehicle. If you get a guest complaining about getting a ticket WHILE displaying the Indigo pass, do the following: 1) We can go to Indigo's website: https://ca.parkindigo.com/en/payment-notice 2)Select the correct region (Canmore) 3) Input the license plate or infraction number. 4)From there, we can see the photo the park enforcer took at the moment the notice was created.\" ***************************************************************************** The parking garage is 25m left of the main entrance and there are is no assigned parking. IMPORTANT INFORMATION: - Guests will need to provide their license plates, make, model, and state for registration. - Once provided, please log into https://indigoneo.ca/en to complete the registration of the vehicle(s). - ONLY 1 vehicle can be registered per unit. - Vehicle information per unit needs to be removed upon checkout. How do I start/register a guest's vehicle/parking session online? 1. Log into https://indigoneo.ca/en (Credentials can be found in Zoho Vault) 2. Type “C606” for Copperstone Resort parking under Find and book my Parking (One-Time Purchase) 3. Parking should be under Hourly and click Book Now. 4. Input the guest’s check-in and checkout time and date then click Next. 5. Choose how many days the guest is staying. 6. Add the Promo code provided by the Copperstone Resort to reflect 0 amount then click ADD 7. Under Select Vehicle, click Add vehicle and input the information needed. 8. Click Back to booking once vehicle has been registered 9. Make sure the vehicle selected is correct based on the unit and click Pay for Parking at the bottom page to receive the QR and confirmation email. Loom Video on how to register vehicle information: https://www.loom.com/share/a56b425ad8c1406e8f50394846e6aeb7 How to remove vehicle information: 1. Log in to https://indigoneo.ca/en. 2. Follow the steps 1-6 above. 3. On the add vehicle page, move the cursor on the right side of the existing vehicle information and click the trash icon to delete the old license information. **You can also remove the vehicle information after logging in, you may click the human Icon and go to dashboard. Click my Vehicle on top of the page to view the registered vehicle. If you get a guest complaining about getting a ticket WHILE displaying the Indigo pass, do the following: 1) We can go to Indigo's website: https://ca.parkindigo.com/en/payment-notice 2)Select the correct region (Canmore) 3) Input the license plate or infraction number. 4)From there, we can see the photo the park enforcer took at the moment the notice was created.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "24f7419e-4c9c-56cd-936b-c05d50d52452",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "2468ced7-94d9-5c1b-9c59-f8424c2f36a6",
      thumbnails: [
        "https://workdrive.zoho.com/file/qwtlu3c380676d6d44d46a7728fc5c973a8c4"
      ],
      alias: "302 Silver Creek (SC)",
      address: "302 - 1818 Mountain Ave, Canmore, AB T1W 2W1",
      bathrooms: 2,
      bedrooms: 2,
      internetName: "302sc",
      internetPassword: "3sisters",
      parkingInstruction:
        "Unassigned parking. Garage Door Guest Code: 1589 (works 24hrs a day) The underground, heated parkade is accessible through a keypad. Parking is not assigned - take any open parking space.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "2501a8b9-e593-5759-88f0-e5cc452674df",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "7c73fd91-8303-505a-841b-35838b3fd9dd",
      thumbnails: [
        "https://www.dropbox.com/s/mqjf60dncmid714/303%20Lincoln.JPG?dl=0"
      ],
      alias: "303 Lincoln Park (LP)",
      address: "303 - 10 Lincoln Park Canmore AB T1W 3E9",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "Hitron D6730",
      internetPassword: "B51215017500",
      parkingInstruction:
        "Unassigned parking around the building Note that trailer and RV parking on Lincoln Road is not permitted under the Lincoln Park Condominium Bylaws. There is a bike rack/storage located at the right end of the outdoor parking lot. Bug: https://bugtracker.zoho.com/portal/stproperties#buginfo/1224579000000024007/1224579000022138548",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "26ae2b93-71ea-5200-8b09-cd2c6d34233e",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-19T11:00:00.000Z",
    property: {
      propertyGroupId: "3c4917a4-9512-5d6d-9d98-5c60b5b59b80",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/ajqm1velb9m9ob93ofms5/105-Skyridge.jpg?rlkey=tp7m1ts4yg2sembhwacyvakdj&st=dbmtcktc&dl=0"
      ],
      alias: "105 Skyridge (5)",
      address: "105 - 750 Harvie Heights Rd, Harvie Heights, AB T1W 2W2",
      bathrooms: 2.5,
      bedrooms: 3,
      internetName: "Sky105",
      internetPassword: "Rundle105",
      parkingInstruction:
        "Stall #P-105 Behind the building after entering where the building name (Skyridge)",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "27b33f55-076b-5d2e-a7e0-1effcba81b06",
    checkin: "2025-09-15T16:00:00.000Z",
    checkout: "2025-09-17T11:00:00.000Z",
    property: {
      propertyGroupId: "abd25b29-f289-5142-8f70-35112753c5cb",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/38blggdpueius4x7om5pp/308-Rocky-Mountains.jpg?rlkey=cmfbdhye3qpgcdyc2n3vv2axs&dl=0"
      ],
      alias: "308 Rocky Mountains",
      address: "308 - 1151 Gerry Sorensen Way, Kimberley, BC V1A 3E9",
      bathrooms: 1,
      bedrooms: 1,
      internetName: "Rocky_Mountain_Condos",
      internetPassword: "Owner$2021",
      parkingInstruction:
        "Open parking in front of the building (no assigned spots, however, we recommend only using 1 spot)",
      groupName: "Kimberley"
    }
  },
  {
    id: "27e4bea8-0d2d-5d39-a27d-17fd4807e3f9",
    checkin: "2025-09-17T16:00:00.000Z",
    checkout: "2025-09-20T11:00:00.000Z",
    property: {
      propertyGroupId: "c382d51c-0656-5ebf-9299-1df09ac46941",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/iwixajbkf1dfilzgng56e/102-Golden-Ridge.jpg?rlkey=0q5kmz41hub7cvdeb0ph1y4os&st=mg7ftqmj&dl=0"
      ],
      alias: "102 Golden Ridge",
      address: "102 - 1717A Mountain Ave, Canmore, AB T1W 2W1",
      bathrooms: 1.5,
      bedrooms: 1,
      internetName: "102 Golden Ridge",
      internetPassword: "3Sisters",
      parkingInstruction:
        "Parking spot #4 (USE THE PARKING PASS PROVIDED) Parkade code: 3790#",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  },
  {
    id: "2837f31d-243d-551e-9a01-cb43aad9a902",
    checkin: "2025-09-13T16:00:00.000Z",
    checkout: "2025-09-18T11:00:00.000Z",
    property: {
      propertyGroupId: "6514a030-d208-5718-b5d7-f79193f76380",
      thumbnails: [
        "https://www.dropbox.com/scl/fi/zjghjxztlenza4zpoog69/303A-Tamarack.jpg?rlkey=2322lnwbgullawjdqizcvf050&dl=0"
      ],
      alias: "303A Tamarack",
      address: "303A - 1012 Spring Creek Dr, Canmore, AB T1W 0N1",
      bathrooms: 2.5,
      bedrooms: 2,
      internetName: "303tamarack",
      internetPassword: "3sisters",
      parkingInstruction:
        "Stall# 303A None required between 7:00am and 10:00 pm as the grocery store uses it. RemoteLock code works for the parking. 1. The entrance to the parking garage is located behind the main building. 2. Enter the parking garage code to access this. Make sure to press the # sign after entering the code. 3. Once you've entered the parking garage, locate the assigned parking spot for the unit. Please make sure to park your vehicle at the designated parking slot only.",
      groupName: "Canmore - Calgary - HH - DMF"
    }
  }
];

let nextId = 3;

class ReservationService {
  getAllReservations() {
    return reservations.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  getReservationById(id) {
    return reservations.find(reservation => reservation.id === id);
  }

  createReservation(reservationData) {
    const newReservation = {
      id: nextId++,
      ...reservationData,
      status: reservationData.status || "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    reservations.push(newReservation);
    return newReservation;
  }

  updateReservation(id, updateData) {
    const index = reservations.findIndex(reservation => reservation.id === id);

    if (index === -1) {
      return null;
    }

    reservations[index] = {
      ...reservations[index],
      ...updateData,
      id: reservations[index].id, // Ensure ID doesn't change
      createdAt: reservations[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    };

    return reservations[index];
  }

  deleteReservation(id) {
    const index = reservations.findIndex(reservation => reservation.id === id);

    if (index === -1) {
      return false;
    }

    reservations.splice(index, 1);
    return true;
  }

  // Utility method to get reservations by status
  getReservationsByStatus(status) {
    return reservations.filter(reservation => reservation.status === status);
  }

  // Utility method to get reservations by date
  getReservationsByDate(date) {
    return reservations.filter(reservation => reservation.date === date);
  }
}

module.exports = new ReservationService();
