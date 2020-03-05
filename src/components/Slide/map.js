import React from "react";
import { useSelector } from "react-redux"
import { ResponsiveChoropleth } from '@nivo/geo'

import mapFeature from "../../config/map.json"

import './map.scss';

const Map = ()=> {
  // const data = useSelector(state=>state.countryInfected);
  const data = [
    {
      "id": "AFG",
      "value": 490479
    },
    {
      "id": "AGO",
      "value": 149628
    },
    {
      "id": "ALB",
      "value": 236682
    },
    {
      "id": "ARE",
      "value": 714932
    },
    {
      "id": "ARG",
      "value": 263904
    },
    {
      "id": "ARM",
      "value": 134925
    },
    {
      "id": "ATA",
      "value": 929278
    },
    {
      "id": "ATF",
      "value": 33943
    },
    {
      "id": "AUT",
      "value": 339180
    },
    {
      "id": "AZE",
      "value": 359120
    },
    {
      "id": "BDI",
      "value": 743646
    },
    {
      "id": "BEL",
      "value": 748981
    },
    {
      "id": "BEN",
      "value": 212867
    },
    {
      "id": "BFA",
      "value": 834050
    },
    {
      "id": "BGD",
      "value": 187219
    },
    {
      "id": "BGR",
      "value": 349873
    },
    {
      "id": "BHS",
      "value": 937200
    },
    {
      "id": "BIH",
      "value": 13692
    },
    {
      "id": "BLR",
      "value": 823658
    },
    {
      "id": "BLZ",
      "value": 63565
    },
    {
      "id": "BOL",
      "value": 807207
    },
    {
      "id": "BRN",
      "value": 456024
    },
    {
      "id": "BTN",
      "value": 899542
    },
    {
      "id": "BWA",
      "value": 460161
    },
    {
      "id": "CAF",
      "value": 120599
    },
    {
      "id": "CAN",
      "value": 595997
    },
    {
      "id": "CHE",
      "value": 230284
    },
    {
      "id": "CHL",
      "value": 430307
    },
    // {
    //   "id": "CHN",
    //   "value": 756744
    // },
    {
      "id": "CIV",
      "value": 55024
    },
    {
      "id": "CMR",
      "value": 430190
    },
    {
      "id": "COG",
      "value": 937788
    },
    {
      "id": "COL",
      "value": 679425
    },
    {
      "id": "CRI",
      "value": 500910
    },
    {
      "id": "CUB",
      "value": 535392
    },
    {
      "id": "-99",
      "value": 501125
    },
    {
      "id": "CYP",
      "value": 67890
    },
    {
      "id": "CZE",
      "value": 133100
    },
    {
      "id": "DEU",
      "value": 3187
    },
    {
      "id": "DJI",
      "value": 487795
    },
    {
      "id": "DNK",
      "value": 746450
    },
    {
      "id": "DOM",
      "value": 279837
    },
    {
      "id": "DZA",
      "value": 192757
    },
    {
      "id": "ECU",
      "value": 859280
    },
    {
      "id": "EGY",
      "value": 672420
    },
    {
      "id": "ERI",
      "value": 230929
    },
    {
      "id": "ESP",
      "value": 738409
    },
    {
      "id": "EST",
      "value": 50734
    },
    {
      "id": "ETH",
      "value": 956196
    },
    {
      "id": "FIN",
      "value": 508459
    },
    {
      "id": "FJI",
      "value": 603653
    },
    {
      "id": "FLK",
      "value": 990993
    },
    {
      "id": "FRA",
      "value": 814443
    },
    {
      "id": "GAB",
      "value": 209695
    },
    {
      "id": "GBR",
      "value": 240497
    },
    {
      "id": "GEO",
      "value": 884226
    },
    {
      "id": "GHA",
      "value": 868867
    },
    {
      "id": "GIN",
      "value": 960840
    },
    {
      "id": "GMB",
      "value": 897876
    },
    {
      "id": "GNB",
      "value": 215140
    },
    {
      "id": "GNQ",
      "value": 525601
    },
    {
      "id": "GRC",
      "value": 18508
    },
    {
      "id": "GTM",
      "value": 414099
    },
    {
      "id": "GUY",
      "value": 275578
    },
    {
      "id": "HND",
      "value": 405307
    },
    {
      "id": "HRV",
      "value": 141306
    },
    {
      "id": "HTI",
      "value": 786304
    },
    {
      "id": "HUN",
      "value": 466467
    },
    {
      "id": "IDN",
      "value": 466297
    },
    {
      "id": "IND",
      "value": 204261
    },
    {
      "id": "IRL",
      "value": 195588
    },
    {
      "id": "IRN",
      "value": 747078
    },
    {
      "id": "IRQ",
      "value": 177864
    },
    {
      "id": "ISL",
      "value": 340016
    },
    {
      "id": "ISR",
      "value": 387494
    },
    {
      "id": "ITA",
      "value": 663717
    },
    {
      "id": "JAM",
      "value": 632428
    },
    {
      "id": "JOR",
      "value": 641967
    },
    {
      "id": "JPN",
      "value": 155594
    },
    {
      "id": "KAZ",
      "value": 904770
    },
    {
      "id": "KEN",
      "value": 452552
    },
    {
      "id": "KGZ",
      "value": 692275
    },
    {
      "id": "KHM",
      "value": 956760
    },
    {
      "id": "OSA",
      "value": 175793
    },
    {
      "id": "KWT",
      "value": 613455
    },
    {
      "id": "LAO",
      "value": 41181
    },
    {
      "id": "LBN",
      "value": 680412
    },
    {
      "id": "LBR",
      "value": 719885
    },
    {
      "id": "LBY",
      "value": 720381
    },
    {
      "id": "LKA",
      "value": 557333
    },
    {
      "id": "LSO",
      "value": 681078
    },
    {
      "id": "LTU",
      "value": 400623
    },
    {
      "id": "LUX",
      "value": 682060
    },
    {
      "id": "LVA",
      "value": 713935
    },
    {
      "id": "MAR",
      "value": 877673
    },
    {
      "id": "MDA",
      "value": 488066
    },
    {
      "id": "MDG",
      "value": 51336
    },
    {
      "id": "MEX",
      "value": 215021
    },
    {
      "id": "MKD",
      "value": 211734
    },
    {
      "id": "MLI",
      "value": 520914
    },
    {
      "id": "MMR",
      "value": 909743
    },
    {
      "id": "MNE",
      "value": 561923
    },
    {
      "id": "MNG",
      "value": 756809
    },
    {
      "id": "MOZ",
      "value": 898525
    },
    {
      "id": "MRT",
      "value": 328679
    },
    {
      "id": "MWI",
      "value": 271907
    },
    {
      "id": "MYS",
      "value": 840388
    },
    {
      "id": "NAM",
      "value": 65861
    },
    {
      "id": "NCL",
      "value": 175561
    },
    {
      "id": "NER",
      "value": 450021
    },
    {
      "id": "NGA",
      "value": 219041
    },
    {
      "id": "NIC",
      "value": 616075
    },
    {
      "id": "NLD",
      "value": 252096
    },
    {
      "id": "NOR",
      "value": 770558
    },
    {
      "id": "NPL",
      "value": 929879
    },
    {
      "id": "NZL",
      "value": 249903
    },
    {
      "id": "OMN",
      "value": 815268
    },
    {
      "id": "PAK",
      "value": 970552
    },
    {
      "id": "PAN",
      "value": 727858
    },
    {
      "id": "PER",
      "value": 617708
    },
    {
      "id": "PHL",
      "value": 908157
    },
    {
      "id": "PNG",
      "value": 50551
    },
    {
      "id": "POL",
      "value": 516490
    },
    {
      "id": "PRI",
      "value": 435859
    },
    {
      "id": "PRT",
      "value": 941415
    },
    {
      "id": "PRY",
      "value": 881723
    },
    {
      "id": "QAT",
      "value": 529991
    },
    {
      "id": "ROU",
      "value": 992878
    },
    {
      "id": "RUS",
      "value": 147742
    },
    {
      "id": "RWA",
      "value": 779860
    },
    {
      "id": "ESH",
      "value": 102815
    },
    {
      "id": "SAU",
      "value": 258508
    },
    {
      "id": "SDN",
      "value": 591809
    },
    {
      "id": "SDS",
      "value": 219064
    },
    {
      "id": "SEN",
      "value": 597758
    },
    {
      "id": "SLB",
      "value": 739262
    },
    {
      "id": "SLE",
      "value": 747738
    },
    {
      "id": "SLV",
      "value": 440409
    },
    {
      "id": "ABV",
      "value": 327236
    },
    {
      "id": "SOM",
      "value": 753216
    },
    {
      "id": "SRB",
      "value": 149803
    },
    {
      "id": "SUR",
      "value": 119112
    },
    {
      "id": "SVK",
      "value": 458107
    },
    {
      "id": "SVN",
      "value": 440725
    },
    {
      "id": "SWZ",
      "value": 23554
    },
    {
      "id": "SYR",
      "value": 786329
    },
    {
      "id": "TCD",
      "value": 350229
    },
    {
      "id": "TGO",
      "value": 230018
    },
    {
      "id": "THA",
      "value": 172266
    },
    {
      "id": "TJK",
      "value": 239265
    },
    {
      "id": "TKM",
      "value": 863009
    },
    {
      "id": "TLS",
      "value": 394717
    },
    {
      "id": "TTO",
      "value": 217648
    },
    {
      "id": "TUN",
      "value": 865760
    },
    {
      "id": "TUR",
      "value": 723303
    },
    {
      "id": "TWN",
      "value": 148209
    },
    {
      "id": "TZA",
      "value": 109602
    },
    {
      "id": "UGA",
      "value": 294327
    },
    {
      "id": "UKR",
      "value": 505290
    },
    {
      "id": "URY",
      "value": 555516
    },
    {
      "id": "USA",
      "value": 899109
    },
    {
      "id": "UZB",
      "value": 787886
    },
    {
      "id": "VEN",
      "value": 319680
    },
    {
      "id": "VNM",
      "value": 700792
    },
    {
      "id": "VUT",
      "value": 694343
    },
    {
      "id": "PSE",
      "value": 569200
    },
    {
      "id": "YEM",
      "value": 463068
    },
    {
      "id": "ZAF",
      "value": 517321
    },
    {
      "id": "ZMB",
      "value": 483833
    },
    {
      "id": "ZWE",
      "value": 809245
    },
    {
      "id": "KOR",
      "value": 84028
    }
  ]
  
  return (
    <div className="map-wrapper">
      <div className="close-btn">Close</div>
      <ResponsiveChoropleth
        data={data}
        features={mapFeature.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, 1000000]}
        unknownColor="#c7c7c7"
        label="properties.name"
        valueFormat=".2s"
        projectionType="equirectangular"
        projectionScale={155}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 200,
            translateY: -120,
            itemsSpacing: 0,
            itemWidth: 95,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#ffffff',
            itemOpacity: 0.95,
            symbolSize: 18,
          }
        ]}
      />
    </div>
  )
}

export default Map;