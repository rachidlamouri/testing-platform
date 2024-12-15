import React, { forwardRef } from "react"
import { SvgWrapperComponent } from "../dynamicComponentTypes"
import { EllipseWrapper } from "../wrappers/ellipseWrapper"
import { GroupWrapper } from "../wrappers/groupWrapper"
import { PathWrapper } from "../wrappers/pathWrapper"
import { PolygonWrapper } from "../wrappers/polygonWrapper"
import { SvgWrapper } from "../wrappers/svgWrapper"
import { TextWrapper } from "../wrappers/textWrapper"
import { RankGroup } from "../providers/rankGroup"
import { Skill } from "../providers/skill"
import { Prerequisite } from "../providers/prerequisite"

export const RootGraph: SvgWrapperComponent = forwardRef<SVGSVGElement>((props, ref) => { return  (<SvgWrapper
    width="100%"
    height="100%"
    viewBox="0.00 0.00 4698.50 8007.21"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}><><GroupWrapper
            id="1adafe6db7788063f4117ab4c77b6c55bc78bcab"
            className="graph"
            transform="scale(1 1) rotate(0) translate(4 8003.21)"><PolygonWrapper
                fill="white"
                stroke="transparent"
                points="-4,4 -4,-8003.21 4694.5,-8003.21 4694.5,4 -4,4"></PolygonWrapper><RankGroup
                {...{
                    id: "B"
                }}><GroupWrapper id="1009d72ff3fc9abcb3b68913f6fd68c3b3495de3" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M20,-5214.74C20,-5214.74 1126.5,-5214.74 1126.5,-5214.74 1132.5,-5214.74 1138.5,-5220.74 1138.5,-5226.74 1138.5,-5226.74 1138.5,-5944.74 1138.5,-5944.74 1138.5,-5950.74 1132.5,-5956.74 1126.5,-5956.74 1126.5,-5956.74 20,-5956.74 20,-5956.74 14,-5956.74 8,-5950.74 8,-5944.74 8,-5944.74 8,-5226.74 8,-5226.74 8,-5220.74 14,-5214.74 20,-5214.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "S"
                }}><GroupWrapper id="ca0e6b52b725f310bc92cbb75be8da15531d0507" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M594,-3904.74C594,-3904.74 1703,-3904.74 1703,-3904.74 1709,-3904.74 1715,-3910.74 1715,-3916.74 1715,-3916.74 1715,-5194.74 1715,-5194.74 1715,-5200.74 1709,-5206.74 1703,-5206.74 1703,-5206.74 594,-5206.74 594,-5206.74 588,-5206.74 582,-5200.74 582,-5194.74 582,-5194.74 582,-3916.74 582,-3916.74 582,-3910.74 588,-3904.74 594,-3904.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "G"
                }}><GroupWrapper id="41e7415778090bdc3aeec241d66135d1174256cb" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1193,-298.74C1193,-298.74 2264.5,-298.74 2264.5,-298.74 2270.5,-298.74 2276.5,-304.74 2276.5,-310.74 2276.5,-310.74 2276.5,-2148.74 2276.5,-2148.74 2276.5,-2154.74 2270.5,-2160.74 2264.5,-2160.74 2264.5,-2160.74 1193,-2160.74 1193,-2160.74 1187,-2160.74 1181,-2154.74 1181,-2148.74 1181,-2148.74 1181,-310.74 1181,-310.74 1181,-304.74 1187,-298.74 1193,-298.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "P"
                }}><GroupWrapper id="b867c49ed88a542860e98d2340f907557cc71617" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1158.5,-5426.74C1158.5,-5426.74 2337.5,-5426.74 2337.5,-5426.74 2343.5,-5426.74 2349.5,-5432.74 2349.5,-5438.74 2349.5,-5438.74 2349.5,-7948.74 2349.5,-7948.74 2349.5,-7954.74 2343.5,-7960.74 2337.5,-7960.74 2337.5,-7960.74 1158.5,-7960.74 1158.5,-7960.74 1152.5,-7960.74 1146.5,-7954.74 1146.5,-7948.74 1146.5,-7948.74 1146.5,-5438.74 1146.5,-5438.74 1146.5,-5432.74 1152.5,-5426.74 1158.5,-5426.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "D"
                }}><GroupWrapper id="9574fef77399509c69a11591faa8172a16549049" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1756.5,-2168.74C1756.5,-2168.74 3874.5,-2168.74 3874.5,-2168.74 3880.5,-2168.74 3886.5,-2174.74 3886.5,-2180.74 3886.5,-2180.74 3886.5,-4130.74 3886.5,-4130.74 3886.5,-4136.74 3880.5,-4142.74 3874.5,-4142.74 3874.5,-4142.74 1756.5,-4142.74 1756.5,-4142.74 1750.5,-4142.74 1744.5,-4136.74 1744.5,-4130.74 1744.5,-4130.74 1744.5,-2180.74 1744.5,-2180.74 1744.5,-2174.74 1750.5,-2168.74 1756.5,-2168.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "C"
                }}><GroupWrapper id="063d8811c549368b59319b2950ee4c3c7285851f" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2369.5,-4590.74C2369.5,-4590.74 3213.5,-4590.74 3213.5,-4590.74 3219.5,-4590.74 3225.5,-4596.74 3225.5,-4602.74 3225.5,-4602.74 3225.5,-5768.74 3225.5,-5768.74 3225.5,-5774.74 3219.5,-5780.74 3213.5,-5780.74 3213.5,-5780.74 2369.5,-5780.74 2369.5,-5780.74 2363.5,-5780.74 2357.5,-5774.74 2357.5,-5768.74 2357.5,-5768.74 2357.5,-4602.74 2357.5,-4602.74 2357.5,-4596.74 2363.5,-4590.74 2369.5,-4590.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "GC"
                }}><GroupWrapper id="de28ac7f8cf4d8e9f84e754a43483e97fc4faa93" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3245.5,-4518.74C3245.5,-4518.74 4061.5,-4518.74 4061.5,-4518.74 4067.5,-4518.74 4073.5,-4524.74 4073.5,-4530.74 4073.5,-4530.74 4073.5,-5920.74 4073.5,-5920.74 4073.5,-5926.74 4067.5,-5932.74 4061.5,-5932.74 4061.5,-5932.74 3245.5,-5932.74 3245.5,-5932.74 3239.5,-5932.74 3233.5,-5926.74 3233.5,-5920.74 3233.5,-5920.74 3233.5,-4530.74 3233.5,-4530.74 3233.5,-4524.74 3239.5,-4518.74 3245.5,-4518.74"></PathWrapper></GroupWrapper></RankGroup><RankGroup
                {...{
                    id: "SSL"
                }}><GroupWrapper id="34ce58546f43846696101fc7fa373fd68551e19f" className="cluster"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4093.5,-5671.74C4093.5,-5671.74 4670.5,-5671.74 4670.5,-5671.74 4676.5,-5671.74 4682.5,-5677.74 4682.5,-5683.74 4682.5,-5683.74 4682.5,-6401.74 4682.5,-6401.74 4682.5,-6407.74 4676.5,-6413.74 4670.5,-6413.74 4670.5,-6413.74 4093.5,-6413.74 4093.5,-6413.74 4087.5,-6413.74 4081.5,-6407.74 4081.5,-6401.74 4081.5,-6401.74 4081.5,-5683.74 4081.5,-5683.74 4081.5,-5677.74 4087.5,-5671.74 4093.5,-5671.74"></PathWrapper></GroupWrapper></RankGroup><Skill
                {...{
                    id: "Popping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Popping",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["45 Degree Flick", "Doinking", "Double Touches"]
                }}><GroupWrapper id="91a3270cb0d1d83b450b4ded0b087df6325a3148" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976,-4546.74C976,-4546.74 785,-4546.74 785,-4546.74 779,-4546.74 773,-4540.74 773,-4534.74 773,-4534.74 773,-4464.74 773,-4464.74 773,-4458.74 779,-4452.74 785,-4452.74 785,-4452.74 976,-4452.74 976,-4452.74 982,-4452.74 988,-4458.74 988,-4464.74 988,-4464.74 988,-4534.74 988,-4534.74 988,-4540.74 982,-4546.74 976,-4546.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4510.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Popping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4470.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "45 Degree Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: ["ball with the corner of their car for power.", {
                        text: "Avatarmanz 45 Degree Flick Tutorial.",
                        url: "https://www.youtube.com/watch?v=bmnALGzj_LE"
                    }, {
                        text: "Dignitas 45-Degree flick guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12789/how-to-master-the-45-degree-flick"
                    }],

                    title: "45 Degree Flick",
                    description: "Usually during a hood dribble, the player pops (Hitting the ball in a way where it allows the player to hit it again) the ball then angles their car to hit the",
                    rank: "GC",
                    upstreamSkills: ["Directional Flick", "Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="e47736dcd47611794872bd38789deff62ebce546" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3798,-5720.74C3798,-5720.74 3509,-5720.74 3509,-5720.74 3503,-5720.74 3497,-5714.74 3497,-5708.74 3497,-5708.74 3497,-5638.74 3497,-5638.74 3497,-5632.74 3503,-5626.74 3509,-5626.74 3509,-5626.74 3798,-5626.74 3798,-5626.74 3804,-5626.74 3810,-5632.74 3810,-5638.74 3810,-5638.74 3810,-5708.74 3810,-5708.74 3810,-5714.74 3804,-5720.74 3798,-5720.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5684.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"45 Degree Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5644.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "45 Degree Flick",
                    tailId: "Popping"
                }}><GroupWrapper id="e74d18ecc73812660d41be9ec4b40bbe0c8043e5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.23,-4504.88C1041.58,-4501.3 1102.32,-4486.7 1138.5,-4443.74 1151.61,-4428.17 1131.8,-4274.81 1146.5,-4260.74 1335.92,-4079.41 1549.71,-4076.69 1736.5,-4260.74 1747.19,-4271.26 1738.02,-4787.2 1744.5,-4800.74 1895.37,-5115.88 2199.1,-4987.36 2349.5,-5302.74 2357.61,-5319.74 2344.1,-5967.5 2357.5,-5980.74 2494.7,-6116.32 3086.95,-6114.94 3225.5,-5980.74 3245.54,-5961.32 3214.79,-5750.44 3233.5,-5729.74 3295.69,-5660.92 3398.59,-5646.41 3486.85,-5649.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3486.85,-5652.85 3496.99,-5649.76 3487.14,-5645.85 3486.85,-5652.85"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doinking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                    }],

                    title: "Doinking",
                    description: "When you are under the ball and just kind of 'pop it', not so much a new direction, but adding speed to the ball by doing so.",
                    rank: "G",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: ["Spring Roll"]
                }}><GroupWrapper id="22b7d554e91104658d1fd7dd53c5509ac0553f92" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1585.5,-1500.74C1585.5,-1500.74 1397.5,-1500.74 1397.5,-1500.74 1391.5,-1500.74 1385.5,-1494.74 1385.5,-1488.74 1385.5,-1488.74 1385.5,-1418.74 1385.5,-1418.74 1385.5,-1412.74 1391.5,-1406.74 1397.5,-1406.74 1397.5,-1406.74 1585.5,-1406.74 1585.5,-1406.74 1591.5,-1406.74 1597.5,-1412.74 1597.5,-1418.74 1597.5,-1418.74 1597.5,-1488.74 1597.5,-1488.74 1597.5,-1494.74 1591.5,-1500.74 1585.5,-1500.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1464.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Doinking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1424.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doinking",
                    tailId: "Popping"
                }}><GroupWrapper id="2c4d9f9f18fcf706152e3f4ba6b7590de8a75010" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.29,-4505.52C1042,-4502.18 1103.06,-4487.61 1138.5,-4443.74 1151.3,-4427.89 1133.28,-1525.24 1146.5,-1509.74 1201.17,-1445.62 1298.14,-1434.69 1375.23,-1438.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1375.31,-1441.56 1385.48,-1438.58 1375.68,-1434.57 1375.31,-1441.56"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double Touches",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Ytzi13 Air roll usage comment",
                        url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                    }, {
                        text: "Dignitas air rolling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12633/air-rolling-a-rocket-league-guide-on-effective-aerials"
                    }],

                    title: "Double Touches",
                    description: "Usually after a pop (Hitting the ball in a way where it allows the player to hit it again,) a double touch is where the player hits the ball off the wall to pass to themselves.",
                    rank: "D",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="f21817e858b7a7029bb1d230c1c166612745bbca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.5,-2922.74C2203.5,-2922.74 1915.5,-2922.74 1915.5,-2922.74 1909.5,-2922.74 1903.5,-2916.74 1903.5,-2910.74 1903.5,-2910.74 1903.5,-2840.74 1903.5,-2840.74 1903.5,-2834.74 1909.5,-2828.74 1915.5,-2828.74 1915.5,-2828.74 2203.5,-2828.74 2203.5,-2828.74 2209.5,-2828.74 2215.5,-2834.74 2215.5,-2840.74 2215.5,-2840.74 2215.5,-2910.74 2215.5,-2910.74 2215.5,-2916.74 2209.5,-2922.74 2203.5,-2922.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2886.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Touches"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2846.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Touches",
                    tailId: "Popping"
                }}><GroupWrapper id="cd35487f06fe9f9b17fdd45f6ec4995983b5be4e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.2,-4505.44C1041.89,-4502.09 1102.95,-4487.51 1138.5,-4443.74 1156.19,-4421.96 1131.88,-3457.68 1146.5,-3433.74 1300.75,-3181.09 1578.04,-3374.76 1736.5,-3124.74 1747.99,-3106.61 1730.38,-2947.9 1744.5,-2931.74 1781.28,-2889.62 1837.89,-2872.02 1892.96,-2866.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1893.6,-2869.6 1903.23,-2865.18 1892.94,-2862.63 1893.6,-2869.6"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Directional Flick",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Classy Flicks tutorial.",
                        url: "https://www.youtube.com/watch?v=O2H9yQJrEJQ"
                    }, {
                        text: "Dignitas 45-Degree flick guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12789/how-to-master-the-45-degree-flick"
                    }],

                    title: "Directional Flick",
                    description: "The standard type of flick that players use when directional flipping into the ball.",
                    rank: "P",
                    upstreamSkills: ["Flipping", "Hood Dribble"],
                    downstreamSkills: ["45 Degree Flick", "Delayed Flicks", "Musty Flick"]
                }}><GroupWrapper id="19641b3805579dd37624bf66b09257f750974774" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2210,-7748.74C2210,-7748.74 1909,-7748.74 1909,-7748.74 1903,-7748.74 1897,-7742.74 1897,-7736.74 1897,-7736.74 1897,-7666.74 1897,-7666.74 1897,-7660.74 1903,-7654.74 1909,-7654.74 1909,-7654.74 2210,-7654.74 2210,-7654.74 2216,-7654.74 2222,-7660.74 2222,-7666.74 2222,-7666.74 2222,-7736.74 2222,-7736.74 2222,-7742.74 2216,-7748.74 2210,-7748.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-7712.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Directional Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-7672.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "45 Degree Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="4cf604191d7a99df4aded8b0f539f3ea28adef13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2222.26,-7694.61C2266.56,-7686.49 2312.51,-7671.76 2349.5,-7645.74 2973.07,-7206.99 3016.97,-6904.12 3225.5,-6170.74 3232.2,-6147.17 3217.19,-5748.03 3233.5,-5729.74 3295.27,-5660.43 3398.31,-5645.95 3486.74,-5649.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3486.76,-5652.53 3496.9,-5649.46 3487.05,-5645.54 3486.76,-5652.53"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Delayed Flicks",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "KevPert’s tutorial on Delayed Flicks.",
                        url: "https://www.youtube.com/watch?v=hOarxtWuZ5E"
                    }],

                    title: "Delayed Flicks",
                    description: "Slowing down the pace of the game during a flick.",
                    rank: "C",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: ["Mognus Flick (180 Backflip Flick)"]
                }}><GroupWrapper id="f98ade5cba23fdc5ba98b6019d8a6c89885d1eca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2924,-5680.74C2924,-5680.74 2659,-5680.74 2659,-5680.74 2653,-5680.74 2647,-5674.74 2647,-5668.74 2647,-5668.74 2647,-5598.74 2647,-5598.74 2647,-5592.74 2653,-5586.74 2659,-5586.74 2659,-5586.74 2924,-5586.74 2924,-5586.74 2930,-5586.74 2936,-5592.74 2936,-5598.74 2936,-5598.74 2936,-5668.74 2936,-5668.74 2936,-5674.74 2930,-5680.74 2924,-5680.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5644.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Delayed Flicks"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5604.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Delayed Flicks",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="09a925621b6b66c33763adab53b0f6fb39fff733" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2222.11,-7707.6C2270.21,-7700.63 2318.34,-7683.3 2349.5,-7645.74 2362.49,-7630.07 2350.76,-6199.93 2357.5,-6180.74 2431.77,-5969.11 2625.15,-5777.44 2726.47,-5687.58"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2729.01,-5690 2734.19,-5680.76 2724.38,-5684.75 2729.01,-5690"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Musty Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Amustycow’s musty flick tutorial.",
                        url: "https://www.youtube.com/watch?v=96tNxK5vTsQ"
                    }],

                    title: "Musty Flick",
                    description: "After popping (Hitting the ball in a way where it allows the player to hit it again)  the ball during a hood dribble, angling the car to be upside down, then backflipping to delay and flick the ball. Also known as an underflip.",
                    rank: "C",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="2f919bdec851e293a32953373f2fe7249af39cab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2897.5,-5568.74C2897.5,-5568.74 2685.5,-5568.74 2685.5,-5568.74 2679.5,-5568.74 2673.5,-5562.74 2673.5,-5556.74 2673.5,-5556.74 2673.5,-5486.74 2673.5,-5486.74 2673.5,-5480.74 2679.5,-5474.74 2685.5,-5474.74 2685.5,-5474.74 2897.5,-5474.74 2897.5,-5474.74 2903.5,-5474.74 2909.5,-5480.74 2909.5,-5486.74 2909.5,-5486.74 2909.5,-5556.74 2909.5,-5556.74 2909.5,-5562.74 2903.5,-5568.74 2897.5,-5568.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5532.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Musty Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5492.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Musty Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="702449faeb3b2b4420f8ef7f458b5c724ca44ad8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2222.14,-7707.63C2270.25,-7700.66 2318.37,-7683.33 2349.5,-7645.74 2367.82,-7623.61 2338.5,-5599.27 2357.5,-5577.74 2431.57,-5493.8 2564.27,-5488.07 2663.31,-5498.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2663.08,-5501.74 2673.4,-5499.35 2663.84,-5494.78 2663.08,-5501.74"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Flipping",
                    description: "",
                    rank: "B",
                    upstreamSkills: ["Jumping"],

                    downstreamSkills: [
                        "50/50’s + Kickoffs",
                        "Backflip Shot",
                        "Diagonal Flipping",
                        "Directional Flick",
                        "Flip Canceling",
                        "Rumble - Spike Flicks",
                        "Speed Flipping",
                        "Tilted Drift",
                        "Wave Dash"
                    ]
                }}><GroupWrapper id="61b9cf036213209cd135a592fa61c15f6a53072e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976,-5588.74C976,-5588.74 785,-5588.74 785,-5588.74 779,-5588.74 773,-5582.74 773,-5576.74 773,-5576.74 773,-5506.74 773,-5506.74 773,-5500.74 779,-5494.74 785,-5494.74 785,-5494.74 976,-5494.74 976,-5494.74 982,-5494.74 988,-5500.74 988,-5506.74 988,-5506.74 988,-5576.74 988,-5576.74 988,-5582.74 982,-5588.74 976,-5588.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-5552.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-5512.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Flipping"
                }}><GroupWrapper id="e45baa78fa3c1200e296a306aacaef56a3377c2c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M883.09,-5588.75C894.37,-5907.36 966.86,-7742.13 1146.5,-7902.74 1341.99,-8077.51 1484.42,-7974.95 1736.5,-7902.74 1836.39,-7874.12 1935.38,-7804.51 1996.69,-7755.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1999.15,-7757.76 2004.71,-7748.75 1994.74,-7752.32 1999.15,-7757.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "50/50’s + Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "50/50’s + Kickoffs",
                    description: "P",
                    rank: "P",
                    upstreamSkills: ["Boosting", "Flipping"],
                    downstreamSkills: ["Fast Kickoffs"]
                }}><GroupWrapper id="a2b936491d4b9c3849b428df5f3f16a31cc9d59d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1657.5,-7860.74C1657.5,-7860.74 1325.5,-7860.74 1325.5,-7860.74 1319.5,-7860.74 1313.5,-7854.74 1313.5,-7848.74 1313.5,-7848.74 1313.5,-7778.74 1313.5,-7778.74 1313.5,-7772.74 1319.5,-7766.74 1325.5,-7766.74 1325.5,-7766.74 1657.5,-7766.74 1657.5,-7766.74 1663.5,-7766.74 1669.5,-7772.74 1669.5,-7778.74 1669.5,-7778.74 1669.5,-7848.74 1669.5,-7848.74 1669.5,-7854.74 1663.5,-7860.74 1657.5,-7860.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7824.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"50/50’s + Kickoffs"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7784.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Flipping"
                }}><GroupWrapper id="9629a67191bfe59987557df418272e39594e5e63" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M890.61,-5588.9C929.57,-5792.93 1082.59,-6620.25 1138.5,-7307.74 1139.51,-7320.2 1138.32,-7748.28 1146.5,-7757.74 1185.25,-7802.49 1244.63,-7821.22 1303.21,-7827.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1303.08,-7830.78 1313.36,-7828.2 1303.72,-7823.8 1303.08,-7830.78"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backflip Shot",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                    }],

                    title: "Backflip Shot",
                    description: "Hitting the ball normally and backflipping after the shot to keep the players position and be able to hit the ball again.",
                    rank: "P",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="258b0df51d6275c2d60a16f25ed64d34b5790e44" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1612.5,-7412.74C1612.5,-7412.74 1370.5,-7412.74 1370.5,-7412.74 1364.5,-7412.74 1358.5,-7406.74 1358.5,-7400.74 1358.5,-7400.74 1358.5,-7330.74 1358.5,-7330.74 1358.5,-7324.74 1364.5,-7318.74 1370.5,-7318.74 1370.5,-7318.74 1612.5,-7318.74 1612.5,-7318.74 1618.5,-7318.74 1624.5,-7324.74 1624.5,-7330.74 1624.5,-7330.74 1624.5,-7400.74 1624.5,-7400.74 1624.5,-7406.74 1618.5,-7412.74 1612.5,-7412.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7376.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backflip Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7336.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backflip Shot",
                    tailId: "Flipping"
                }}><GroupWrapper id="feacadcab328ca220484c937119099189c6f0856" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M911.95,-5588.97C969.76,-5681.75 1093.64,-5896.23 1138.5,-6096.74 1142.18,-6113.18 1135.54,-7296.94 1146.5,-7309.74 1195.08,-7366.48 1276.79,-7381.52 1348.39,-7381.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1348.44,-7385.38 1358.42,-7381.84 1348.41,-7378.38 1348.44,-7385.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Diagonal Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Diagonal Flipping",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1e85eff77e89770205d9c74e3c78f5034b966ad0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1653.5,-2060.74C1653.5,-2060.74 1329.5,-2060.74 1329.5,-2060.74 1323.5,-2060.74 1317.5,-2054.74 1317.5,-2048.74 1317.5,-2048.74 1317.5,-1978.74 1317.5,-1978.74 1317.5,-1972.74 1323.5,-1966.74 1329.5,-1966.74 1329.5,-1966.74 1653.5,-1966.74 1653.5,-1966.74 1659.5,-1966.74 1665.5,-1972.74 1665.5,-1978.74 1665.5,-1978.74 1665.5,-2048.74 1665.5,-2048.74 1665.5,-2054.74 1659.5,-2060.74 1653.5,-2060.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-2024.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Diagonal Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1984.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Diagonal Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="261c87736cbe53fafb62bf8314c992a171d8018a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.26,-5547.49C1041.96,-5544.14 1103.02,-5529.57 1138.5,-5485.74 1145.95,-5476.53 1145.34,-3792.52 1146.5,-3780.74 1213.84,-3099.2 1417.95,-2289.73 1475.34,-2070.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1478.73,-2071.6 1477.88,-2061.04 1471.96,-2069.82 1478.73,-2071.6"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip Canceling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s half-flip guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12628/half-flips-where-when-and-how"
                    }],

                    title: "Flip Canceling",
                    description: "During a flip, the player rotates the car in the opposite direction the flip is going to stop the car from turning. Used to gain speed.",
                    rank: "G",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Half Flipping"]
                }}><GroupWrapper id="e316805d3be682b3c87b00d407221b6e711bcbf2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1623,-1948.74C1623,-1948.74 1360,-1948.74 1360,-1948.74 1354,-1948.74 1348,-1942.74 1348,-1936.74 1348,-1936.74 1348,-1866.74 1348,-1866.74 1348,-1860.74 1354,-1854.74 1360,-1854.74 1360,-1854.74 1623,-1854.74 1623,-1854.74 1629,-1854.74 1635,-1860.74 1635,-1866.74 1635,-1866.74 1635,-1936.74 1635,-1936.74 1635,-1942.74 1629,-1948.74 1623,-1948.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1912.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Canceling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1872.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip Canceling",
                    tailId: "Flipping"
                }}><GroupWrapper id="abdfa8ec98928ad093f18c04973c737ffcdba0b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.3,-5547.52C1042.01,-5544.19 1103.07,-5529.61 1138.5,-5485.74 1153.89,-5466.67 1130.61,-1976.38 1146.5,-1957.74 1192.61,-1903.64 1268.84,-1887.4 1337.83,-1885.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1338.01,-1889.16 1347.96,-1885.51 1337.9,-1882.16 1338.01,-1889.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wave Dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Wave Dash",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Hel-jump", "Zap Dash"]
                }}><GroupWrapper id="b0de0622ceba25cab2e09310a3ff7d162d92d7d5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1591,-1724.74C1591,-1724.74 1392,-1724.74 1392,-1724.74 1386,-1724.74 1380,-1718.74 1380,-1712.74 1380,-1712.74 1380,-1642.74 1380,-1642.74 1380,-1636.74 1386,-1630.74 1392,-1630.74 1392,-1630.74 1591,-1630.74 1591,-1630.74 1597,-1630.74 1603,-1636.74 1603,-1642.74 1603,-1642.74 1603,-1712.74 1603,-1712.74 1603,-1718.74 1597,-1724.74 1591,-1724.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1688.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wave Dash"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1648.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wave Dash",
                    tailId: "Flipping"
                }}><GroupWrapper id="ea1de08d5e958d1b560b23ea180cf31e829563e6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.3,-5547.52C1042.02,-5544.19 1103.07,-5529.62 1138.5,-5485.74 1154.87,-5465.46 1129.6,-1753.57 1146.5,-1733.74 1199.84,-1671.15 1293.49,-1659.23 1369.62,-1661.82"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1369.62,-1665.32 1379.76,-1662.26 1369.92,-1658.33 1369.62,-1665.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rumble - Spike Flicks",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Johnniboi_i stream with kronovi.",
                        url: "https://clips.twitch.tv/CleanAbnegateWrenchKappaWealth"
                    }],

                    title: "Rumble - Spike Flicks",
                    description: "While spikes have the ball stuck to your car, flip right before they let go to flick the ball.",
                    rank: "P",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="147dbe8bf54f7f867d98ea39b01f66d718271304" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1689,-7300.74C1689,-7300.74 1294,-7300.74 1294,-7300.74 1288,-7300.74 1282,-7294.74 1282,-7288.74 1282,-7288.74 1282,-7218.74 1282,-7218.74 1282,-7212.74 1288,-7206.74 1294,-7206.74 1294,-7206.74 1689,-7206.74 1689,-7206.74 1695,-7206.74 1701,-7212.74 1701,-7218.74 1701,-7218.74 1701,-7288.74 1701,-7288.74 1701,-7294.74 1695,-7300.74 1689,-7300.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7264.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rumble - Spike Flicks"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7224.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - Spike Flicks",
                    tailId: "Flipping"
                }}><GroupWrapper id="16d66adb5bb5e45604b95ecc253ebd736034bcbb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M911.94,-5588.97C969.73,-5681.75 1093.57,-5896.24 1138.5,-6096.74 1141.84,-6111.66 1136.55,-7186.12 1146.5,-7197.74 1178.17,-7234.71 1223.91,-7253.97 1271.76,-7263.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1271.22,-7266.46 1281.67,-7264.73 1272.42,-7259.57 1271.22,-7266.46"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Speed Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Speed Flipping",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Directional Air Roll", "Flipping"],
                    downstreamSkills: ["Zap Dash"]
                }}><GroupWrapper id="82dc79751604a0977ae0945f03c39c8c1781ffc9" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2197,-3034.74C2197,-3034.74 1922,-3034.74 1922,-3034.74 1916,-3034.74 1910,-3028.74 1910,-3022.74 1910,-3022.74 1910,-2952.74 1910,-2952.74 1910,-2946.74 1916,-2940.74 1922,-2940.74 1922,-2940.74 2197,-2940.74 2197,-2940.74 2203,-2940.74 2209,-2946.74 2209,-2952.74 2209,-2952.74 2209,-3022.74 2209,-3022.74 2209,-3028.74 2203,-3034.74 2197,-3034.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2998.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Speed Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2958.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Speed Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="b3b15ccfc7f072fd97b31f1386b3096de20b88a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.11,-5545.54C1040.75,-5541.47 1100.88,-5526.83 1138.5,-5485.74 1157.56,-5464.92 1128.84,-5444.75 1146.5,-5422.74 1320.85,-5205.39 1575.79,-5438.36 1736.5,-5210.74 1753.86,-5186.15 1725.13,-3066.77 1744.5,-3043.74 1782.06,-2999.05 1841.94,-2981.67 1899.38,-2976.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1899.98,-2980.15 1909.69,-2975.92 1899.46,-2973.17 1899.98,-2980.15"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tilted Drift",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: true,

                    notes: [{
                        text: "Tilted Drift tutorial by HelvetiaGaming",
                        url: "https://www.youtube.com/watch?v=y2isfCJfPps"
                    }],

                    title: "Tilted Drift",
                    description: "A skill where a player will forward diagonal flip then land on the left or right two wheels whilst proceeding to continuously boost and turn.",
                    rank: "GC",
                    upstreamSkills: ["Boosting", "Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="ce7e31b531e33bd7e1161f92d917606f73f53240" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3753.5,-5496.74C3753.5,-5496.74 3553.5,-5496.74 3553.5,-5496.74 3547.5,-5496.74 3541.5,-5490.74 3541.5,-5484.74 3541.5,-5484.74 3541.5,-5414.74 3541.5,-5414.74 3541.5,-5408.74 3547.5,-5402.74 3553.5,-5402.74 3553.5,-5402.74 3753.5,-5402.74 3753.5,-5402.74 3759.5,-5402.74 3765.5,-5408.74 3765.5,-5414.74 3765.5,-5414.74 3765.5,-5484.74 3765.5,-5484.74 3765.5,-5490.74 3759.5,-5496.74 3753.5,-5496.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5460.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tilted Drift"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5420.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tilted Drift",
                    tailId: "Flipping"
                }}><GroupWrapper id="4c5ab425ea999e64ad292194f7947958bbb980c8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.25,-5547.48C1041.95,-5544.14 1103.01,-5529.56 1138.5,-5485.74 1152.35,-5468.63 1130.89,-3916.26 1146.5,-3900.74 1239.44,-3808.26 1643.43,-3808.39 1736.5,-3900.74 1756.52,-3920.59 1730.86,-4891.06 1744.5,-4915.74 1898.87,-5195.12 2194.58,-5023.66 2349.5,-5302.74 2358.64,-5319.2 2344.1,-5967.5 2357.5,-5980.74 2494.7,-6116.32 3087.96,-6115.97 3225.5,-5980.74 3244.32,-5962.23 3215.95,-5525.45 3233.5,-5505.74 3305.96,-5424.34 3435.34,-5418.53 3531.22,-5428"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3530.96,-5431.5 3541.27,-5429.06 3531.7,-5424.53 3530.96,-5431.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s guide to kickoffs",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12642/take-your-rocket-league-gameplay-to-the-next-level-kickoffs"
                    }],

                    title: "Fast Kickoffs",
                    description: "During the kickoff, the player diagonal flips to gain speed.",
                    rank: "G",
                    upstreamSkills: ["50/50’s + Kickoffs"],
                    downstreamSkills: ["Wavedash Kickoff"]
                }}><GroupWrapper id="70ae9f10a1ebfc1c3e2894c6b3cf99364f1eab4e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1608,-716.74C1608,-716.74 1375,-716.74 1375,-716.74 1369,-716.74 1363,-710.74 1363,-704.74 1363,-704.74 1363,-634.74 1363,-634.74 1363,-628.74 1369,-622.74 1375,-622.74 1375,-622.74 1608,-622.74 1608,-622.74 1614,-622.74 1620,-628.74 1620,-634.74 1620,-634.74 1620,-704.74 1620,-704.74 1620,-710.74 1614,-716.74 1608,-716.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-680.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Fast Kickoffs"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-640.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Kickoffs",
                    tailId: "50/50’s + Kickoffs"
                }}><GroupWrapper id="f52925957ddb7918578ad02bb3562cee452d58b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1313.17,-7839.45C1235.17,-7839.81 1157.82,-7820.93 1142.5,-7748.74 1137.44,-7724.91 1137.44,-758.56 1142.5,-734.74 1160.44,-650.18 1263.47,-638.76 1352.97,-645.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1352.71,-649.21 1362.97,-646.58 1353.3,-642.24 1352.71,-649.21"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boosting",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Boosting",
                    description: "",
                    rank: "B",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "50/50’s + Kickoffs",
                        "Basic Aerials",
                        "Basic Demos",
                        "Chipping",
                        "Hel-jump",
                        "Powershot + Powerclears",
                        "Redirects",
                        "Tilted Drift",
                        "Wall Pinch"
                    ]
                }}><GroupWrapper id="537c9a929ccd9e9add13b15ba512c096d2fd52c4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M562,-5632.74C562,-5632.74 371,-5632.74 371,-5632.74 365,-5632.74 359,-5626.74 359,-5620.74 359,-5620.74 359,-5550.74 359,-5550.74 359,-5544.74 365,-5538.74 371,-5538.74 371,-5538.74 562,-5538.74 562,-5538.74 568,-5538.74 574,-5544.74 574,-5550.74 574,-5550.74 574,-5620.74 574,-5620.74 574,-5626.74 568,-5632.74 562,-5632.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5596.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Boosting"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5556.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Boosting"
                }}><GroupWrapper id="5d8996827b436d743ab2e51c0f78da5c2dfeaa6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.81,-5633.1C570.07,-5635.83 572.15,-5638.7 574,-5641.74 585.18,-5660.03 577.66,-6392.73 582,-6413.74 713.25,-7048.18 637.58,-7356.8 1146.5,-7757.74 1190.67,-7792.53 1248.09,-7809.44 1303.33,-7816.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1302.9,-7820.35 1313.25,-7818.11 1303.76,-7813.4 1302.9,-7820.35"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Basic Aerials",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Boosting", "Jumping"],

                    downstreamSkills: [
                        "Aerial Powershot",
                        "Air Bumps / Demos",
                        "Backwards Aerials",
                        "Ceiling Shots",
                        "Doomsee Dish",
                        "Double Jump Aerials",
                        "Fast Aerials",
                        "Leveling Out",
                        "Pinching",
                        "Rebound Shots",
                        "Sideways Aerials"
                    ]
                }}><GroupWrapper id="bf3298190f7f1417784e1d17643996afc93a3890" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M998.5,-4434.74C998.5,-4434.74 762.5,-4434.74 762.5,-4434.74 756.5,-4434.74 750.5,-4428.74 750.5,-4422.74 750.5,-4422.74 750.5,-4352.74 750.5,-4352.74 750.5,-4346.74 756.5,-4340.74 762.5,-4340.74 762.5,-4340.74 998.5,-4340.74 998.5,-4340.74 1004.5,-4340.74 1010.5,-4346.74 1010.5,-4352.74 1010.5,-4352.74 1010.5,-4422.74 1010.5,-4422.74 1010.5,-4428.74 1004.5,-4434.74 998.5,-4434.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4398.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Basic Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4358.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic Aerials",
                    tailId: "Boosting"
                }}><GroupWrapper id="eeb9b3883eda0b9f600725e9f7bcfba970e4f247" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.82,-5538.37C570.08,-5535.65 572.15,-5532.77 574,-5529.74 589.69,-5503.97 562.66,-4466.89 582,-4443.74 620.07,-4398.18 682.47,-4381.92 740.31,-4377.98"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="740.52,-4381.47 750.3,-4377.41 740.12,-4374.48 740.52,-4381.47"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot + Powerclears",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powershot + Powerclears",
                    description: "G",
                    rank: "P",
                    upstreamSkills: ["Boosting", "Clears", "Driving", "Turning"],

                    downstreamSkills: [
                        "Aerial Powershot",
                        "Air Roll Shots",
                        "Bounce Powershots",
                        "Guillotine Passing",
                        "Possession Prediction",
                        "Wall Clears"
                    ]
                }}><GroupWrapper id="3c3b4b9344db3ee02350c34a2e0a00b2d87168d2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1724.5,-7636.74C1724.5,-7636.74 1258.5,-7636.74 1258.5,-7636.74 1252.5,-7636.74 1246.5,-7630.74 1246.5,-7624.74 1246.5,-7624.74 1246.5,-7554.74 1246.5,-7554.74 1246.5,-7548.74 1252.5,-7542.74 1258.5,-7542.74 1258.5,-7542.74 1724.5,-7542.74 1724.5,-7542.74 1730.5,-7542.74 1736.5,-7548.74 1736.5,-7554.74 1736.5,-7554.74 1736.5,-7624.74 1736.5,-7624.74 1736.5,-7630.74 1730.5,-7636.74 1724.5,-7636.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7600.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powershot + Powerclears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7560.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Boosting"
                }}><GroupWrapper id="51301e2282283ee5735d568c01e581d46214133c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.8,-5633.11C570.06,-5635.84 572.14,-5638.71 574,-5641.74 591.11,-5669.63 565.76,-6202.32 582,-6230.74 725.61,-6481.97 995.56,-6317.12 1138.5,-6568.74 1151.74,-6592.04 1129.05,-7513.39 1146.5,-7533.74 1170.26,-7561.45 1201.93,-7579.21 1236.46,-7590.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1235.68,-7593.59 1246.26,-7593.08 1237.68,-7586.88 1235.68,-7593.59"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Rocket Sledge’s Basic Demo’s tutorial.",
                        url: "https://www.youtube.com/watch?v=AkBbjnay4oY"
                    }, {
                        text: "Rocket Sledge’s Demo tutorial series.",
                        url: "https://www.youtube.com/playlist?list=PLBVtR-e9dDtxGSbZ-AtzsV1h5EN3SsfYj"
                    }, {
                        text: "Rocket Sledge’s Defensive Demos tutorial.",
                        url: "https://www.youtube.com/watch?v=YGUSrDHKi-Q"
                    }],

                    title: "Basic Demos",
                    description: "Basic demo’s (demolishing and / or bumping) are usually done at lower levels without a real purpose in mind.",
                    rank: "S",
                    upstreamSkills: ["Boosting", "Turning"],
                    downstreamSkills: ["Air Bumps / Demos", "Goalie Demos"]
                }}><GroupWrapper id="7336660793449ed1297223c8aefa547b3bea0a96" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M997,-4658.74C997,-4658.74 764,-4658.74 764,-4658.74 758,-4658.74 752,-4652.74 752,-4646.74 752,-4646.74 752,-4576.74 752,-4576.74 752,-4570.74 758,-4564.74 764,-4564.74 764,-4564.74 997,-4564.74 997,-4564.74 1003,-4564.74 1009,-4570.74 1009,-4576.74 1009,-4576.74 1009,-4646.74 1009,-4646.74 1009,-4652.74 1003,-4658.74 997,-4658.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4622.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Basic Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4582.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Boosting"
                }}><GroupWrapper id="52167b9a65db45a3347dca992a7cc93919727046" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.82,-5538.37C570.08,-5535.64 572.15,-5532.77 574,-5529.74 586.47,-5509.3 566.63,-4686.1 582,-4667.74 620.43,-4621.83 683.56,-4605.69 741.81,-4601.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="742.06,-4605.41 751.86,-4601.38 741.69,-4598.42 742.06,-4605.41"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chipping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chipping",
                    description: "Driving into a grounded ball without jumping",
                    rank: "S",
                    upstreamSkills: ["Boosting"],
                    downstreamSkills: ["Chip Clear", "Chip Double Touch", "Chip Shot"]
                }}><GroupWrapper id="cfdbe4fec64d936c3bd931b8c1c724480b83578e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976,-5106.74C976,-5106.74 785,-5106.74 785,-5106.74 779,-5106.74 773,-5100.74 773,-5094.74 773,-5094.74 773,-5024.74 773,-5024.74 773,-5018.74 779,-5012.74 785,-5012.74 785,-5012.74 976,-5012.74 976,-5012.74 982,-5012.74 988,-5018.74 988,-5024.74 988,-5024.74 988,-5094.74 988,-5094.74 988,-5100.74 982,-5106.74 976,-5106.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-5070.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-5030.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chipping",
                    tailId: "Boosting"
                }}><GroupWrapper id="811114c1373fd9be16061b5bb25088c16f9c7fb1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.75,-5538.33C570.03,-5535.61 572.13,-5532.75 574,-5529.74 592.71,-5499.62 563.07,-5240.72 582,-5210.74 622.15,-5147.13 698.12,-5109.2 763.24,-5087.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="764.35,-5090.58 772.76,-5084.14 762.17,-5083.93 764.35,-5090.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hel-jump",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Hel-Jump Tutorial by  HelvetiaGaming",
                        url: "https://www.youtube.com/watch?v=p1KxjeQT5As"
                    }],

                    title: "Hel-jump",
                    description: "A form of wave dashing, the hel-jump has the player jump instead of flip when they hit the ground with the use of powerslide and boost to start an aerial that keeps their flip to be used whenever they wanted. Also known as a Wave jump.",
                    rank: "SSL",
                    upstreamSkills: ["Boosting", "Wave Dash"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95c68cc3736c6dfaa388c5aadcd341c5b0a21f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4471,-6089.74C4471,-6089.74 4293,-6089.74 4293,-6089.74 4287,-6089.74 4281,-6083.74 4281,-6077.74 4281,-6077.74 4281,-6007.74 4281,-6007.74 4281,-6001.74 4287,-5995.74 4293,-5995.74 4293,-5995.74 4471,-5995.74 4471,-5995.74 4477,-5995.74 4483,-6001.74 4483,-6007.74 4483,-6007.74 4483,-6077.74 4483,-6077.74 4483,-6083.74 4477,-6089.74 4471,-6089.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-6053.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hel-jump"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-6013.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Boosting"
                }}><GroupWrapper id="e6abb339e33d2c148fdb01ea27b6ee3307a4035c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.83,-5538.38C570.09,-5535.65 572.16,-5532.77 574,-5529.74 585.74,-5510.4 565.96,-3916.69 582,-3900.74 945.71,-3538.8 1371.86,-3539.73 1736.5,-3900.74 1752.25,-3916.33 1735.13,-4678.64 1744.5,-4698.74 1894.11,-5019.55 2199.67,-4896.03 2349.5,-5216.74 2357.75,-5234.4 2344.72,-5904.01 2357.5,-5918.74 2607.56,-6206.95 3885.64,-6095.89 4270.93,-6055.16"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4271.39,-6058.63 4280.96,-6054.09 4270.65,-6051.67 4271.39,-6058.63"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Wall Pinch",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Boosting", "Joystick Air Roll", "Jumping"],
                    downstreamSkills: ["Kuxir Pinch"]
                }}><GroupWrapper id="3122bd50e6d8511d07e4f71ea0d07038f0df8fed" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.5,-7524.74C1586.5,-7524.74 1396.5,-7524.74 1396.5,-7524.74 1390.5,-7524.74 1384.5,-7518.74 1384.5,-7512.74 1384.5,-7512.74 1384.5,-7442.74 1384.5,-7442.74 1384.5,-7436.74 1390.5,-7430.74 1396.5,-7430.74 1396.5,-7430.74 1586.5,-7430.74 1586.5,-7430.74 1592.5,-7430.74 1598.5,-7436.74 1598.5,-7442.74 1598.5,-7442.74 1598.5,-7512.74 1598.5,-7512.74 1598.5,-7518.74 1592.5,-7524.74 1586.5,-7524.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7488.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7448.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Pinch",
                    tailId: "Boosting"
                }}><GroupWrapper id="607c127e366dc918789ee7d97b6dbe173479b599" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.79,-5633.12C570.06,-5635.84 572.14,-5638.71 574,-5641.74 588.06,-5664.59 564.99,-6103.98 582,-6124.74 742.46,-6320.49 979,-6049.2 1138.5,-6245.74 1159.09,-6271.1 1125.25,-7396.92 1146.5,-7421.74 1201.02,-7485.41 1297.27,-7496.57 1374.11,-7493.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1374.53,-7496.89 1384.34,-7492.89 1374.18,-7489.89 1374.53,-7496.89"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Redirects",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Redirects",
                    description: "Hitting the ball in a way to cause the direction of the ball to change for a pass, clear, or goal.",
                    rank: "D",
                    upstreamSkills: ["Boosting", "Turning"],
                    downstreamSkills: ["Rebound Shots"]
                }}><GroupWrapper id="fd69be653321b291759b25bacb9d457fe645abae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2153.5,-2586.74C2153.5,-2586.74 1965.5,-2586.74 1965.5,-2586.74 1959.5,-2586.74 1953.5,-2580.74 1953.5,-2574.74 1953.5,-2574.74 1953.5,-2504.74 1953.5,-2504.74 1953.5,-2498.74 1959.5,-2492.74 1965.5,-2492.74 1965.5,-2492.74 2153.5,-2492.74 2153.5,-2492.74 2159.5,-2492.74 2165.5,-2498.74 2165.5,-2504.74 2165.5,-2504.74 2165.5,-2574.74 2165.5,-2574.74 2165.5,-2580.74 2159.5,-2586.74 2153.5,-2586.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2550.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Redirects"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2510.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Boosting"
                }}><GroupWrapper id="2b101ad152e13d18e42311c10f858ec8a217e3d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.84,-5538.38C570.09,-5535.65 572.16,-5532.77 574,-5529.74 589.34,-5504.45 567.11,-3426.28 582,-3400.74 725.44,-3154.62 893.41,-3227.92 1138.5,-3082.74 1406.8,-2923.8 1575.25,-2982.64 1736.5,-2715.74 1750.32,-2692.86 1726.67,-2615.64 1744.5,-2595.74 1793.26,-2541.3 1875.2,-2528.11 1943.14,-2528.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.46,-2531.6 1953.49,-2528.2 1943.53,-2524.6 1943.46,-2531.6"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tilted Drift",
                    tailId: "Boosting"
                }}><GroupWrapper id="7b29687ce703539726ae960c3790644fd28c6dfb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.84,-5538.38C570.09,-5535.65 572.16,-5532.77 574,-5529.74 587.97,-5506.71 564.9,-3611.54 582,-3590.74 744.49,-3392.98 891.82,-3502.19 1146.5,-3476.74 1407.42,-3450.65 1550.33,-3292.07 1736.5,-3476.74 1755.87,-3495.95 1732.19,-4434.39 1744.5,-4458.74 1896.07,-4758.51 2197.88,-4611.99 2349.5,-4911.74 2361.25,-4934.96 2339.02,-5830.41 2357.5,-5848.74 2494.47,-5984.54 3087.53,-5983.53 3225.5,-5848.74 3239.13,-5835.42 3220.78,-5519.93 3233.5,-5505.74 3306.23,-5424.57 3435.56,-5418.72 3531.36,-5428.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3531.09,-5431.62 3541.4,-5429.18 3531.82,-5424.66 3531.09,-5431.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Awareness",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Game Awareness",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Game Speed", "Prediction", "Rotation", "Teammate Awareness"],

                    downstreamSkills: [
                        "Advanced Boost Management",
                        "Back-passing",
                        "Backboard Passing",
                        "Boost Stealing",
                        "Calculated Clears",
                        "Ceiling Shots",
                        "Cherry Picking",
                        "Clear Prevention",
                        "Close Touch",
                        "Corner Pass",
                        "Doomsee Dish",
                        "Guillotine Passing",
                        "Infield Passing",
                        "Kickoff Prediction",
                        "Opponent Boost Management",
                        "Opponent Prediction",
                        "Pinching",
                        "Playstyle Reading",
                        "Possession Prediction",
                        "Powershot Passing",
                        "Shadowing",
                        "Spring Roll"
                    ]
                }}><GroupWrapper id="0bda27abf75b1ff6c7b200711164e200d08d66c9" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2216,-3258.74C2216,-3258.74 1903,-3258.74 1903,-3258.74 1897,-3258.74 1891,-3252.74 1891,-3246.74 1891,-3246.74 1891,-3176.74 1891,-3176.74 1891,-3170.74 1897,-3164.74 1903,-3164.74 1903,-3164.74 2216,-3164.74 2216,-3164.74 2222,-3164.74 2228,-3170.74 2228,-3176.74 2228,-3176.74 2228,-3246.74 2228,-3246.74 2228,-3252.74 2222,-3258.74 2216,-3258.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3222.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Game Awareness"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3182.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Advanced Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Advanced Boost Management",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c00c916c12a3d30e74a119e77adba795315da1bd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3063.5,-3034.74C3063.5,-3034.74 2519.5,-3034.74 2519.5,-3034.74 2513.5,-3034.74 2507.5,-3028.74 2507.5,-3022.74 2507.5,-3022.74 2507.5,-2952.74 2507.5,-2952.74 2507.5,-2946.74 2513.5,-2940.74 2519.5,-2940.74 2519.5,-2940.74 3063.5,-2940.74 3063.5,-2940.74 3069.5,-2940.74 3075.5,-2946.74 3075.5,-2952.74 3075.5,-2952.74 3075.5,-3022.74 3075.5,-3022.74 3075.5,-3028.74 3069.5,-3034.74 3063.5,-3034.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2998.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Advanced Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2958.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Advanced Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="898b4867af4ebac3edc9bf2478b3441b7e8c2219" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.21,-3215.18C2273.71,-3207.48 2318.82,-3190.34 2349.5,-3155.74 2366.05,-3137.06 2340.37,-3061.88 2357.5,-3043.74 2394.61,-3004.43 2444.65,-2982.68 2497.52,-2971.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2498.28,-2975.17 2507.43,-2969.84 2496.95,-2968.3 2498.28,-2975.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Back-passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Back-passing",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6dbb66d80f6a9020c7a2bd3cd6e334226b358b0d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1611.5,-6180.74C1611.5,-6180.74 1371.5,-6180.74 1371.5,-6180.74 1365.5,-6180.74 1359.5,-6174.74 1359.5,-6168.74 1359.5,-6168.74 1359.5,-6098.74 1359.5,-6098.74 1359.5,-6092.74 1365.5,-6086.74 1371.5,-6086.74 1371.5,-6086.74 1611.5,-6086.74 1611.5,-6086.74 1617.5,-6086.74 1623.5,-6092.74 1623.5,-6098.74 1623.5,-6098.74 1623.5,-6168.74 1623.5,-6168.74 1623.5,-6174.74 1617.5,-6180.74 1611.5,-6180.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6144.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Back-passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6104.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Back-passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="d13f3701214bb777840e3fb34cd86a1f8bd83764" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.89,-3201.49C1836.09,-3207.42 1780.2,-3225.23 1744.5,-3267.74 1731.95,-3282.68 1748.68,-6062.49 1736.5,-6077.74 1711.49,-6109.04 1672.86,-6125.06 1633.65,-6132.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1632.9,-6129.32 1623.67,-6134.52 1634.13,-6136.21 1632.9,-6129.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backboard Passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Backboard Passing",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="33247406f4a055ecdd1ae7eb766c2d0d0f4fc0aa" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1665,-6068.74C1665,-6068.74 1318,-6068.74 1318,-6068.74 1312,-6068.74 1306,-6062.74 1306,-6056.74 1306,-6056.74 1306,-5986.74 1306,-5986.74 1306,-5980.74 1312,-5974.74 1318,-5974.74 1318,-5974.74 1665,-5974.74 1665,-5974.74 1671,-5974.74 1677,-5980.74 1677,-5986.74 1677,-5986.74 1677,-6056.74 1677,-6056.74 1677,-6062.74 1671,-6068.74 1665,-6068.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6032.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backboard Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5992.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backboard Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="1f23a919bf2d5f48bb5e4839fe8064e6d83502de" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.89,-3201.5C1836.1,-3207.43 1780.2,-3225.23 1744.5,-3267.74 1732.45,-3282.08 1748.19,-5951.1 1736.5,-5965.74 1723.09,-5982.52 1705.77,-5994.91 1686.54,-6003.97"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1685.02,-6000.82 1677.27,-6008.04 1687.83,-6007.23 1685.02,-6000.82"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boost Stealing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Boost Stealing",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4dc40bb7caf9fed2ed66bb13f46fbb1df2387ff2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1623,-5956.74C1623,-5956.74 1360,-5956.74 1360,-5956.74 1354,-5956.74 1348,-5950.74 1348,-5944.74 1348,-5944.74 1348,-5874.74 1348,-5874.74 1348,-5868.74 1354,-5862.74 1360,-5862.74 1360,-5862.74 1623,-5862.74 1623,-5862.74 1629,-5862.74 1635,-5868.74 1635,-5874.74 1635,-5874.74 1635,-5944.74 1635,-5944.74 1635,-5950.74 1629,-5956.74 1623,-5956.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5920.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Boost Stealing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5880.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boost Stealing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cb3916ed6895d30b621b55760369746d38aca7bf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.89,-3201.5C1836.1,-3207.43 1780.21,-3225.23 1744.5,-3267.74 1721.4,-3295.24 1758.92,-5825.68 1736.5,-5853.74 1713.93,-5881.98 1680.27,-5897.78 1645.11,-5906.24"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1644.17,-5902.87 1635.16,-5908.44 1645.68,-5909.7 1644.17,-5902.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Calculated Clears",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Calculated Clears",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="23534bdae00e2ef374f9b651c5ed0c5095a06dc4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2953,-3146.74C2953,-3146.74 2630,-3146.74 2630,-3146.74 2624,-3146.74 2618,-3140.74 2618,-3134.74 2618,-3134.74 2618,-3064.74 2618,-3064.74 2618,-3058.74 2624,-3052.74 2630,-3052.74 2630,-3052.74 2953,-3052.74 2953,-3052.74 2959,-3052.74 2965,-3058.74 2965,-3064.74 2965,-3064.74 2965,-3134.74 2965,-3134.74 2965,-3140.74 2959,-3146.74 2953,-3146.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3110.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Calculated Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3070.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Calculated Clears",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="81a6b816764e11391c2575b156285d985502b7a3" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.27,-3178.35C2270.38,-3170.46 2315.52,-3162.4 2357.5,-3155.74 2439.35,-3142.74 2530.28,-3130.63 2607.59,-3121.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2608.42,-3124.44 2617.92,-3119.74 2607.56,-3117.49 2608.42,-3124.44"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Ceiling Shots",
                    description: "Having the ball near or bounce off or around the ceiling for a shot on goal.",
                    rank: "GC",
                    upstreamSkills: ["Basic Aerials", "Game Awareness", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="5fb00f6fecfb6a5691d87a1013c31a8b75ec6a9e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3774.5,-5384.74C3774.5,-5384.74 3532.5,-5384.74 3532.5,-5384.74 3526.5,-5384.74 3520.5,-5378.74 3520.5,-5372.74 3520.5,-5372.74 3520.5,-5302.74 3520.5,-5302.74 3520.5,-5296.74 3526.5,-5290.74 3532.5,-5290.74 3532.5,-5290.74 3774.5,-5290.74 3774.5,-5290.74 3780.5,-5290.74 3786.5,-5296.74 3786.5,-5302.74 3786.5,-5302.74 3786.5,-5372.74 3786.5,-5372.74 3786.5,-5378.74 3780.5,-5384.74 3774.5,-5384.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5348.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ceiling Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5308.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling Shots",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="f53ab604d5a283098ce56ea49ebbb6007105b944" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.08,-3206.86C2274.14,-3214.38 2319.59,-3231.79 2349.5,-3267.74 2366.09,-3287.68 2343.26,-4180.05 2357.5,-4201.74 2589.11,-4554.52 2993.37,-4234.29 3225.5,-4586.74 3236.12,-4602.86 3220.7,-5267.28 3233.5,-5281.74 3300.63,-5357.55 3417.1,-5367.91 3510.24,-5361.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3510.62,-5364.82 3520.32,-5360.56 3510.08,-5357.85 3510.62,-5364.82"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cherry Picking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Ytzi13 Lead offence 3v3 guide",
                        url: "https://www.reddit.com/r/RocketLeague/comments/ab9490/playing_the_first_man_role_a_guide_for_all_skill/?st=JQFHERHK&sh=9ac03a3b"
                    }],

                    title: "Cherry Picking",
                    description: "Usually during infield passes, the player angles a powershot during an aerial for a shot on goal.",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="e1c06a2914c0afd860df71f0b4c3297fe65d4205" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2927.5,-3258.74C2927.5,-3258.74 2655.5,-3258.74 2655.5,-3258.74 2649.5,-3258.74 2643.5,-3252.74 2643.5,-3246.74 2643.5,-3246.74 2643.5,-3176.74 2643.5,-3176.74 2643.5,-3170.74 2649.5,-3164.74 2655.5,-3164.74 2655.5,-3164.74 2927.5,-3164.74 2927.5,-3164.74 2933.5,-3164.74 2939.5,-3170.74 2939.5,-3176.74 2939.5,-3176.74 2939.5,-3246.74 2939.5,-3246.74 2939.5,-3252.74 2933.5,-3258.74 2927.5,-3258.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3222.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Cherry Picking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3182.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cherry Picking",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="fe9217ad1e64731395a25492bccb54bc75794440" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.43,-3211.74C2350.24,-3211.74 2513.86,-3211.74 2633.14,-3211.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2633.46,-3215.24 2643.46,-3211.74 2633.46,-3208.24 2633.46,-3215.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Clear Prevention",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Clear Prevention",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="5ea77ad958d862ae971aa72ce8101208cc8fd5b6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2944.5,-3370.74C2944.5,-3370.74 2638.5,-3370.74 2638.5,-3370.74 2632.5,-3370.74 2626.5,-3364.74 2626.5,-3358.74 2626.5,-3358.74 2626.5,-3288.74 2626.5,-3288.74 2626.5,-3282.74 2632.5,-3276.74 2638.5,-3276.74 2638.5,-3276.74 2944.5,-3276.74 2944.5,-3276.74 2950.5,-3276.74 2956.5,-3282.74 2956.5,-3288.74 2956.5,-3288.74 2956.5,-3358.74 2956.5,-3358.74 2956.5,-3364.74 2950.5,-3370.74 2944.5,-3370.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3334.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Clear Prevention"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3294.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Clear Prevention",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b4b3e97ec498cd1c679051ecdd4af42abf11f05b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.27,-3245.12C2270.38,-3253.02 2315.52,-3261.07 2357.5,-3267.74 2442.48,-3281.23 2537.24,-3293.77 2616.39,-3303.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2616.11,-3307.04 2626.46,-3304.78 2616.96,-3300.09 2616.11,-3307.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Close Touch",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Close Touch",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="104d640197253124756d28b19cd52d3c58388d77" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2901.5,-3482.74C2901.5,-3482.74 2681.5,-3482.74 2681.5,-3482.74 2675.5,-3482.74 2669.5,-3476.74 2669.5,-3470.74 2669.5,-3470.74 2669.5,-3400.74 2669.5,-3400.74 2669.5,-3394.74 2675.5,-3388.74 2681.5,-3388.74 2681.5,-3388.74 2901.5,-3388.74 2901.5,-3388.74 2907.5,-3388.74 2913.5,-3394.74 2913.5,-3400.74 2913.5,-3400.74 2913.5,-3470.74 2913.5,-3470.74 2913.5,-3476.74 2907.5,-3482.74 2901.5,-3482.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3446.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Close Touch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3406.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Close Touch",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="940924250eaffbeaff74dc5ab0bf13b2da91a4a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.21,-3208.29C2273.71,-3215.99 2318.82,-3233.13 2349.5,-3267.74 2366.05,-3286.41 2340.37,-3361.59 2357.5,-3379.74 2432.89,-3459.58 2561.62,-3466.99 2659.18,-3458.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2659.79,-3461.83 2669.42,-3457.4 2659.13,-3454.86 2659.79,-3461.83"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Corner Pass",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Corner Pass",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c43324faadb08677d8df8957a373cb4c9427530b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1601.5,-1164.74C1601.5,-1164.74 1381.5,-1164.74 1381.5,-1164.74 1375.5,-1164.74 1369.5,-1158.74 1369.5,-1152.74 1369.5,-1152.74 1369.5,-1082.74 1369.5,-1082.74 1369.5,-1076.74 1375.5,-1070.74 1381.5,-1070.74 1381.5,-1070.74 1601.5,-1070.74 1601.5,-1070.74 1607.5,-1070.74 1613.5,-1076.74 1613.5,-1082.74 1613.5,-1082.74 1613.5,-1152.74 1613.5,-1152.74 1613.5,-1158.74 1607.5,-1164.74 1601.5,-1164.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1128.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Corner Pass"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1088.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Corner Pass",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="6afa524d77469b0e6cdfaff2d63f93551fdf58b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.92,-3221.95C1836.12,-3216.02 1780.23,-3198.22 1744.5,-3155.74 1726.78,-3134.67 1753.69,-1195.23 1736.5,-1173.74 1709.36,-1139.81 1666.22,-1123.84 1623.7,-1116.97"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1624.18,-1113.51 1613.78,-1115.53 1623.17,-1120.43 1624.18,-1113.51"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doomsee Dish",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [
                        "Hitting the ball up the wall up near the ceiling to allow for a wall shot or an air dribble."
                    ],

                    title: "Doomsee Dish",
                    description: "When a player push dribbles the ball into the opponent's corner then pops (Hitting the ball in a way where it allows the player to hit it again) it away from the wall to hit it in a way to attempt a shot on goal.",
                    rank: "C",
                    upstreamSkills: ["Basic Aerials", "Game Awareness", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="461408ec2f18b326815f701571e15472f940020d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2921,-5008.74C2921,-5008.74 2662,-5008.74 2662,-5008.74 2656,-5008.74 2650,-5002.74 2650,-4996.74 2650,-4996.74 2650,-4926.74 2650,-4926.74 2650,-4920.74 2656,-4914.74 2662,-4914.74 2662,-4914.74 2921,-4914.74 2921,-4914.74 2927,-4914.74 2933,-4920.74 2933,-4926.74 2933,-4926.74 2933,-4996.74 2933,-4996.74 2933,-5002.74 2927,-5008.74 2921,-5008.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4972.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Doomsee Dish"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4932.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doomsee Dish",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="088fc2b24cbe6784a222b09461ecf773cbb71215" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.16,-3206.79C2274.23,-3214.31 2319.66,-3231.73 2349.5,-3267.74 2364.02,-3285.25 2342.44,-4888.68 2357.5,-4905.74 2425.9,-4983.17 2544.21,-4994.02 2639.89,-4987.24"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2640.27,-4990.72 2649.96,-4986.46 2639.72,-4983.74 2640.27,-4990.72"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Guillotine Passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Guillotine Passing",
                    description: "An advanced form of the backboard pass, the guillotine pass or bevel pass, is where a player aims higher up on the backboard towards the curve between the ceiling and wall to send the ball straight down, like a guillotine’s blade.",
                    rank: "C",
                    upstreamSkills: ["Game Awareness", "Powershot + Powerclears"],
                    downstreamSkills: []
                }}><GroupWrapper id="5802d67ec3952b30115eb0a2ff00b5582425abeb" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2954.5,-5120.74C2954.5,-5120.74 2628.5,-5120.74 2628.5,-5120.74 2622.5,-5120.74 2616.5,-5114.74 2616.5,-5108.74 2616.5,-5108.74 2616.5,-5038.74 2616.5,-5038.74 2616.5,-5032.74 2622.5,-5026.74 2628.5,-5026.74 2628.5,-5026.74 2954.5,-5026.74 2954.5,-5026.74 2960.5,-5026.74 2966.5,-5032.74 2966.5,-5038.74 2966.5,-5038.74 2966.5,-5108.74 2966.5,-5108.74 2966.5,-5114.74 2960.5,-5120.74 2954.5,-5120.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5084.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Guillotine Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5044.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Guillotine Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="e942a4dc090779dc581af6e2d1913f319994e5be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.17,-3206.79C2274.23,-3214.31 2319.66,-3231.73 2349.5,-3267.74 2365.01,-3286.45 2341.41,-4999.52 2357.5,-5017.74 2418.07,-5086.33 2517.8,-5102.68 2606.3,-5100.81"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2606.58,-5104.3 2616.47,-5100.51 2606.38,-5097.31 2606.58,-5104.3"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Infield Passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Infield Passing",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="ded72b43bf63aad0e3d91b4a1a1f3f0d84b1b2f4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2924.5,-3594.74C2924.5,-3594.74 2658.5,-3594.74 2658.5,-3594.74 2652.5,-3594.74 2646.5,-3588.74 2646.5,-3582.74 2646.5,-3582.74 2646.5,-3512.74 2646.5,-3512.74 2646.5,-3506.74 2652.5,-3500.74 2658.5,-3500.74 2658.5,-3500.74 2924.5,-3500.74 2924.5,-3500.74 2930.5,-3500.74 2936.5,-3506.74 2936.5,-3512.74 2936.5,-3512.74 2936.5,-3582.74 2936.5,-3582.74 2936.5,-3588.74 2930.5,-3594.74 2924.5,-3594.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3558.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Infield Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3518.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Infield Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="2a82335a34f1adac9e1b9fef24e2c4392c4180ea" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.24,-3207.49C2274.02,-3215.1 2319.27,-3232.39 2349.5,-3267.74 2365.69,-3286.66 2340.73,-3473.33 2357.5,-3491.74 2425.97,-3566.88 2541.53,-3578.66 2636.06,-3572.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2636.57,-3576.32 2646.31,-3572.14 2636.09,-3569.33 2636.57,-3576.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kickoff Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Kickoff Prediction",
                    description: "Reading the opponent in a 50/50 but during kickoff.",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="454017229b315aff8e91fd57a09283bbe1503a61" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2954,-3706.74C2954,-3706.74 2629,-3706.74 2629,-3706.74 2623,-3706.74 2617,-3700.74 2617,-3694.74 2617,-3694.74 2617,-3624.74 2617,-3624.74 2617,-3618.74 2623,-3612.74 2629,-3612.74 2629,-3612.74 2954,-3612.74 2954,-3612.74 2960,-3612.74 2966,-3618.74 2966,-3624.74 2966,-3624.74 2966,-3694.74 2966,-3694.74 2966,-3700.74 2960,-3706.74 2954,-3706.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3670.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Kickoff Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3630.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kickoff Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="0c6f6f79961babdc9afa0c123c1fccae65b647ca" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.12,-3207.2C2274.04,-3214.77 2319.4,-3232.11 2349.5,-3267.74 2361.55,-3282 2345.01,-3589.86 2357.5,-3603.74 2418.67,-3671.67 2518.3,-3688.03 2606.58,-3686.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2606.83,-3689.82 2616.74,-3686.05 2606.64,-3682.82 2606.83,-3689.82"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Opponent Boost Management",
                    description: "Mostly used in one verses one games and an advanced version of self boost management; It is the practice of knowing how much boost the opponent currently has at any moment.",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="706e36a274b1cefd87f6a0b56902596027196f36" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3063.5,-2698.74C3063.5,-2698.74 2519.5,-2698.74 2519.5,-2698.74 2513.5,-2698.74 2507.5,-2692.74 2507.5,-2686.74 2507.5,-2686.74 2507.5,-2616.74 2507.5,-2616.74 2507.5,-2610.74 2513.5,-2604.74 2519.5,-2604.74 2519.5,-2604.74 3063.5,-2604.74 3063.5,-2604.74 3069.5,-2604.74 3075.5,-2610.74 3075.5,-2616.74 3075.5,-2616.74 3075.5,-2686.74 3075.5,-2686.74 3075.5,-2692.74 3069.5,-2698.74 3063.5,-2698.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2662.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Opponent Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2622.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="86d86f548fb4ae64e6c33c63d7d1a638f3be6a08" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.25,-3216.38C2274.18,-3208.81 2319.51,-3191.44 2349.5,-3155.74 2365.51,-3136.67 2340.9,-2726.28 2357.5,-2707.74 2393.9,-2667.06 2444.09,-2644.83 2497.43,-2633.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2498.26,-2637.31 2507.43,-2631.99 2496.95,-2630.43 2498.26,-2637.31"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Opponent Prediction",
                    description: "Understanding what the opponent will do from experience and responding beforehand.",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="0bee089080a6d9ffe1b8b7d78345b56e5641c8ea" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2980,-2810.74C2980,-2810.74 2603,-2810.74 2603,-2810.74 2597,-2810.74 2591,-2804.74 2591,-2798.74 2591,-2798.74 2591,-2728.74 2591,-2728.74 2591,-2722.74 2597,-2716.74 2603,-2716.74 2603,-2716.74 2980,-2716.74 2980,-2716.74 2986,-2716.74 2992,-2722.74 2992,-2728.74 2992,-2728.74 2992,-2798.74 2992,-2798.74 2992,-2804.74 2986,-2810.74 2980,-2810.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2774.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Opponent Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2734.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="1a4978a5074c04537248607f066af57e7356a573" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.12,-3216.27C2274.04,-3208.7 2319.4,-3191.36 2349.5,-3155.74 2361.55,-3141.47 2345.01,-2833.61 2357.5,-2819.74 2412.7,-2758.42 2499.24,-2739.12 2580.49,-2737.19"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2580.93,-2740.69 2590.88,-2737.04 2580.83,-2733.69 2580.93,-2740.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Pinching",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                    }, {
                        text: "Rocket League Academy pinch shot tutorial.",
                        url: "https://www.youtube.com/watch?v=47wUzrUmNHQ"
                    }],

                    title: "Pinching",
                    description: "Hitting the ball against the floor or wall of the arena in a way that “pinches” the ball in a direction.",
                    rank: "G",
                    upstreamSkills: ["Basic Aerials", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c4a6dda7d9ec580fa318836908b3733aea6757c8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1585.5,-604.74C1585.5,-604.74 1397.5,-604.74 1397.5,-604.74 1391.5,-604.74 1385.5,-598.74 1385.5,-592.74 1385.5,-592.74 1385.5,-522.74 1385.5,-522.74 1385.5,-516.74 1391.5,-510.74 1397.5,-510.74 1397.5,-510.74 1585.5,-510.74 1585.5,-510.74 1591.5,-510.74 1597.5,-516.74 1597.5,-522.74 1597.5,-522.74 1597.5,-592.74 1597.5,-592.74 1597.5,-598.74 1591.5,-604.74 1585.5,-604.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-568.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Pinching"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-528.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Pinching",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="8dcb80bfa3d75a2c1076d34fdd33a41055424e8b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.9,-3221.97C1836.1,-3216.04 1780.21,-3198.24 1744.5,-3155.74 1721.79,-3128.7 1758.54,-641.32 1736.5,-613.74 1705.98,-575.54 1655.16,-560.1 1607.78,-554.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1608.03,-551.3 1597.73,-553.81 1607.34,-558.26 1608.03,-551.3"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Playstyle Reading",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Playstyle Reading",
                    description: "Being able to watch a player and understand their weaknesses and play against them.",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6e557670f4bc0f5c3a2d75244514eca81de801ad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2953,-2922.74C2953,-2922.74 2630,-2922.74 2630,-2922.74 2624,-2922.74 2618,-2916.74 2618,-2910.74 2618,-2910.74 2618,-2840.74 2618,-2840.74 2618,-2834.74 2624,-2828.74 2630,-2828.74 2630,-2828.74 2953,-2828.74 2953,-2828.74 2959,-2828.74 2965,-2834.74 2965,-2840.74 2965,-2840.74 2965,-2910.74 2965,-2910.74 2965,-2916.74 2959,-2922.74 2953,-2922.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2886.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Playstyle Reading"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2846.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Playstyle Reading",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="20995368ade62436142b3311fab09e973cf901ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.24,-3215.98C2274.02,-3208.37 2319.27,-3191.08 2349.5,-3155.74 2365.69,-3136.81 2340.73,-2950.14 2357.5,-2931.74 2419.25,-2863.96 2519.32,-2847.73 2607.71,-2849.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2607.78,-2852.97 2617.88,-2849.75 2607.98,-2845.97 2607.78,-2852.97"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Possession Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Possession Prediction",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Game Awareness", "Powershot + Powerclears"],
                    downstreamSkills: []
                }}><GroupWrapper id="8b5a1709bd001cb3cd9bee3c80300276e4531ff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1688.5,-828.74C1688.5,-828.74 1294.5,-828.74 1294.5,-828.74 1288.5,-828.74 1282.5,-822.74 1282.5,-816.74 1282.5,-816.74 1282.5,-746.74 1282.5,-746.74 1282.5,-740.74 1288.5,-734.74 1294.5,-734.74 1294.5,-734.74 1688.5,-734.74 1688.5,-734.74 1694.5,-734.74 1700.5,-740.74 1700.5,-746.74 1700.5,-746.74 1700.5,-816.74 1700.5,-816.74 1700.5,-822.74 1694.5,-828.74 1688.5,-828.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-792.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Possession Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-752.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="3f2bf2ce818de0032db4a4a2cab7c52c512cd922" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.9,-3221.96C1836.11,-3216.03 1780.21,-3198.23 1744.5,-3155.74 1723.79,-3131.09 1756.6,-862.88 1736.5,-837.74 1728.66,-827.92 1719.47,-819.61 1709.35,-812.59"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1710.94,-809.45 1700.64,-806.99 1707.16,-815.34 1710.94,-809.45"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot Passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powershot Passing",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b5525427452488ec5fd95bc4f54bd8bf7200f501" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1662,-5844.74C1662,-5844.74 1321,-5844.74 1321,-5844.74 1315,-5844.74 1309,-5838.74 1309,-5832.74 1309,-5832.74 1309,-5762.74 1309,-5762.74 1309,-5756.74 1315,-5750.74 1321,-5750.74 1321,-5750.74 1662,-5750.74 1662,-5750.74 1668,-5750.74 1674,-5756.74 1674,-5762.74 1674,-5762.74 1674,-5832.74 1674,-5832.74 1674,-5838.74 1668,-5844.74 1662,-5844.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5808.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powershot Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5768.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="42cb1d7520c96fc8ab018c2289490cd78a0a7338" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.9,-3201.5C1836.1,-3207.43 1780.21,-3225.23 1744.5,-3267.74 1722.4,-3294.04 1757.95,-5714.89 1736.5,-5741.74 1722.44,-5759.33 1704.08,-5772.09 1683.73,-5781.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1682.12,-5778.14 1674.25,-5785.23 1684.82,-5784.6 1682.12,-5778.14"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Shadowing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Video by SunlessKhan about shadow defence.",
                        url: "https://www.youtube.com/watch?v=2aZA-NCRRgI&vl=en"
                    }],

                    title: "Shadowing",
                    description: "When falling back on defense, shadowing allows the player to slow the pace of the game down by staying a moderate distance away from the ball while mimicking the opponent who has control of the ball. Also known as shadow defence.",
                    rank: "P",
                    upstreamSkills: ["Game Awareness", "Positioning"],
                    downstreamSkills: []
                }}><GroupWrapper id="e53555343e30299d84ed9ce47681c9d59614d7fc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1592.5,-6628.74C1592.5,-6628.74 1390.5,-6628.74 1390.5,-6628.74 1384.5,-6628.74 1378.5,-6622.74 1378.5,-6616.74 1378.5,-6616.74 1378.5,-6546.74 1378.5,-6546.74 1378.5,-6540.74 1384.5,-6534.74 1390.5,-6534.74 1390.5,-6534.74 1592.5,-6534.74 1592.5,-6534.74 1598.5,-6534.74 1604.5,-6540.74 1604.5,-6546.74 1604.5,-6546.74 1604.5,-6616.74 1604.5,-6616.74 1604.5,-6622.74 1598.5,-6628.74 1592.5,-6628.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6592.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Shadowing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6552.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="21204dd13f3ebc8562e7c30347a6ed2beea4a3b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1890.88,-3201.49C1836.08,-3207.41 1780.19,-3225.22 1744.5,-3267.74 1729.95,-3285.06 1750.62,-6508.06 1736.5,-6525.74 1707.44,-6562.12 1659.97,-6577.86 1614.59,-6583.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1614.16,-6580.39 1604.64,-6585.03 1614.98,-6587.34 1614.16,-6580.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Spring Roll",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "The Spring Roll",
                        url: "https://www.reddit.com/r/RocketLeague/comments/9df4av/someone_come_up_with_a_new_mechanic_and_name_it/e5hemz8/"
                    }],

                    title: "Spring Roll",
                    description: "A move where the player pops the ball up for another touch but, uses the car’s jump to go back down to the ground faster to fake the opponent.",
                    rank: "GC",
                    upstreamSkills: ["Doinking", "Double Jumping", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="76e9558e859ffe4b4d74c25a894bb587785133d0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3755.5,-4824.74C3755.5,-4824.74 3551.5,-4824.74 3551.5,-4824.74 3545.5,-4824.74 3539.5,-4818.74 3539.5,-4812.74 3539.5,-4812.74 3539.5,-4742.74 3539.5,-4742.74 3539.5,-4736.74 3545.5,-4730.74 3551.5,-4730.74 3551.5,-4730.74 3755.5,-4730.74 3755.5,-4730.74 3761.5,-4730.74 3767.5,-4736.74 3767.5,-4742.74 3767.5,-4742.74 3767.5,-4812.74 3767.5,-4812.74 3767.5,-4818.74 3761.5,-4824.74 3755.5,-4824.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4788.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Spring Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4748.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="ce96d7f23d91250787935e64e821ff1ea5fe14e0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228.07,-3206.87C2274.13,-3214.4 2319.58,-3231.8 2349.5,-3267.74 2364.96,-3286.31 2341.35,-4119.76 2357.5,-4137.74 2617.1,-4426.61 2964.84,-3950.82 3225.5,-4238.74 3243.51,-4258.63 3215.66,-4701.69 3233.5,-4721.74 3305.48,-4802.61 3433.65,-4808.87 3529.34,-4799.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3529.79,-4803.13 3539.38,-4798.62 3529.07,-4796.16 3529.79,-4803.13"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Aerial Powershot",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s Power shot guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                    }],

                    title: "Aerial Powershot",
                    description: "Positioning the car to go with the ball's momentum to powershot it.",
                    rank: "P",
                    upstreamSkills: ["Basic Aerials", "Powershot + Powerclears"],
                    downstreamSkills: []
                }}><GroupWrapper id="95db5dbea9d6dd0b9b333735ed54b07d0bd15896" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2214.5,-7636.74C2214.5,-7636.74 1904.5,-7636.74 1904.5,-7636.74 1898.5,-7636.74 1892.5,-7630.74 1892.5,-7624.74 1892.5,-7624.74 1892.5,-7554.74 1892.5,-7554.74 1892.5,-7548.74 1898.5,-7542.74 1904.5,-7542.74 1904.5,-7542.74 2214.5,-7542.74 2214.5,-7542.74 2220.5,-7542.74 2226.5,-7548.74 2226.5,-7554.74 2226.5,-7554.74 2226.5,-7624.74 2226.5,-7624.74 2226.5,-7630.74 2220.5,-7636.74 2214.5,-7636.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-7600.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Aerial Powershot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-7560.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="287831003c277b664bdf49cfc54182da5fb3768e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.81,-4384.01C1058.34,-4389.85 1107.95,-4405.9 1138.5,-4443.74 1153.45,-4462.25 1129.66,-7852.93 1146.5,-7869.74 1169.7,-7892.89 1712.91,-7892.5 1736.5,-7869.74 1754.42,-7852.44 1728.17,-7664.54 1744.5,-7645.74 1778.86,-7606.16 1830.74,-7588.19 1882.48,-7581.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1882.97,-7584.73 1892.48,-7580.06 1882.13,-7577.78 1882.97,-7584.73"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Bumps / Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Amustycow’s air demo tutorial.",
                        url: "https://www.youtube.com/watch?v=XIG84V6ERCA"
                    }],

                    title: "Air Bumps / Demos",
                    description: "Demo’s (demolishing and / or bumping) an opponent during their aerial or in the air.",
                    rank: "D",
                    upstreamSkills: ["Basic Aerials", "Basic Demos"],
                    downstreamSkills: ["Air Dribble To Demo"]
                }}><GroupWrapper id="64d58b29b06ef784c4a53b782063a5c55d322558" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2234.5,-3482.74C2234.5,-3482.74 1884.5,-3482.74 1884.5,-3482.74 1878.5,-3482.74 1872.5,-3476.74 1872.5,-3470.74 1872.5,-3470.74 1872.5,-3400.74 1872.5,-3400.74 1872.5,-3394.74 1878.5,-3388.74 1884.5,-3388.74 1884.5,-3388.74 2234.5,-3388.74 2234.5,-3388.74 2240.5,-3388.74 2246.5,-3394.74 2246.5,-3400.74 2246.5,-3400.74 2246.5,-3470.74 2246.5,-3470.74 2246.5,-3476.74 2240.5,-3482.74 2234.5,-3482.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3446.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Bumps / Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3406.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Bumps / Demos",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="593f13bc63469b1cf943c0fbd1146b7fbbe2510d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.7,-4391.37C1058.21,-4385.51 1107.83,-4369.48 1138.5,-4331.74 1155.47,-4310.84 1127.39,-3381.69 1146.5,-3362.74 1332.68,-3178.08 1515.1,-3222.23 1736.5,-3362.74 1743.55,-3367.21 1737.87,-3374.66 1744.5,-3379.74 1778.35,-3405.67 1820.24,-3421.06 1862.28,-3429.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1861.61,-3433.35 1872.1,-3431.87 1862.98,-3426.49 1861.61,-3433.35"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backwards Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Backwards Aerials",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Basic Aerials", "Joystick Air Roll"],
                    downstreamSkills: ["Tornado Spin"]
                }}><GroupWrapper id="1d5cb6bec87cf278ec89f5e049d00dccc1b13b67" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2961,-2362.74C2961,-2362.74 2622,-2362.74 2622,-2362.74 2616,-2362.74 2610,-2356.74 2610,-2350.74 2610,-2350.74 2610,-2280.74 2610,-2280.74 2610,-2274.74 2616,-2268.74 2622,-2268.74 2622,-2268.74 2961,-2268.74 2961,-2268.74 2967,-2268.74 2973,-2274.74 2973,-2280.74 2973,-2280.74 2973,-2350.74 2973,-2350.74 2973,-2356.74 2967,-2362.74 2961,-2362.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2326.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backwards Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2286.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backwards Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="fadcecb82f16a202686abd99d4f56b2bab8735e6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.82,-4391.47C1058.35,-4385.63 1107.95,-4369.58 1138.5,-4331.74 1156.96,-4308.86 1125.69,-119.5 1146.5,-98.74 1193.8,-51.52 2297.84,-56.34 2349.5,-98.74 2697.44,-384.28 2775.92,-1938.22 2788.47,-2258.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2784.99,-2258.69 2788.88,-2268.55 2791.99,-2258.42 2784.99,-2258.69"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling Shots",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="d19e57deecbdf35b8a361a5fd4c2db5654838836" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.65,-4391.33C1058.15,-4385.47 1107.79,-4369.44 1138.5,-4331.74 1151.5,-4315.77 1131.87,-3605.21 1146.5,-3590.74 1239.71,-3498.53 1643.44,-3498.37 1736.5,-3590.74 1757.54,-3611.61 1728.07,-4633.07 1744.5,-4657.74 1906.55,-4901.02 2187.32,-4672.53 2349.5,-4915.74 2363.88,-4937.3 2339.1,-5830.49 2357.5,-5848.74 2494.48,-5984.54 3087.91,-5983.92 3225.5,-5848.74 3243.53,-5831.02 3216.68,-5412.61 3233.5,-5393.74 3300.86,-5318.13 3417.32,-5307.75 3510.39,-5314.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3510.22,-5317.75 3520.46,-5315.03 3510.76,-5310.77 3510.22,-5317.75"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee Dish",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="454fb2283054e6850285e44e560dd9390c331d21" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.67,-4391.34C1058.17,-4385.49 1107.81,-4369.46 1138.5,-4331.74 1152.82,-4314.13 1130.37,-3530.7 1146.5,-3514.74 1332.82,-3330.23 1550.26,-3330.14 1736.5,-3514.74 1754.34,-3532.41 1733.14,-4396.34 1744.5,-4418.74 1896.25,-4717.82 2167.27,-4588.19 2349.5,-4869.74 2358.41,-4883.49 2345.4,-4894.68 2357.5,-4905.74 2432.34,-4974.12 2547.18,-4986.34 2639.78,-4982.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2640,-4985.9 2649.81,-4981.92 2639.66,-4978.91 2640,-4985.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double Jump Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://youtu.be/0ohM0iPynUI?t=62"
                    }],

                    title: "Double Jump Aerials",
                    description: "Jumping twice for maximum height, then going for an aerial.",
                    rank: "G",
                    upstreamSkills: ["Basic Aerials", "Double Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="00bc34dd4e490f922e9a45ffbb6d5dd5e68792a1" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1678,-1388.74C1678,-1388.74 1305,-1388.74 1305,-1388.74 1299,-1388.74 1293,-1382.74 1293,-1376.74 1293,-1376.74 1293,-1306.74 1293,-1306.74 1293,-1300.74 1299,-1294.74 1305,-1294.74 1305,-1294.74 1678,-1294.74 1678,-1294.74 1684,-1294.74 1690,-1300.74 1690,-1306.74 1690,-1306.74 1690,-1376.74 1690,-1376.74 1690,-1382.74 1684,-1388.74 1678,-1388.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1352.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Jump Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1312.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jump Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="64ba9ec3a4634a153bf17595fc1a60d3298b9589" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.8,-4391.45C1058.33,-4385.61 1107.94,-4369.57 1138.5,-4331.74 1151.3,-4315.89 1133.28,-1413.24 1146.5,-1397.74 1180.53,-1357.83 1230.94,-1338.53 1282.74,-1330.45"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1283.36,-1333.9 1292.77,-1329.03 1282.38,-1326.97 1283.36,-1333.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Fast Aerials",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Basic Aerials", "Double Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="19c79969ec65a637f01ae084a9cf18b354b05cbe" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1599,-6516.74C1599,-6516.74 1384,-6516.74 1384,-6516.74 1378,-6516.74 1372,-6510.74 1372,-6504.74 1372,-6504.74 1372,-6434.74 1372,-6434.74 1372,-6428.74 1378,-6422.74 1384,-6422.74 1384,-6422.74 1599,-6422.74 1599,-6422.74 1605,-6422.74 1611,-6428.74 1611,-6434.74 1611,-6434.74 1611,-6504.74 1611,-6504.74 1611,-6510.74 1605,-6516.74 1599,-6516.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6480.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Fast Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6440.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="c9179e3dd062b0ca5eac0d36583af8241da81b8f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.78,-4384.04C1058.3,-4389.88 1107.91,-4405.92 1138.5,-4443.74 1155.71,-4465.01 1128.73,-6392.93 1146.5,-6413.74 1198.01,-6474.05 1286.96,-6487.28 1361.51,-6485.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1362.03,-6489.32 1371.92,-6485.53 1361.83,-6482.32 1362.03,-6489.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Leveling Out",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Leveling Out",
                    description: "Orienting the car so it's facing the direction of travel while in the air to maintain speed when landing",
                    rank: "G",
                    upstreamSkills: ["Basic Aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="8d8c6887f0db17eef270e9780fd52005a3861986" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1607.5,-940.74C1607.5,-940.74 1375.5,-940.74 1375.5,-940.74 1369.5,-940.74 1363.5,-934.74 1363.5,-928.74 1363.5,-928.74 1363.5,-858.74 1363.5,-858.74 1363.5,-852.74 1369.5,-846.74 1375.5,-846.74 1375.5,-846.74 1607.5,-846.74 1607.5,-846.74 1613.5,-846.74 1619.5,-852.74 1619.5,-858.74 1619.5,-858.74 1619.5,-928.74 1619.5,-928.74 1619.5,-934.74 1613.5,-940.74 1607.5,-940.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-904.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Leveling Out"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-864.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Leveling Out",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="04d73664f45a28dd4d6969647f835278b3764637" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.81,-4391.46C1058.34,-4385.62 1107.95,-4369.57 1138.5,-4331.74 1153.26,-4313.46 1131.26,-967.61 1146.5,-949.74 1196.08,-891.57 1280.48,-877.17 1353.27,-877.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1353.41,-881.01 1363.45,-877.65 1353.5,-874.01 1353.41,-881.01"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Pinching",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="e5001144648ca9343ece52750feb74ffc4c8fcc5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.82,-4391.46C1058.34,-4385.62 1107.95,-4369.58 1138.5,-4331.74 1154.72,-4311.65 1129.75,-633.39 1146.5,-613.74 1201.15,-549.61 1298.13,-538.67 1375.21,-542.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1375.3,-545.55 1385.47,-542.58 1375.67,-538.56 1375.3,-545.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rebound Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Rebound Shots",
                    description: "When the ball hits a wall hard enough to start going towards midfield and the player uses prediction, aerials, and air rolls to score it.",
                    rank: "D",
                    upstreamSkills: ["Basic Aerials", "Prediction", "Redirects"],
                    downstreamSkills: []
                }}><GroupWrapper id="0fda196e33daaacda27b72bbc119f9b6b6b6fc86" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2929,-2586.74C2929,-2586.74 2654,-2586.74 2654,-2586.74 2648,-2586.74 2642,-2580.74 2642,-2574.74 2642,-2574.74 2642,-2504.74 2642,-2504.74 2642,-2498.74 2648,-2492.74 2654,-2492.74 2654,-2492.74 2929,-2492.74 2929,-2492.74 2935,-2492.74 2941,-2498.74 2941,-2504.74 2941,-2504.74 2941,-2574.74 2941,-2574.74 2941,-2580.74 2935,-2586.74 2929,-2586.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2550.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rebound Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2510.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rebound Shots",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="d41faa5989b81adbbae98fcbdfe09a47ccbe4d96" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.82,-4391.46C1058.34,-4385.63 1107.95,-4369.58 1138.5,-4331.74 1156.11,-4309.92 1126.66,-314.54 1146.5,-294.74 1241.11,-200.31 2254.81,-200.39 2349.5,-294.74 2371.04,-316.19 2337.39,-2460.94 2357.5,-2483.74 2423.91,-2559.01 2537.48,-2571.39 2631.64,-2565.8"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2632.11,-2569.28 2641.86,-2565.12 2631.65,-2562.3 2632.11,-2569.28"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Sideways Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Sideways Aerials",
                    description: "Hitting the ball in an aerial but, having either side of the car towards the floor.",
                    rank: "D",
                    upstreamSkills: ["Air Roll Shots", "Basic Aerials"],
                    downstreamSkills: ["Tornado Spin"]
                }}><GroupWrapper id="6beecc4e8a0017138e31c6bb7dfb3967c2140f4f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2946,-2474.74C2946,-2474.74 2637,-2474.74 2637,-2474.74 2631,-2474.74 2625,-2468.74 2625,-2462.74 2625,-2462.74 2625,-2392.74 2625,-2392.74 2625,-2386.74 2631,-2380.74 2637,-2380.74 2637,-2380.74 2946,-2380.74 2946,-2380.74 2952,-2380.74 2958,-2386.74 2958,-2392.74 2958,-2392.74 2958,-2462.74 2958,-2462.74 2958,-2468.74 2952,-2474.74 2946,-2474.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2438.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Sideways Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-2398.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Sideways Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="495972fb20a3e4ad6b3a8f864d23f4aed96cd9c8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1010.82,-4391.46C1058.34,-4385.63 1107.95,-4369.58 1138.5,-4331.74 1156.43,-4309.52 1126.29,-240.9 1146.5,-220.74 1241.11,-126.31 2254.81,-126.39 2349.5,-220.74 2370.66,-241.82 2337.73,-2349.33 2357.5,-2371.74 2419.98,-2442.55 2524.19,-2457.7 2614.72,-2454.6"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2614.99,-2458.09 2624.84,-2454.17 2614.7,-2451.09 2614.99,-2458.09"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6e12ddd82ba76fbdfd2f127c4d354e7597f33141" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1736.64,-7589.74C1785.56,-7589.74 1836.06,-7589.74 1882.14,-7589.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1882.21,-7593.24 1892.21,-7589.74 1882.21,-7586.24 1882.21,-7593.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Roll Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Air Roll Shots",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Bounce Powershots", "Joystick Air Roll", "Powershot + Powerclears"],
                    downstreamSkills: ["Sideways Aerials"]
                }}><GroupWrapper id="84ed59c1560e13f68a09cd57afb61f327ad64967" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2184.5,-3146.74C2184.5,-3146.74 1934.5,-3146.74 1934.5,-3146.74 1928.5,-3146.74 1922.5,-3140.74 1922.5,-3134.74 1922.5,-3134.74 1922.5,-3064.74 1922.5,-3064.74 1922.5,-3058.74 1928.5,-3052.74 1934.5,-3052.74 1934.5,-3052.74 2184.5,-3052.74 2184.5,-3052.74 2190.5,-3052.74 2196.5,-3058.74 2196.5,-3064.74 2196.5,-3064.74 2196.5,-3134.74 2196.5,-3134.74 2196.5,-3140.74 2190.5,-3146.74 2184.5,-3146.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3110.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Roll Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3070.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Roll Shots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5e6e71ec689305bb7b577ade176bf3b240b5a8a7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1728.8,-7542.48C1731.49,-7539.7 1734.06,-7536.79 1736.5,-7533.74 1755.46,-7509.97 1724.96,-3179.03 1744.5,-3155.74 1784.79,-3107.72 1850.84,-3091.21 1912,-3087.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1912.33,-3091.23 1922.16,-3087.28 1912.01,-3084.24 1912.33,-3091.23"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce Powershots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s Power shot guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                    }],

                    title: "Bounce Powershots",
                    description: "While the ball is boucing, powershot the ball after it bounces back off of the ground.",
                    rank: "P",
                    upstreamSkills: ["Jumping", "Powershot + Powerclears"],
                    downstreamSkills: ["Air Roll Shots"]
                }}><GroupWrapper id="b209979857f96555ea66ffe9ffcb87645ccec92f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2237.5,-6572.74C2237.5,-6572.74 1881.5,-6572.74 1881.5,-6572.74 1875.5,-6572.74 1869.5,-6566.74 1869.5,-6560.74 1869.5,-6560.74 1869.5,-6490.74 1869.5,-6490.74 1869.5,-6484.74 1875.5,-6478.74 1881.5,-6478.74 1881.5,-6478.74 2237.5,-6478.74 2237.5,-6478.74 2243.5,-6478.74 2249.5,-6484.74 2249.5,-6490.74 2249.5,-6490.74 2249.5,-6560.74 2249.5,-6560.74 2249.5,-6566.74 2243.5,-6572.74 2237.5,-6572.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6536.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce Powershots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6496.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5393ce41d9044769cb75e995ed926cb6df79f6b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1728.77,-7542.45C1731.47,-7539.68 1734.05,-7536.78 1736.5,-7533.74 1750.16,-7516.77 1734.43,-6769.05 1744.5,-6749.74 1785.33,-6671.44 1867.4,-6614.38 1937.4,-6577.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1939.05,-6580.53 1946.31,-6572.81 1935.83,-6574.31 1939.05,-6580.53"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Guillotine Passing",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="a30ea156efad5b878d52a671b68c8481cb0abb11" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1728.8,-7542.47C1731.49,-7539.7 1734.06,-7536.79 1736.5,-7533.74 1756.36,-7508.89 1724.13,-5268.16 1744.5,-5243.74 1951.15,-4995.99 2365.49,-5007.88 2606.02,-5039.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2605.9,-5043.48 2616.28,-5041.36 2606.84,-5036.54 2605.9,-5043.48"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="801627f5997fc9b6df68fbbcd96e5454f49ae0d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1246.48,-7609.98C1195.26,-7600.22 1153.34,-7575.83 1142.5,-7524.74 1137.69,-7502.05 1137.69,-869.42 1142.5,-846.74 1155.1,-787.36 1209.65,-764.05 1272.02,-757.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1272.42,-761.32 1282.09,-756.99 1271.83,-754.34 1272.42,-761.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Clears",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "waypr0tein",
                        url: "https://www.reddit.com/user/waypr0tein"
                    }],

                    title: "Wall Clears",
                    description: "Hitting the ball hard enough while off of the wall to clear the ball to the other side of the field.",
                    rank: "G",
                    upstreamSkills: ["Powershot + Powerclears", "Prediction", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="b92bb096f87c33e3f2fe965b18a4ebdd7374756c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1594.5,-1276.74C1594.5,-1276.74 1388.5,-1276.74 1388.5,-1276.74 1382.5,-1276.74 1376.5,-1270.74 1376.5,-1264.74 1376.5,-1264.74 1376.5,-1194.74 1376.5,-1194.74 1376.5,-1188.74 1382.5,-1182.74 1388.5,-1182.74 1388.5,-1182.74 1594.5,-1182.74 1594.5,-1182.74 1600.5,-1182.74 1606.5,-1188.74 1606.5,-1194.74 1606.5,-1194.74 1606.5,-1264.74 1606.5,-1264.74 1606.5,-1270.74 1600.5,-1276.74 1594.5,-1276.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1240.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1200.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="c9f4387c8905c55860eef274e62c9c20ac39b475" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1246.48,-7609.98C1195.26,-7600.22 1153.34,-7575.83 1142.5,-7524.74 1138.01,-7503.57 1138.01,-1315.9 1142.5,-1294.74 1161.33,-1206.03 1273.8,-1197.82 1366.06,-1206.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1365.74,-1210.36 1376.06,-1207.93 1366.48,-1203.4 1365.74,-1210.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Bumps / Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="34482f2ad88092105dd7d4883e6e75563baf3ecc" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1009,-4615.55C1057.01,-4609.87 1107.45,-4593.91 1138.5,-4555.74 1153.42,-4537.4 1132.78,-3723.99 1146.5,-3704.74 1306.31,-3480.41 1645.22,-3434.23 1861.88,-3429.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1862.17,-3432.76 1872.1,-3429.06 1862.03,-3425.76 1862.17,-3432.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Goalie Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Goalie Demos",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Basic Demos"],
                    downstreamSkills: []
                }}><GroupWrapper id="4a28cafe911bf4ae8e044789441ae3d4cd2c6576" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2184.5,-2810.74C2184.5,-2810.74 1934.5,-2810.74 1934.5,-2810.74 1928.5,-2810.74 1922.5,-2804.74 1922.5,-2798.74 1922.5,-2798.74 1922.5,-2728.74 1922.5,-2728.74 1922.5,-2722.74 1928.5,-2716.74 1934.5,-2716.74 1934.5,-2716.74 2184.5,-2716.74 2184.5,-2716.74 2190.5,-2716.74 2196.5,-2722.74 2196.5,-2728.74 2196.5,-2728.74 2196.5,-2798.74 2196.5,-2798.74 2196.5,-2804.74 2190.5,-2810.74 2184.5,-2810.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2774.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Goalie Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2734.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Goalie Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="02e51b4e5b1f27760f2c22fdbe3eba01bfd80e33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1009.05,-4615.59C1057.06,-4609.91 1107.5,-4593.94 1138.5,-4555.74 1158.14,-4531.53 1130.27,-3460.34 1146.5,-3433.74 1300.65,-3181.03 1579.95,-3375.96 1736.5,-3124.74 1745.46,-3110.35 1733.45,-2832.59 1744.5,-2819.74 1785.29,-2772.31 1851.22,-2755.83 1912.16,-2752.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1912.46,-2755.72 1922.28,-2751.74 1912.13,-2748.73 1912.46,-2755.72"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Dribble To Demo",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Amustycow’s air demo tutorial.",
                        url: "https://www.youtube.com/watch?v=XIG84V6ERCA"
                    }, "Being able to get back into position after a failed shot, aerial, or block."],

                    title: "Air Dribble To Demo",
                    description: "Usually a one verses one move, after an air dribble, the player goes towards the opponent to demolish or bump.",
                    rank: "C",
                    upstreamSkills: ["Air Bumps / Demos", "Air Dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="187aafb17bf227ad9d2dd1cf1af5d38371b38744" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2977,-4784.74C2977,-4784.74 2606,-4784.74 2606,-4784.74 2600,-4784.74 2594,-4778.74 2594,-4772.74 2594,-4772.74 2594,-4702.74 2594,-4702.74 2594,-4696.74 2600,-4690.74 2606,-4690.74 2606,-4690.74 2977,-4690.74 2977,-4690.74 2983,-4690.74 2989,-4696.74 2989,-4702.74 2989,-4702.74 2989,-4772.74 2989,-4772.74 2989,-4778.74 2983,-4784.74 2977,-4784.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4748.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Dribble To Demo"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4708.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble To Demo",
                    tailId: "Air Bumps / Demos"
                }}><GroupWrapper id="26488135c3b2a4d2bf49e1b737f835ed5386c889" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2246.51,-3434.43C2286.03,-3443.38 2323.59,-3460.6 2349.5,-3491.74 2365.97,-3511.53 2345.79,-4395.8 2357.5,-4418.74 2422.44,-4545.86 2564.24,-4634.92 2667.95,-4686.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2666.71,-4689.33 2677.23,-4690.56 2669.77,-4683.04 2666.71,-4689.33"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }, {
                        text: "Jhzer’s air dribbling tutorial.",
                        url: "https://www.youtube.com/watch?v=eU4hUqS5IS4"
                    }, {
                        text: "FLuuMP’s Air dribble tutorial.",
                        url: "https://www.youtube.com/watch?v=6Cy-LwvNpkI"
                    }, {
                        text: "Iridium ground to Air Dribble tutorial.",
                        url: "https://www.youtube.com/watch?v=3VyjtI_fGsg"
                    }],

                    title: "Air Dribbling",
                    description: "Keeping the ball close to the car in the air while pushing it towards a push or goal.",
                    rank: "D",
                    upstreamSkills: [],

                    downstreamSkills: [
                        "Air Dribble To Demo",
                        "Bounce To Air Dribble",
                        "Hood To Air Dribble",
                        "Wall Air Dribble"
                    ]
                }}><GroupWrapper id="587dfdcff36bb79d4e79497089347bf0ed47959b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2178,-3370.74C2178,-3370.74 1941,-3370.74 1941,-3370.74 1935,-3370.74 1929,-3364.74 1929,-3358.74 1929,-3358.74 1929,-3288.74 1929,-3288.74 1929,-3282.74 1935,-3276.74 1941,-3276.74 1941,-3276.74 2178,-3276.74 2178,-3276.74 2184,-3276.74 2190,-3282.74 2190,-3288.74 2190,-3288.74 2190,-3358.74 2190,-3358.74 2190,-3364.74 2184,-3370.74 2178,-3370.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3334.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3294.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble To Demo",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="1abbb4783592395d2aeaf2f5ca8e35941ebbc06e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2190.14,-3314.69C2247.9,-3318.17 2311.36,-3333.85 2349.5,-3379.74 2367.95,-3401.93 2344.38,-4393.03 2357.5,-4418.74 2422.38,-4545.89 2564.2,-4634.95 2667.92,-4686.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2666.68,-4689.34 2677.2,-4690.58 2669.75,-4683.05 2666.68,-4689.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce To Air Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }],

                    title: "Bounce To Air Dribble",
                    description: "Starting an air dribble after popping the ball up in a bounce dribble.",
                    rank: "D",
                    upstreamSkills: ["Air Dribbling", "Bounce Dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="1c8376a21cd95f20baa72447a2e903f8348fb452" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2992,-4042.74C2992,-4042.74 2591,-4042.74 2591,-4042.74 2585,-4042.74 2579,-4036.74 2579,-4030.74 2579,-4030.74 2579,-3960.74 2579,-3960.74 2579,-3954.74 2585,-3948.74 2591,-3948.74 2591,-3948.74 2992,-3948.74 2992,-3948.74 2998,-3948.74 3004,-3954.74 3004,-3960.74 3004,-3960.74 3004,-4030.74 3004,-4030.74 3004,-4036.74 2998,-4042.74 2992,-4042.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4006.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3966.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce To Air Dribble",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="1946a357ccbc69a503a232bb715a4c3b06de043f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2190.01,-3314.8C2247.73,-3318.31 2311.21,-3333.98 2349.5,-3379.74 2369.47,-3403.6 2336.79,-3916.51 2357.5,-3939.74 2409.76,-3998.34 2490.64,-4018.69 2568.41,-4022.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2568.75,-4025.65 2578.86,-4022.5 2568.99,-4018.66 2568.75,-4025.65"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hood To Air Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Iridium ground to Air Dribble tutorial.",
                        url: "https://www.youtube.com/watch?v=3VyjtI_fGsg"
                    }, {
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }, {
                        text: "Ytzi13 Air roll usage comment",
                        url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                    }],

                    title: "Hood To Air Dribble",
                    description: "Popping (Hitting the ball in a way where it allows the player to hit it again) the ball while hood dribbling then air dribbling it with the purpose of a goal.",
                    rank: "C",
                    upstreamSkills: ["Air Dribbling", "Hood Dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="6b6d13d5189cfa7b2822f546767c75b25aee3d36" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2973.5,-5344.74C2973.5,-5344.74 2609.5,-5344.74 2609.5,-5344.74 2603.5,-5344.74 2597.5,-5338.74 2597.5,-5332.74 2597.5,-5332.74 2597.5,-5262.74 2597.5,-5262.74 2597.5,-5256.74 2603.5,-5250.74 2609.5,-5250.74 2609.5,-5250.74 2973.5,-5250.74 2973.5,-5250.74 2979.5,-5250.74 2985.5,-5256.74 2985.5,-5262.74 2985.5,-5262.74 2985.5,-5332.74 2985.5,-5332.74 2985.5,-5338.74 2979.5,-5344.74 2973.5,-5344.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5308.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hood To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5268.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hood To Air Dribble",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="822fcd78d0eb6607ec2dc310088a1317ff3c2456" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2190.21,-3314.63C2247.98,-3318.1 2311.43,-3333.79 2349.5,-3379.74 2366,-3399.65 2340.38,-5222.35 2357.5,-5241.74 2413.72,-5305.42 2503.7,-5324.08 2587.1,-5324.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2587.23,-5328.43 2597.24,-5324.94 2587.25,-5321.43 2587.23,-5328.43"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Air Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }],

                    title: "Wall Air Dribble",
                    description: "Rolling the ball up the wall then popping it then jumping from the wall to push it mid-air into goal or onto the backboard to set up a backboard pass.",
                    rank: "D",
                    upstreamSkills: ["Air Dribbling"],
                    downstreamSkills: ["Turtle To Air Dribble"]
                }}><GroupWrapper id="643a8cb6d2e8b16fbbd4e84b7f44b5df97ece1ab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2936.5,-3818.74C2936.5,-3818.74 2646.5,-3818.74 2646.5,-3818.74 2640.5,-3818.74 2634.5,-3812.74 2634.5,-3806.74 2634.5,-3806.74 2634.5,-3736.74 2634.5,-3736.74 2634.5,-3730.74 2640.5,-3724.74 2646.5,-3724.74 2646.5,-3724.74 2936.5,-3724.74 2936.5,-3724.74 2942.5,-3724.74 2948.5,-3730.74 2948.5,-3736.74 2948.5,-3736.74 2948.5,-3806.74 2948.5,-3806.74 2948.5,-3812.74 2942.5,-3818.74 2936.5,-3818.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3782.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3742.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Air Dribble",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="3b1061f5e4eaf19fa0107f5fc042efc16e96aba2" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2190.19,-3314.99C2247.77,-3318.58 2311.07,-3334.26 2349.5,-3379.74 2361.55,-3394 2345.01,-3701.86 2357.5,-3715.74 2422.83,-3788.3 2532.03,-3802.01 2624.43,-3797.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2624.66,-3801.23 2634.46,-3797.2 2624.28,-3794.24 2624.66,-3801.23"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Joystick Air Roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Joystick Air Roll",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Air Roll Shots", "Backwards Aerials", "Turtling", "Wall Pinch"]
                }}><GroupWrapper id="7847fee1262959ac96105130b062f544c664b437" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1025.5,-4770.74C1025.5,-4770.74 735.5,-4770.74 735.5,-4770.74 729.5,-4770.74 723.5,-4764.74 723.5,-4758.74 723.5,-4758.74 723.5,-4688.74 723.5,-4688.74 723.5,-4682.74 729.5,-4676.74 735.5,-4676.74 735.5,-4676.74 1025.5,-4676.74 1025.5,-4676.74 1031.5,-4676.74 1037.5,-4682.74 1037.5,-4688.74 1037.5,-4688.74 1037.5,-4758.74 1037.5,-4758.74 1037.5,-4764.74 1031.5,-4770.74 1025.5,-4770.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4734.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Joystick Air Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4694.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Roll Shots",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="3faa8ba0b2b5cd2610310096ac41afcf6283f14e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1037.55,-4722.91C1076.18,-4714.73 1113.59,-4698.39 1138.5,-4667.74 1155.37,-4646.97 1134.25,-3728.52 1146.5,-3704.74 1294.87,-3416.76 1579.88,-3560.31 1736.5,-3276.74 1749.53,-3253.15 1726.53,-3175.81 1744.5,-3155.74 1786.05,-3109.33 1851.71,-3092.89 1912.27,-3089.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1912.53,-3092.54 1922.33,-3088.52 1912.16,-3085.55 1912.53,-3092.54"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backwards Aerials",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="92cceee64adbb05fc2bea30c5f3b9e3a44f86bfe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1037.68,-4723.02C1076.31,-4714.83 1113.69,-4698.47 1138.5,-4667.74 1157.57,-4644.1 1125.01,-316.19 1146.5,-294.74 1335.71,-105.87 2141.29,-127.06 2349.5,-294.74 2668.6,-551.71 2769.21,-1956.08 2787.31,-2258.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2783.84,-2258.89 2787.92,-2268.67 2790.82,-2258.48 2783.84,-2258.89"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Pinch",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="f9ba371593d0f28e7c469a60b4300fefb65a44c4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1037.65,-4724.47C1076.28,-4732.66 1113.67,-4749.01 1138.5,-4779.74 1150.03,-4794.01 1134.59,-7407.78 1146.5,-7421.74 1200.9,-7485.51 1297.15,-7496.66 1374.04,-7493.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1374.46,-7496.95 1384.27,-7492.95 1374.11,-7489.96 1374.46,-7496.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtling",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: true,
                    notes: [],
                    title: "Turtling",
                    description: "After a jump, turning the car upside down so that it lands on the hood of the car is turtling. Players can score a goal while doing this and get the turtle shot award.",
                    rank: "S",
                    upstreamSkills: ["Joystick Air Roll"],
                    downstreamSkills: ["Turtle Dribbling", "Turtle Flick"]
                }}><GroupWrapper id="f6ef1ec4e3cdd633da3819f1cb20f1feee3902c0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1587,-4755.74C1587,-4755.74 1396,-4755.74 1396,-4755.74 1390,-4755.74 1384,-4749.74 1384,-4743.74 1384,-4743.74 1384,-4673.74 1384,-4673.74 1384,-4667.74 1390,-4661.74 1396,-4661.74 1396,-4661.74 1587,-4661.74 1587,-4661.74 1593,-4661.74 1599,-4667.74 1599,-4673.74 1599,-4673.74 1599,-4743.74 1599,-4743.74 1599,-4749.74 1593,-4755.74 1587,-4755.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-4719.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-4679.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtling",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="1caf7caa7517ac1613d5f3d75bce71d12d69a92f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1037.54,-4719.89C1142.27,-4717.31 1278.02,-4713.97 1373.5,-4711.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1373.86,-4715.11 1383.77,-4711.36 1373.69,-4708.11 1373.86,-4715.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Sideways Aerials",
                    tailId: "Air Roll Shots"
                }}><GroupWrapper id="1ff6b88ba63f652fe7e8da519aef55fa3099f7b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2196.71,-3108.21C2252.59,-3103.91 2312.68,-3087.73 2349.5,-3043.74 2369.47,-3019.87 2336.79,-2506.96 2357.5,-2483.74 2420.29,-2413.32 2524.37,-2398.14 2614.75,-2401.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2614.72,-2404.63 2624.86,-2401.54 2615.01,-2397.63 2614.72,-2404.63"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Roll Shots",
                    tailId: "Bounce Powershots"
                }}><GroupWrapper id="94f719ff2f38fbb4a08479fa290f5ce03ae59be9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1869.45,-6545.09C1808.17,-6539.95 1752.76,-6518.51 1740.5,-6460.74 1735.75,-6438.34 1735.75,-3187.13 1740.5,-3164.74 1755.57,-3093.7 1835.87,-3077.59 1912.12,-3079.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1912.26,-3082.68 1922.36,-3079.49 1912.47,-3075.68 1912.26,-3082.68"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tornado Spin",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Tornado Spin",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Backwards Aerials", "Directional Air Roll", "Sideways Aerials"],
                    downstreamSkills: ["Breezi Flick", "Tornado Flick / Spin"]
                }}><GroupWrapper id="02d12fafde64ffa29df2a16b1f344dadedf75b51" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3774.5,-2474.74C3774.5,-2474.74 3532.5,-2474.74 3532.5,-2474.74 3526.5,-2474.74 3520.5,-2468.74 3520.5,-2462.74 3520.5,-2462.74 3520.5,-2392.74 3520.5,-2392.74 3520.5,-2386.74 3526.5,-2380.74 3532.5,-2380.74 3532.5,-2380.74 3774.5,-2380.74 3774.5,-2380.74 3780.5,-2380.74 3786.5,-2386.74 3786.5,-2392.74 3786.5,-2392.74 3786.5,-2462.74 3786.5,-2462.74 3786.5,-2468.74 3780.5,-2474.74 3774.5,-2474.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-2438.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tornado Spin"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-2398.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Spin",
                    tailId: "Backwards Aerials"
                }}><GroupWrapper id="78e94d5c8dde456372dc943f3548f3a6c54f885b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2973.16,-2339.03C3050.83,-2349.06 3142.63,-2360.94 3225.5,-2371.74 3320.43,-2384.1 3427.22,-2398.1 3510.26,-2409.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3509.9,-2412.5 3520.27,-2410.33 3510.81,-2405.56 3509.9,-2412.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chip Shot",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip Shot",
                    description: "Using boost to control how hard you chip the ball towards the goal",
                    rank: "G",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: ["Bait Shot"]
                }}><GroupWrapper id="36c41bc4976d87a51476ff84df70b605cfce40d8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1585.5,-1612.74C1585.5,-1612.74 1397.5,-1612.74 1397.5,-1612.74 1391.5,-1612.74 1385.5,-1606.74 1385.5,-1600.74 1385.5,-1600.74 1385.5,-1530.74 1385.5,-1530.74 1385.5,-1524.74 1391.5,-1518.74 1397.5,-1518.74 1397.5,-1518.74 1585.5,-1518.74 1585.5,-1518.74 1591.5,-1518.74 1597.5,-1524.74 1597.5,-1530.74 1597.5,-1530.74 1597.5,-1600.74 1597.5,-1600.74 1597.5,-1606.74 1591.5,-1612.74 1585.5,-1612.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1576.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1536.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Bait Shot",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Bait Shot",
                    description: "Intentionally missing the goal to draw out a defender",
                    rank: "P",
                    upstreamSkills: ["Chip Shot"],
                    downstreamSkills: []
                }}><GroupWrapper id="cfbccfe158286b2fb673b38ab0ba96b7576e0056" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.5,-7076.74C1586.5,-7076.74 1396.5,-7076.74 1396.5,-7076.74 1390.5,-7076.74 1384.5,-7070.74 1384.5,-7064.74 1384.5,-7064.74 1384.5,-6994.74 1384.5,-6994.74 1384.5,-6988.74 1390.5,-6982.74 1396.5,-6982.74 1396.5,-6982.74 1586.5,-6982.74 1586.5,-6982.74 1592.5,-6982.74 1598.5,-6988.74 1598.5,-6994.74 1598.5,-6994.74 1598.5,-7064.74 1598.5,-7064.74 1598.5,-7070.74 1592.5,-7076.74 1586.5,-7076.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7040.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bait Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7000.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bait Shot",
                    tailId: "Chip Shot"
                }}><GroupWrapper id="d3a900f5da85b600216799025e0626cfe613d3a8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1385.21,-1545.03C1290.11,-1533.06 1162.65,-1535.78 1142.5,-1630.74 1138.66,-1648.85 1138.66,-6946.62 1142.5,-6964.74 1161.88,-7056.06 1280.52,-7062.07 1374.17,-7051.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1374.78,-7055.2 1384.3,-7050.56 1373.96,-7048.25 1374.78,-7055.2"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Jumping",
                    description: "",
                    rank: "B",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "Ball Camera Control",
                        "Basic Aerials",
                        "Bounce Powershots",
                        "Directional Air Roll",
                        "Double Jumping",
                        "Flip Window",
                        "Flipping",
                        "Hoops - Friendship / Fusion Kickoff",
                        "Joystick Air Roll",
                        "Popping",
                        "Wall Pinch"
                    ]
                }}><GroupWrapper id="38d0bb0d896dbbec2e35ed651df7e15babe319b5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M562,-5408.74C562,-5408.74 371,-5408.74 371,-5408.74 365,-5408.74 359,-5402.74 359,-5396.74 359,-5396.74 359,-5326.74 359,-5326.74 359,-5320.74 365,-5314.74 371,-5314.74 371,-5314.74 562,-5314.74 562,-5314.74 568,-5314.74 574,-5320.74 574,-5326.74 574,-5326.74 574,-5396.74 574,-5396.74 574,-5402.74 568,-5408.74 562,-5408.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5372.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5332.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Popping",
                    tailId: "Jumping"
                }}><GroupWrapper id="03d1e8d95dd46376633beb1fd22529e51ff511fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M467.29,-5314.51C467.62,-5158.84 477.07,-4665.49 582,-4555.74 627.76,-4507.87 700.53,-4493.56 762.65,-4491.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="763.01,-4494.85 772.91,-4491.1 762.83,-4487.86 763.01,-4494.85"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Flipping",
                    tailId: "Jumping"
                }}><GroupWrapper id="96092db701ed22de4a7d19868e7adbf9d35b541e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M566.97,-5408.91C569.51,-5411.7 571.87,-5414.64 574,-5417.74 591.23,-5442.82 561.24,-5463.49 582,-5485.74 627.26,-5534.23 700.22,-5548.52 762.55,-5550.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="762.78,-5554.05 772.85,-5550.77 762.93,-5547.05 762.78,-5554.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Aerials",
                    tailId: "Jumping"
                }}><GroupWrapper id="a86d228158ce930f72b88a82a02ddb011cb04d94" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M474.18,-5314.55C491.95,-5187.98 541.28,-4830.31 574,-4531.74 575.07,-4521.98 575.4,-4451 582,-4443.74 621.52,-4400.26 683.25,-4384.07 740.26,-4379.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="740.73,-4383.11 750.47,-4378.96 740.26,-4376.13 740.73,-4383.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Joystick Air Roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="422ff7142e1a4d06294a0f4586cdf604276666b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M470.13,-5314.63C478.1,-5189.8 506.23,-4854.88 582,-4779.74 616.58,-4745.44 665.1,-4728.64 712.94,-4721.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="713.73,-4724.58 723.13,-4719.69 712.74,-4717.65 713.73,-4724.58"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Jumping"
                }}><GroupWrapper id="29ed75b408be8185556eb730bdc5870d85da7d79" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M467.49,-5314.7C467.93,-5075.23 475.82,-3998.92 582,-3900.74 958.73,-3552.37 1373.11,-3538.48 1736.5,-3900.74 1749.13,-3913.33 1733.02,-6456.08 1744.5,-6469.74 1773.31,-6504.03 1815.26,-6522.24 1859.17,-6531.11"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1858.69,-6534.58 1869.16,-6532.97 1859.97,-6527.7 1858.69,-6534.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ball Camera Control",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Ball Camera Control",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Push Dribbling"]
                }}><GroupWrapper id="322c8b04c579d0cc6dedbe23975a2015fdeb60f0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1067,-4210.74C1067,-4210.74 694,-4210.74 694,-4210.74 688,-4210.74 682,-4204.74 682,-4198.74 682,-4198.74 682,-4128.74 682,-4128.74 682,-4122.74 688,-4116.74 694,-4116.74 694,-4116.74 1067,-4116.74 1067,-4116.74 1073,-4116.74 1079,-4122.74 1079,-4128.74 1079,-4128.74 1079,-4198.74 1079,-4198.74 1079,-4204.74 1073,-4210.74 1067,-4210.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4174.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ball Camera Control"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4134.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ball Camera Control",
                    tailId: "Jumping"
                }}><GroupWrapper id="f399b2a4c58561116c62feeddf52af6576cfa4ae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M475.26,-5314.65C495.69,-5188.33 551.01,-4831.22 574,-4531.74 575.33,-4514.45 570.76,-4232.94 582,-4219.74 605.35,-4192.3 637.53,-4175.54 672.14,-4165.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="673.18,-4169.05 681.96,-4163.12 671.4,-4162.29 673.18,-4169.05"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Directional Air Roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Directional Air Roll",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Bunny Hopping", "Speed Flipping", "Stalling", "Tornado Spin"]
                }}><GroupWrapper id="9e3b39aecce8df563adadd6729649a4bf2537a10" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1055,-4322.74C1055,-4322.74 706,-4322.74 706,-4322.74 700,-4322.74 694,-4316.74 694,-4310.74 694,-4310.74 694,-4240.74 694,-4240.74 694,-4234.74 700,-4228.74 706,-4228.74 706,-4228.74 1055,-4228.74 1055,-4228.74 1061,-4228.74 1067,-4234.74 1067,-4240.74 1067,-4240.74 1067,-4310.74 1067,-4310.74 1067,-4316.74 1061,-4322.74 1055,-4322.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4286.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Directional Air Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4246.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional Air Roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="b1d438970212cc2a96a493454947cb28af5b4b53" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M475.02,-5314.63C494.86,-5188.26 548.86,-4831.04 574,-4531.74 574.93,-4520.65 574.73,-4340.15 582,-4331.74 608.13,-4301.48 644.99,-4284.26 683.9,-4275"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="684.82,-4278.39 693.83,-4272.82 683.31,-4271.55 684.82,-4278.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Double Jumping",
                    description: "",
                    rank: "B",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Double Jump Aerials", "Fast Aerials", "Spring Roll"]
                }}><GroupWrapper id="03c645b9ea53657cc27a20182e7610dcc89b94ee" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1026.5,-5476.74C1026.5,-5476.74 734.5,-5476.74 734.5,-5476.74 728.5,-5476.74 722.5,-5470.74 722.5,-5464.74 722.5,-5464.74 722.5,-5394.74 722.5,-5394.74 722.5,-5388.74 728.5,-5382.74 734.5,-5382.74 734.5,-5382.74 1026.5,-5382.74 1026.5,-5382.74 1032.5,-5382.74 1038.5,-5388.74 1038.5,-5394.74 1038.5,-5394.74 1038.5,-5464.74 1038.5,-5464.74 1038.5,-5470.74 1032.5,-5476.74 1026.5,-5476.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-5440.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-5400.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jumping",
                    tailId: "Jumping"
                }}><GroupWrapper id="968f8634e8cf7c030c4fbb56a8841097ca9a258b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M574.14,-5379.34C616.32,-5386.3 665.81,-5394.47 712.52,-5402.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="712.01,-5405.64 722.44,-5403.81 713.15,-5398.73 712.01,-5405.64"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip Window",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Flip Window",
                    description: "Understanding how long you have to flip, and when your flip is avaialable again (when it resets)",
                    rank: "S",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Flip Resets", "Rumble - UFO Shots"]
                }}><GroupWrapper id="bf988ab8fc9ce684ae09535bf927100f8d56eb42" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M994,-4994.74C994,-4994.74 767,-4994.74 767,-4994.74 761,-4994.74 755,-4988.74 755,-4982.74 755,-4982.74 755,-4912.74 755,-4912.74 755,-4906.74 761,-4900.74 767,-4900.74 767,-4900.74 994,-4900.74 994,-4900.74 1000,-4900.74 1006,-4906.74 1006,-4912.74 1006,-4912.74 1006,-4982.74 1006,-4982.74 1006,-4988.74 1000,-4994.74 994,-4994.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4958.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Window"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4918.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip Window",
                    tailId: "Jumping"
                }}><GroupWrapper id="b3233626c9af0cafe621b72d3021f113d64738fe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M484.2,-5314.73C506.23,-5251.85 545.56,-5136.67 574,-5036.74 578.13,-5022.22 571.06,-5014.13 582,-5003.74 624.96,-4962.94 687.78,-4947.21 744.63,-4942.39"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="745.09,-4945.87 754.8,-4941.64 744.57,-4938.88 745.09,-4945.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hoops - Friendship / Fusion Kickoff",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Example by Patrick Burks.",
                        url: "https://www.youtube.com/watch?v=SVojeSnfIs0"
                    }, {
                        text: "Clip of a johnnyboi_i Stream.",
                        url: "https://www.twitch.tv/johnnyboi_i/clip/FineOpenLionNerfRedBlaster"
                    }, {
                        text: "Friendship Kickoff tutorial.",
                        url: "https://www.reddit.com/r/RocketLeagueHoops/comments/6ths26/the_friendship_kickoff_in_hoops_im_here_to/?st=jaki6yvh&sh=a7e9c3ec"
                    }],

                    title: "Hoops - Friendship / Fusion Kickoff",
                    description: "Hitting the teammate in a way to boost them faster to the ball.",
                    rank: "C",
                    upstreamSkills: ["Jumping", "Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="1a2754a90c93002ead2d7ede01cabf26a4f9e15a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3113.5,-4896.74C3113.5,-4896.74 2469.5,-4896.74 2469.5,-4896.74 2463.5,-4896.74 2457.5,-4890.74 2457.5,-4884.74 2457.5,-4884.74 2457.5,-4814.74 2457.5,-4814.74 2457.5,-4808.74 2463.5,-4802.74 2469.5,-4802.74 2469.5,-4802.74 3113.5,-4802.74 3113.5,-4802.74 3119.5,-4802.74 3125.5,-4808.74 3125.5,-4814.74 3125.5,-4814.74 3125.5,-4884.74 3125.5,-4884.74 3125.5,-4890.74 3119.5,-4896.74 3113.5,-4896.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4860.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hoops - Friendship / Fusion Kickoff"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-4820.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Friendship / Fusion Kickoff",
                    tailId: "Jumping"
                }}><GroupWrapper id="a01934255f1b44e069e0e102a96e0c4d39354676" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M468.46,-5314.6C474.65,-5022.48 510.82,-3469.32 582,-3400.74 951.51,-3044.68 1371.94,-3027.61 1736.5,-3388.74 1753.18,-3405.25 1730.45,-4214.93 1744.5,-4233.74 1912.81,-4458.97 2179.85,-4194.5 2349.5,-4418.74 2362.07,-4435.35 2343.58,-4778.23 2357.5,-4793.74 2382.33,-4821.38 2413.52,-4840.49 2447.73,-4853.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2446.86,-4856.73 2457.46,-4856.77 2449.21,-4850.13 2446.86,-4856.73"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Pinch",
                    tailId: "Jumping"
                }}><GroupWrapper id="62b0f3c1b612adcd854011c733e89f7ed2958d9f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.68,-5409.19C569.98,-5411.89 572.1,-5414.74 574,-5417.74 584.73,-5434.64 573.68,-5579.53 582,-5597.74 723.54,-5907.57 1002.91,-5812.25 1138.5,-6124.74 1145.67,-6141.26 1134.79,-7408.05 1146.5,-7421.74 1201,-7485.42 1297.25,-7496.58 1374.1,-7493.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1374.52,-7496.9 1384.33,-7492.9 1374.17,-7489.91 1374.52,-7496.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Push Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers Dribbling Tutorial.",
                        url: "https://www.youtube.com/watch?v=eBmgRPOmh98"
                    }],

                    title: "Push Dribbling",
                    description: "Having the ball on the ground and pushing it with the front of the players car.",
                    rank: "G",
                    upstreamSkills: ["Ball Camera Control"],
                    downstreamSkills: ["Bounce Dribbling", "Hood Dribble", "Turtle Dribbling"]
                }}><GroupWrapper id="b57d7ec77eee426ded15ef7177bb6151aefdc7fb" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1627.5,-1836.74C1627.5,-1836.74 1355.5,-1836.74 1355.5,-1836.74 1349.5,-1836.74 1343.5,-1830.74 1343.5,-1824.74 1343.5,-1824.74 1343.5,-1754.74 1343.5,-1754.74 1343.5,-1748.74 1349.5,-1742.74 1355.5,-1742.74 1355.5,-1742.74 1627.5,-1742.74 1627.5,-1742.74 1633.5,-1742.74 1639.5,-1748.74 1639.5,-1754.74 1639.5,-1754.74 1639.5,-1824.74 1639.5,-1824.74 1639.5,-1830.74 1633.5,-1836.74 1627.5,-1836.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1800.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Push Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1760.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Push Dribbling",
                    tailId: "Ball Camera Control"
                }}><GroupWrapper id="ef295fff3dd4f94939b774bdb4c47d74fbdefb17" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1079.12,-4150.37C1102.03,-4140.86 1122.78,-4127.18 1138.5,-4107.74 1158.25,-4083.3 1126.11,-1869.63 1146.5,-1845.74 1191.52,-1792.98 1265.18,-1776.24 1332.82,-1773.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1333.27,-1777.33 1343.18,-1773.58 1333.1,-1770.33 1333.27,-1777.33"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turning",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Turning",
                    description: "",
                    rank: "B",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Basic Demos", "Powershot + Powerclears", "Redirects"]
                }}><GroupWrapper id="b0f78a0f574630800e6d978b85363ff41bd7ad8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M562,-5520.74C562,-5520.74 371,-5520.74 371,-5520.74 365,-5520.74 359,-5514.74 359,-5508.74 359,-5508.74 359,-5438.74 359,-5438.74 359,-5432.74 365,-5426.74 371,-5426.74 371,-5426.74 562,-5426.74 562,-5426.74 568,-5426.74 574,-5432.74 574,-5438.74 574,-5438.74 574,-5508.74 574,-5508.74 574,-5514.74 568,-5520.74 562,-5520.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5484.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5444.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Turning"
                }}><GroupWrapper id="65d524634dc012c0ec9b26a6896ba3cfa8d7d463" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.8,-5521.11C570.06,-5523.84 572.14,-5526.71 574,-5529.74 591.28,-5557.92 560.75,-6099.41 582,-6124.74 743.82,-6317.63 977.39,-6037.25 1138.5,-6230.74 1161.66,-6258.55 1122.97,-7506.23 1146.5,-7533.74 1170.23,-7561.47 1201.88,-7579.24 1236.4,-7590.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1235.63,-7593.63 1246.21,-7593.13 1237.62,-7586.92 1235.63,-7593.63"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Turning"
                }}><GroupWrapper id="04363ac6b640dc5c3d688ce5a59f51e53ce1b738" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.81,-5426.37C570.07,-5423.64 572.15,-5420.77 574,-5417.74 584.87,-5399.96 568.61,-4683.7 582,-4667.74 620.46,-4621.86 683.6,-4605.72 741.84,-4601.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="742.09,-4605.43 751.89,-4601.4 741.72,-4598.44 742.09,-4605.43"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Turning"
                }}><GroupWrapper id="86d5ea5067f613df951463cdbd4fa42a98441d9e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M567.84,-5426.38C570.09,-5423.65 572.16,-5420.77 574,-5417.74 589.08,-5392.88 567.88,-3350.14 582,-3324.74 878.25,-2791.67 1175.54,-2815.3 1744.5,-2595.74 1807.87,-2571.28 1882.61,-2557.4 1943.27,-2549.58"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.78,-2553.05 1953.27,-2548.33 1942.91,-2546.1 1943.78,-2553.05"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Driving",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Driving",
                    description: "",
                    rank: "B",
                    upstreamSkills: [],

                    downstreamSkills: [
                        "Boosting",
                        "Braking",
                        "Clears",
                        "Crossing",
                        "Jumping",
                        "Positioning",
                        "Powershot + Powerclears",
                        "Powerslide Turning",
                        "Prediction",
                        "Turning"
                    ]
                }}><GroupWrapper id="ff52a774cad89d125cacf645052cfe567096d753" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M311,-5408.74C311,-5408.74 120,-5408.74 120,-5408.74 114,-5408.74 108,-5402.74 108,-5396.74 108,-5396.74 108,-5326.74 108,-5326.74 108,-5320.74 114,-5314.74 120,-5314.74 120,-5314.74 311,-5314.74 311,-5314.74 317,-5314.74 323,-5320.74 323,-5326.74 323,-5326.74 323,-5396.74 323,-5396.74 323,-5402.74 317,-5408.74 311,-5408.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="215.5"
                        y="-5372.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Driving"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="215.5"
                        y="-5332.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boosting",
                    tailId: "Driving"
                }}><GroupWrapper id="f8161b17441a7def2138c218af3057859b4183f1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M248.69,-5408.79C275.21,-5445.08 315.43,-5494.81 359,-5529.74 360.2,-5530.69 361.41,-5531.65 362.65,-5532.59"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="360.86,-5535.61 371.01,-5538.66 364.97,-5529.95 360.86,-5535.61"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Driving"
                }}><GroupWrapper id="a95d5e59165072fdf6c0c854a63cde1a2361053e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M323.39,-5314.86C335.22,-5311.14 347.25,-5307.96 359,-5305.74 452.89,-5287.95 481,-5283.78 574,-5305.74 577.87,-5306.65 578.19,-5308.6 582,-5309.74 701.32,-5345.22 1055.49,-5280.97 1138.5,-5373.74 1158.51,-5396.09 1127.02,-7510.92 1146.5,-7533.74 1170.2,-7561.5 1201.83,-7579.29 1236.34,-7590.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1235.57,-7593.68 1246.15,-7593.18 1237.56,-7586.97 1235.57,-7593.68"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Jumping",
                    tailId: "Driving"
                }}><GroupWrapper id="4acdb597339422b238ab40122e44811df9987004" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M323.18,-5361.74C331.53,-5361.74 340,-5361.74 348.41,-5361.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="348.64,-5365.24 358.64,-5361.74 348.64,-5358.24 348.64,-5365.24"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="d26ba9c663855ade1d9248c95687355f9190979d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M321.02,-5408.75C331.1,-5413.28 341.37,-5417.9 351.54,-5422.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="350.3,-5425.75 360.85,-5426.66 353.17,-5419.37 350.3,-5425.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Prediction",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "Bounce Dribbling",
                        "Catching",
                        "Cutting",
                        "Faking",
                        "Game Awareness",
                        "Pre-Jumping",
                        "Rebound Shots",
                        "Softblock",
                        "Wall Clears"
                    ]
                }}><GroupWrapper id="ee38cfee82eaaaaee93464fde8775d2369d8d404" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.5,-7188.74C1586.5,-7188.74 1396.5,-7188.74 1396.5,-7188.74 1390.5,-7188.74 1384.5,-7182.74 1384.5,-7176.74 1384.5,-7176.74 1384.5,-7106.74 1384.5,-7106.74 1384.5,-7100.74 1390.5,-7094.74 1396.5,-7094.74 1396.5,-7094.74 1586.5,-7094.74 1586.5,-7094.74 1592.5,-7094.74 1598.5,-7100.74 1598.5,-7106.74 1598.5,-7106.74 1598.5,-7176.74 1598.5,-7176.74 1598.5,-7182.74 1592.5,-7188.74 1586.5,-7188.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7152.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7112.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Prediction",
                    tailId: "Driving"
                }}><GroupWrapper id="e6d0ac4250488960d3927971b52afff6bb1c939b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M275.33,-5314.65C299.74,-5297.98 329.28,-5281.25 359,-5272.74 560.76,-5214.91 1093.21,-5289.9 1138.5,-5340.74 1154.62,-5358.83 1130.76,-7067.31 1146.5,-7085.74 1200.95,-7149.47 1297.2,-7160.62 1374.07,-7157.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1374.49,-7160.92 1384.3,-7156.93 1374.14,-7153.93 1374.49,-7160.92"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Braking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Braking",
                    description: "Slows the car down by letting go of accelerate and pressing reverse.",
                    rank: "B",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="eaa44d00fe236ab417d0738ebd452e912564166a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M562,-5744.74C562,-5744.74 371,-5744.74 371,-5744.74 365,-5744.74 359,-5738.74 359,-5732.74 359,-5732.74 359,-5662.74 359,-5662.74 359,-5656.74 365,-5650.74 371,-5650.74 371,-5650.74 562,-5650.74 562,-5650.74 568,-5650.74 574,-5656.74 574,-5662.74 574,-5662.74 574,-5732.74 574,-5732.74 574,-5738.74 568,-5744.74 562,-5744.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5708.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Braking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5668.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Braking",
                    tailId: "Driving"
                }}><GroupWrapper id="ebf18b4afe73755cc0d0b934b00523fd5e4f7036" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M230.56,-5408.98C250.58,-5469.41 292.43,-5574.28 359,-5641.74 359.77,-5642.52 360.55,-5643.29 361.35,-5644.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="359.02,-5646.67 368.82,-5650.7 363.68,-5641.44 359.02,-5646.67"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Clears",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Clears",
                    description: "",
                    rank: "B",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powershot + Powerclears"]
                }}><GroupWrapper id="422eaecf9ea3e214d2ea162be23f6f4212669f3f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M562,-5856.74C562,-5856.74 371,-5856.74 371,-5856.74 365,-5856.74 359,-5850.74 359,-5844.74 359,-5844.74 359,-5774.74 359,-5774.74 359,-5768.74 365,-5762.74 371,-5762.74 371,-5762.74 562,-5762.74 562,-5762.74 568,-5762.74 574,-5768.74 574,-5774.74 574,-5774.74 574,-5844.74 574,-5844.74 574,-5850.74 568,-5856.74 562,-5856.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5820.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="466.5"
                        y="-5780.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Clears",
                    tailId: "Driving"
                }}><GroupWrapper id="a1424a1c38fd33b9adb5a6a2c4fa1b7d6161ad64" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M222.47,-5408.94C234.77,-5488.71 269.71,-5651.45 359,-5753.74 359.52,-5754.33 360.04,-5754.91 360.57,-5755.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="358.29,-5758.16 367.85,-5762.73 363.23,-5753.2 358.29,-5758.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Crossing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Crossing",
                    description: "",
                    rank: "D",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="7cd05f58b6adce6d5be96789fd45b25a4834018c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2153.5,-2474.74C2153.5,-2474.74 1965.5,-2474.74 1965.5,-2474.74 1959.5,-2474.74 1953.5,-2468.74 1953.5,-2462.74 1953.5,-2462.74 1953.5,-2392.74 1953.5,-2392.74 1953.5,-2386.74 1959.5,-2380.74 1965.5,-2380.74 1965.5,-2380.74 2153.5,-2380.74 2153.5,-2380.74 2159.5,-2380.74 2165.5,-2386.74 2165.5,-2392.74 2165.5,-2392.74 2165.5,-2462.74 2165.5,-2462.74 2165.5,-2468.74 2159.5,-2474.74 2153.5,-2474.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2438.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Crossing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2398.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Crossing",
                    tailId: "Driving"
                }}><GroupWrapper id="a4dd9bcb7c16e49f157714b721c1b3dc3a9b3e1c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M216.75,-5314.62C219.31,-5000.66 248.58,-3211.54 582,-2809.74 926.9,-2394.11 1659.57,-2398.3 1943.1,-2417.16"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.19,-2420.67 1953.4,-2417.86 1943.66,-2413.69 1943.19,-2420.67"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Positioning",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Positioning",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Rotation", "Shadowing", "Teammate Awareness", "Wall Driving"]
                }}><GroupWrapper id="a712a04c933abf5a931bcfdc872cedc3542e0268" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M981,-4882.74C981,-4882.74 780,-4882.74 780,-4882.74 774,-4882.74 768,-4876.74 768,-4870.74 768,-4870.74 768,-4800.74 768,-4800.74 768,-4794.74 774,-4788.74 780,-4788.74 780,-4788.74 981,-4788.74 981,-4788.74 987,-4788.74 993,-4794.74 993,-4800.74 993,-4800.74 993,-4870.74 993,-4870.74 993,-4876.74 987,-4882.74 981,-4882.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4846.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Positioning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4806.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Positioning",
                    tailId: "Driving"
                }}><GroupWrapper id="6d69af14f92aa38b283d9f38a8f8e55b7da6c9be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M238.46,-5314.52C286.06,-5217.83 408.62,-4997.54 582,-4891.74 634.37,-4859.77 700.85,-4845.32 757.67,-4839.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="758.2,-4842.51 767.79,-4838 757.49,-4835.55 758.2,-4842.51"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Turning",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powerslide Turning",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Power Slide Dribble", "Powerslide Recovery"]
                }}><GroupWrapper id="0fbaf27e68e4e8e34b42a9e74352bce7299da410" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1057.5,-4098.74C1057.5,-4098.74 703.5,-4098.74 703.5,-4098.74 697.5,-4098.74 691.5,-4092.74 691.5,-4086.74 691.5,-4086.74 691.5,-4016.74 691.5,-4016.74 691.5,-4010.74 697.5,-4004.74 703.5,-4004.74 703.5,-4004.74 1057.5,-4004.74 1057.5,-4004.74 1063.5,-4004.74 1069.5,-4010.74 1069.5,-4016.74 1069.5,-4016.74 1069.5,-4086.74 1069.5,-4086.74 1069.5,-4092.74 1063.5,-4098.74 1057.5,-4098.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4062.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powerslide Turning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="880.5"
                        y="-4022.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="46995ef069361998ccf614c333fdc6e911c332b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M223.6,-5314.47C255.75,-5106.77 394.29,-4277.98 582,-4107.74 609.7,-4082.62 644.97,-4067.13 681.48,-4057.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="682.38,-4061.26 691.29,-4055.54 680.75,-4054.45 682.38,-4061.26"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Prediction"
                }}><GroupWrapper id="2fbce5d5cb08c9e3b5b28c5b2e122d00c7b59e01" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.69,-7145.6C1648.55,-7141.29 1704.03,-7126.41 1736.5,-7085.74 1753.04,-7065.01 1727.46,-3288.04 1744.5,-3267.74 1778.03,-3227.79 1829.38,-3209.65 1880.91,-3202.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1881.37,-3206.16 1890.87,-3201.48 1880.52,-3199.21 1881.37,-3206.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s dribbling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                    }, {
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }],

                    title: "Bounce Dribbling",
                    description: "Popping (Hitting the ball in a way where it allows the player to hit it again)  the ball multiple times in a row.",
                    rank: "P",
                    upstreamSkills: ["Prediction", "Push Dribbling"],
                    downstreamSkills: ["Bounce To Air Dribble", "Breezi Flick", "Tornado Flick / Spin"]
                }}><GroupWrapper id="51f309ad1c42858841f5b1dfdcaedd0c329ce3aa" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2218.5,-6165.74C2218.5,-6165.74 1900.5,-6165.74 1900.5,-6165.74 1894.5,-6165.74 1888.5,-6159.74 1888.5,-6153.74 1888.5,-6153.74 1888.5,-6083.74 1888.5,-6083.74 1888.5,-6077.74 1894.5,-6071.74 1900.5,-6071.74 1900.5,-6071.74 2218.5,-6071.74 2218.5,-6071.74 2224.5,-6071.74 2230.5,-6077.74 2230.5,-6083.74 2230.5,-6083.74 2230.5,-6153.74 2230.5,-6153.74 2230.5,-6159.74 2224.5,-6165.74 2218.5,-6165.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6129.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6089.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce Dribbling",
                    tailId: "Prediction"
                }}><GroupWrapper id="25ff9284b2b2c916982fddd803465d072ce906ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.53,-7145.48C1648.36,-7141.13 1703.85,-7126.27 1736.5,-7085.74 1749.19,-7069.99 1735.42,-6375.81 1744.5,-6357.74 1786.83,-6273.49 1874.38,-6210.76 1946.31,-6170.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1948.36,-6173.62 1955.45,-6165.74 1945,-6167.48 1948.36,-6173.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Catching",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Catching",
                    description: "Stopping and slowing the ball with a dribble when it hits the ground after being in the air.",
                    rank: "P",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Wall Catch"]
                }}><GroupWrapper id="2b9bcf7bbecd708379dfee8a9b9b2044a98476b3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2154.5,-6852.74C2154.5,-6852.74 1964.5,-6852.74 1964.5,-6852.74 1958.5,-6852.74 1952.5,-6846.74 1952.5,-6840.74 1952.5,-6840.74 1952.5,-6770.74 1952.5,-6770.74 1952.5,-6764.74 1958.5,-6758.74 1964.5,-6758.74 1964.5,-6758.74 2154.5,-6758.74 2154.5,-6758.74 2160.5,-6758.74 2166.5,-6764.74 2166.5,-6770.74 2166.5,-6770.74 2166.5,-6840.74 2166.5,-6840.74 2166.5,-6846.74 2160.5,-6852.74 2154.5,-6852.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6816.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Catching"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6776.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Catching",
                    tailId: "Prediction"
                }}><GroupWrapper id="02d351bfa707895de9cc91d3f16b92318244efa6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.79,-7128.97C1643.08,-7120.74 1693.99,-7107.37 1736.5,-7085.74 1848.48,-7028.76 1953.42,-6924.37 2011.5,-6860.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2014.25,-6862.59 2018.34,-6852.82 2009.05,-6857.9 2014.25,-6862.59"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cutting",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Cutting",
                    description: "When an opponent is dribbling (keeping the ball close to oneself), the player comes at an angle to the dribble and forces it out of the opponent's possession.",
                    rank: "P",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="750fe6eb4a39e4f1fd5ae30f1e7e0384a489c056" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2154.5,-6460.74C2154.5,-6460.74 1964.5,-6460.74 1964.5,-6460.74 1958.5,-6460.74 1952.5,-6454.74 1952.5,-6448.74 1952.5,-6448.74 1952.5,-6378.74 1952.5,-6378.74 1952.5,-6372.74 1958.5,-6366.74 1964.5,-6366.74 1964.5,-6366.74 2154.5,-6366.74 2154.5,-6366.74 2160.5,-6366.74 2166.5,-6372.74 2166.5,-6378.74 2166.5,-6378.74 2166.5,-6448.74 2166.5,-6448.74 2166.5,-6454.74 2160.5,-6460.74 2154.5,-6460.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6424.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Cutting"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-6384.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cutting",
                    tailId: "Prediction"
                }}><GroupWrapper id="7a0bd30db6e0621af48c9cc65ab6295c941fb508" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.81,-7145.42C1648.55,-7141.04 1703.88,-7126.15 1736.5,-7085.74 1758,-7059.1 1722.36,-6495.83 1744.5,-6469.74 1791.7,-6414.11 1873.47,-6400.91 1941.74,-6401.19"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.09,-6404.7 1952.14,-6401.34 1942.19,-6397.7 1942.09,-6404.7"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Pre-Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Pre-Jumping",
                    description: "Jumping in expectation of an opponents shot, clear, or save.",
                    rank: "D",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Dunking"]
                }}><GroupWrapper id="31b1c68d0c763bd78d74aa80fa015f89ca816635" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2172.5,-3818.74C2172.5,-3818.74 1946.5,-3818.74 1946.5,-3818.74 1940.5,-3818.74 1934.5,-3812.74 1934.5,-3806.74 1934.5,-3806.74 1934.5,-3736.74 1934.5,-3736.74 1934.5,-3730.74 1940.5,-3724.74 1946.5,-3724.74 1946.5,-3724.74 2172.5,-3724.74 2172.5,-3724.74 2178.5,-3724.74 2184.5,-3730.74 2184.5,-3736.74 2184.5,-3736.74 2184.5,-3806.74 2184.5,-3806.74 2184.5,-3812.74 2178.5,-3818.74 2172.5,-3818.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3782.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Pre-Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3742.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Pre-Jumping",
                    tailId: "Prediction"
                }}><GroupWrapper id="d4e13a0daae87bc7082db04fd54cc27db9a4a959" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.68,-7145.59C1648.54,-7141.28 1704.02,-7126.41 1736.5,-7085.74 1750.62,-7068.06 1729.95,-3845.06 1744.5,-3827.74 1787.51,-3776.51 1859.83,-3761.16 1924.24,-3759.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1924.57,-3762.72 1934.5,-3759.03 1924.43,-3755.72 1924.57,-3762.72"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Faking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Faking",
                    description: "Being able to predict a opponent's movements and stop yours in reaction to that prediction.",
                    rank: "D",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="cb7144819d80f8b5b3a7e0d5f75f4e1a9642b668" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2153.5,-4042.74C2153.5,-4042.74 1965.5,-4042.74 1965.5,-4042.74 1959.5,-4042.74 1953.5,-4036.74 1953.5,-4030.74 1953.5,-4030.74 1953.5,-3960.74 1953.5,-3960.74 1953.5,-3954.74 1959.5,-3948.74 1965.5,-3948.74 1965.5,-3948.74 2153.5,-3948.74 2153.5,-3948.74 2159.5,-3948.74 2165.5,-3954.74 2165.5,-3960.74 2165.5,-3960.74 2165.5,-4030.74 2165.5,-4030.74 2165.5,-4036.74 2159.5,-4042.74 2153.5,-4042.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-4006.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Faking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3966.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Faking",
                    tailId: "Prediction"
                }}><GroupWrapper id="9cb42e435c1a2484a1d90b27ada123b31d29ed07" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.66,-7145.58C1648.52,-7141.26 1704,-7126.39 1736.5,-7085.74 1746.56,-7073.15 1741.37,-4781.54 1744.5,-4765.74 1800.2,-4484.22 1958.71,-4175.65 2026.79,-4051.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2029.97,-4053.26 2031.73,-4042.81 2023.84,-4049.87 2029.97,-4053.26"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound Shots",
                    tailId: "Prediction"
                }}><GroupWrapper id="ff7e355a49be49c6d7fbe66453221f9721048775" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.66,-7145.57C1648.51,-7141.26 1704,-7126.38 1736.5,-7085.74 1745.46,-7074.52 1740.51,-5032.52 1744.5,-5018.74 1885.32,-4531.72 2208.29,-4538.63 2349.5,-4051.74 2355.13,-4032.31 2344.11,-2610.89 2357.5,-2595.74 2423.98,-2520.53 2537.54,-2508.14 2631.69,-2513.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2631.69,-2517.22 2641.9,-2514.39 2632.16,-2510.23 2631.69,-2517.22"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Softblock",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Ytzi13 Lead offence 3v3 guide",
                        url: "https://www.reddit.com/r/RocketLeague/comments/ab9490/playing_the_first_man_role_a_guide_for_all_skill/?st=JQFHERHK&sh=9ac03a3b"
                    }],

                    title: "Softblock",
                    description: "Blocking the ball after an opponent shot with the wheels to slow the ball down.",
                    rank: "D",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="69add1126959a35c36aa060f4a758a5e3ff23617" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2153.5,-3930.74C2153.5,-3930.74 1965.5,-3930.74 1965.5,-3930.74 1959.5,-3930.74 1953.5,-3924.74 1953.5,-3918.74 1953.5,-3918.74 1953.5,-3848.74 1953.5,-3848.74 1953.5,-3842.74 1959.5,-3836.74 1965.5,-3836.74 1965.5,-3836.74 2153.5,-3836.74 2153.5,-3836.74 2159.5,-3836.74 2165.5,-3842.74 2165.5,-3848.74 2165.5,-3848.74 2165.5,-3918.74 2165.5,-3918.74 2165.5,-3924.74 2159.5,-3930.74 2153.5,-3930.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3894.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Softblock"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3854.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Softblock",
                    tailId: "Prediction"
                }}><GroupWrapper id="6653f1c7ab683566a092a4bb4dd44dbc5b5e38d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.68,-7145.59C1648.54,-7141.28 1704.02,-7126.4 1736.5,-7085.74 1750.13,-7068.66 1730.45,-3956.47 1744.5,-3939.74 1791.84,-3883.35 1874.71,-3870.43 1943.43,-3871.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.4,-3874.53 1953.46,-3871.22 1943.53,-3867.53 1943.4,-3874.53"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Prediction"
                }}><GroupWrapper id="6bc6bf6f6cd4304d059809f4565e825bab3d5f13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1384.3,-7162.56C1289.3,-7174.39 1162.59,-7171.39 1142.5,-7076.74 1138.33,-7057.1 1138.33,-1314.37 1142.5,-1294.74 1161.33,-1206.03 1273.8,-1197.82 1366.06,-1206.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1365.74,-1210.36 1376.06,-1207.93 1366.48,-1203.4 1365.74,-1210.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce To Air Dribble",
                    tailId: "Bounce Dribbling"
                }}><GroupWrapper id="d45b299b709f9408d39d03f1884382e61e4de3ca" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2073.92,-6071.73C2121.8,-5901.58 2284.87,-5301.14 2349.5,-4793.74 2355.32,-4748.07 2342.34,-4630.2 2357.5,-4586.74 2436.45,-4360.3 2633.96,-4146.85 2732.58,-4050.06"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2735.08,-4052.51 2739.79,-4043.02 2730.19,-4047.5 2735.08,-4052.51"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Breezi Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "NeXL Breezi Flick Tutorial",
                        url: "https://www.youtube.com/watch?v=WZu8wYja770"
                    }],

                    title: "Breezi Flick",
                    description: "An advanced version of the tornado spin, musty flick, and hood dribbling all combined into one shot.",
                    rank: "GC",
                    upstreamSkills: ["Bounce Dribbling", "Tornado Spin"],
                    downstreamSkills: []
                }}><GroupWrapper id="78c633192e33640847f65ab13614156fc4721a49" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3761,-5832.74C3761,-5832.74 3546,-5832.74 3546,-5832.74 3540,-5832.74 3534,-5826.74 3534,-5820.74 3534,-5820.74 3534,-5750.74 3534,-5750.74 3534,-5744.74 3540,-5738.74 3546,-5738.74 3546,-5738.74 3761,-5738.74 3761,-5738.74 3767,-5738.74 3773,-5744.74 3773,-5750.74 3773,-5750.74 3773,-5820.74 3773,-5820.74 3773,-5826.74 3767,-5832.74 3761,-5832.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5796.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Breezi Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5756.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Bounce Dribbling"
                }}><GroupWrapper id="fb4f1e35611bf41dd58232168d484930c1601ee6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2223.41,-6165.79C2454.85,-6223.94 2888.16,-6300.36 3225.5,-6170.74 3398.98,-6104.08 3545.98,-5930.73 3613.26,-5841.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3616.15,-5843.11 3619.32,-5833 3610.54,-5838.93 3616.15,-5843.11"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tornado Flick / Spin",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Mertzy’s Tornado Flick Tutorial.",
                        url: "https://www.youtube.com/watch?v=On02SxAppfY"
                    }, "Mertzy’s custom training code, 59D5-1411-36A2-8B76."],

                    title: "Tornado Flick / Spin",
                    description: "A mix of the tornado spin, upside down aerials, and bounce dribbling.",
                    rank: "GC",
                    upstreamSkills: ["Bounce Dribbling", "Tornado Spin"],
                    downstreamSkills: []
                }}><GroupWrapper id="58c831a400d054a656225db6965364b2dbd9ba76" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3836.5,-5608.74C3836.5,-5608.74 3470.5,-5608.74 3470.5,-5608.74 3464.5,-5608.74 3458.5,-5602.74 3458.5,-5596.74 3458.5,-5596.74 3458.5,-5526.74 3458.5,-5526.74 3458.5,-5520.74 3464.5,-5514.74 3470.5,-5514.74 3470.5,-5514.74 3836.5,-5514.74 3836.5,-5514.74 3842.5,-5514.74 3848.5,-5520.74 3848.5,-5526.74 3848.5,-5526.74 3848.5,-5596.74 3848.5,-5596.74 3848.5,-5602.74 3842.5,-5608.74 3836.5,-5608.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5572.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tornado Flick / Spin"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5532.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Bounce Dribbling"
                }}><GroupWrapper id="f103ea8610da07e02c9113437104c05908058430" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2230.58,-6127.93C2537.13,-6142.67 3157.04,-6163.46 3225.5,-6094.74 3244.21,-6075.96 3215.88,-5637.53 3233.5,-5617.74 3286.5,-5558.2 3369.94,-5539.1 3448.45,-5536.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3448.57,-5540.34 3458.5,-5536.64 3448.43,-5533.34 3448.57,-5540.34"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Dribbling",
                    tailId: "Push Dribbling"
                }}><GroupWrapper id="5032be6e6cb9c81c8a5c4fe3602528ac5f7c09be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1639.62,-1791.96C1676.75,-1800.08 1712.76,-1816.02 1736.5,-1845.74 1748.31,-1860.52 1742.58,-4551.91 1744.5,-4570.74 1804.67,-5161.29 1987.6,-5859.96 2042.66,-6061.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2039.32,-6062.71 2045.33,-6071.44 2046.07,-6060.87 2039.32,-6062.71"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hood Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers Dribbling Tutorial.",
                        url: "https://www.youtube.com/watch?v=eBmgRPOmh98"
                    }],

                    title: "Hood Dribble",
                    description: "Being able to keep the ball on the top of the players car. Normally just called dribbling.",
                    rank: "P",
                    upstreamSkills: ["Push Dribbling"],
                    downstreamSkills: ["Directional Flick", "Hood To Air Dribble", "Power Slide Dribble"]
                }}><GroupWrapper id="d7bcd104811a2443bfe647266482e6bef3bf7c9d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.5,-7748.74C1613.5,-7748.74 1369.5,-7748.74 1369.5,-7748.74 1363.5,-7748.74 1357.5,-7742.74 1357.5,-7736.74 1357.5,-7736.74 1357.5,-7666.74 1357.5,-7666.74 1357.5,-7660.74 1363.5,-7654.74 1369.5,-7654.74 1369.5,-7654.74 1613.5,-7654.74 1613.5,-7654.74 1619.5,-7654.74 1625.5,-7660.74 1625.5,-7666.74 1625.5,-7666.74 1625.5,-7736.74 1625.5,-7736.74 1625.5,-7742.74 1619.5,-7748.74 1613.5,-7748.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7712.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hood Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-7672.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hood Dribble",
                    tailId: "Push Dribbling"
                }}><GroupWrapper id="ad3c6bee2936cf4eef999e38aad5ed0c3494bb67" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1343.36,-1765.05C1256.24,-1759.67 1159.8,-1773.19 1142.5,-1854.74 1138.33,-1874.37 1138.33,-7617.1 1142.5,-7636.74 1160.06,-7719.46 1259.05,-7732.18 1347.14,-7726.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1347.57,-7729.65 1357.28,-7725.4 1347.04,-7722.67 1347.57,-7729.65"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Turtle Dribbling",
                    description: "A type of push dribble, where the player is turtling while dribbling.",
                    rank: "GC",
                    upstreamSkills: ["Push Dribbling", "Turtling"],
                    downstreamSkills: ["Turtle To Air Dribble"]
                }}><GroupWrapper id="0a0ec5499fd29060e4849605f069cc89d07aebab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3800,-5160.74C3800,-5160.74 3507,-5160.74 3507,-5160.74 3501,-5160.74 3495,-5154.74 3495,-5148.74 3495,-5148.74 3495,-5078.74 3495,-5078.74 3495,-5072.74 3501,-5066.74 3507,-5066.74 3507,-5066.74 3800,-5066.74 3800,-5066.74 3806,-5066.74 3812,-5072.74 3812,-5078.74 3812,-5078.74 3812,-5148.74 3812,-5148.74 3812,-5154.74 3806,-5160.74 3800,-5160.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5124.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5084.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Push Dribbling"
                }}><GroupWrapper id="354cac540e959cdf39d2fc3bcfc6617355463040" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1639.61,-1791.97C1676.74,-1800.09 1712.76,-1816.03 1736.5,-1845.74 1757.21,-1871.64 1729.13,-4204.35 1744.5,-4233.74 1896.58,-4524.45 2196.87,-4366.3 2349.5,-4656.74 2356.79,-4670.6 2346.38,-5773.7 2357.5,-5784.74 2494.38,-5920.64 3088.22,-5920.24 3225.5,-5784.74 3237.66,-5772.73 3222.16,-5182.52 3233.5,-5169.74 3294.69,-5100.74 3396.76,-5085.98 3484.83,-5088.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3484.82,-5092.35 3494.95,-5089.25 3485.1,-5085.35 3484.82,-5092.35"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Tornado Spin"
                }}><GroupWrapper id="db180d78160b9ed6066926b0f3827e2169d93e6d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3640.33,-2474.8C3578.07,-2700.03 3312.87,-3691.17 3229.5,-4523.74 3226.19,-4556.82 3222.6,-5688.21 3229.5,-5720.74 3253.82,-5835.32 3408.32,-5833.64 3523.84,-5815.3"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3524.54,-5818.74 3533.84,-5813.66 3523.41,-5811.83 3524.54,-5818.74"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Tornado Spin"
                }}><GroupWrapper id="f656724a7469b151dfe53f45b08d3698dcee3871" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3640.33,-2474.8C3578.07,-2700.03 3312.87,-3691.17 3229.5,-4523.74 3226.81,-4550.63 3223.89,-5470.3 3229.5,-5496.74 3248.76,-5587.5 3349.71,-5605.31 3448.27,-5599.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3448.66,-5603.16 3458.41,-5599.02 3448.21,-5596.18 3448.66,-5603.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Spin",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="d169f5dc9c7d662a43bb2f3831bc47740fac8471" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1067.05,-4266.97C1094.71,-4257.46 1120.07,-4242.57 1138.5,-4219.74 1156.64,-4197.27 1126.06,-82.13 1146.5,-61.74 1241.11,32.69 2234.42,6.26 2349.5,-61.74 3272.12,-606.91 3585.87,-2064.2 3642.58,-2370.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3639.17,-2371.47 3644.41,-2380.68 3646.05,-2370.21 3639.17,-2371.47"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bunny Hopping",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Shippotv’s bunny hop tutorial.",
                        url: "https://www.youtube.com/watch?v=p2PkJ3OyjXU"
                    }],

                    title: "Bunny Hopping",
                    description: "An advanced version of wave dashing but, when landing holding air roll when flipping allowing for wave dashing in faster succession.",
                    rank: "SSL",
                    upstreamSkills: ["Directional Air Roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="50cdd25dfdc6c01eedc6f657bfb2724993242682" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4524,-6201.74C4524,-6201.74 4240,-6201.74 4240,-6201.74 4234,-6201.74 4228,-6195.74 4228,-6189.74 4228,-6189.74 4228,-6119.74 4228,-6119.74 4228,-6113.74 4234,-6107.74 4240,-6107.74 4240,-6107.74 4524,-6107.74 4524,-6107.74 4530,-6107.74 4536,-6113.74 4536,-6119.74 4536,-6119.74 4536,-6189.74 4536,-6189.74 4536,-6195.74 4530,-6201.74 4524,-6201.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-6165.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bunny Hopping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-6125.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bunny Hopping",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="b25ec0b53e48d510ed1790240c9705038e76cd1f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1067.48,-4242.99C1290.53,-4208.56 1645.78,-4170.77 1736.5,-4260.74 1755.36,-4279.43 1726.24,-5197.45 1744.5,-5216.74 1837.13,-5314.54 2256.9,-5156.9 2349.5,-5254.74 2369.17,-5275.52 2337.19,-6264.58 2357.5,-6284.74 2391.34,-6318.31 4038.03,-6316.58 4073.5,-6284.74 4085.81,-6273.69 4070.26,-6222.87 4081.5,-6210.74 4116.28,-6173.16 4167.58,-6155.99 4217.93,-6149.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4218.48,-6152.63 4227.99,-6147.95 4217.63,-6145.68 4218.48,-6152.63"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Speed Flipping",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="93f722ba09d46bb81fdcdf60f35f15f86e084b93" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1067.25,-4266.77C1094.8,-4257.26 1120.07,-4242.42 1138.5,-4219.74 1155.73,-4198.52 1128.96,-3256.7 1146.5,-3235.74 1317.67,-3031.05 1556.26,-3321.48 1736.5,-3124.74 1748.72,-3111.4 1732.22,-3057.01 1744.5,-3043.74 1783.69,-3001.36 1843.03,-2984.21 1899.61,-2978.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1900.09,-2982.24 1909.77,-2977.91 1899.51,-2975.26 1900.09,-2982.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Stalling",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Squishy Muffinz stalling  tutorial",
                        url: "https://www.youtube.com/watch?v=jASrhGw4QYU"
                    }, {
                        text: "Kronovi’s stalling tutorial.",
                        url: "https://www.youtube.com/watch?v=xokXElyi1zo"
                    }],

                    title: "Stalling",
                    description: "Using the air roll left button to cancel a flip.",
                    rank: "D",
                    upstreamSkills: ["Directional Air Roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9f7b99a1949e67ad3915822fb4c785629eab00c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2153.5,-2698.74C2153.5,-2698.74 1965.5,-2698.74 1965.5,-2698.74 1959.5,-2698.74 1953.5,-2692.74 1953.5,-2686.74 1953.5,-2686.74 1953.5,-2616.74 1953.5,-2616.74 1953.5,-2610.74 1959.5,-2604.74 1965.5,-2604.74 1965.5,-2604.74 2153.5,-2604.74 2153.5,-2604.74 2159.5,-2604.74 2165.5,-2610.74 2165.5,-2616.74 2165.5,-2616.74 2165.5,-2686.74 2165.5,-2686.74 2165.5,-2692.74 2159.5,-2698.74 2153.5,-2698.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2662.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Stalling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-2622.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Stalling",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="6c47eba18d52c2cf0b07ce91b29347297c54bcb0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1067.26,-4266.78C1094.81,-4257.27 1120.08,-4242.43 1138.5,-4219.74 1157.49,-4196.33 1125.99,-3156.82 1146.5,-3134.74 1236.02,-3038.35 1646.32,-3182.5 1736.5,-3086.74 1750.94,-3071.4 1730.81,-2723.74 1744.5,-2707.74 1792.28,-2651.89 1874.91,-2638.9 1943.42,-2639.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.37,-2642.84 1953.42,-2639.49 1943.48,-2635.84 1943.37,-2642.84"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Catch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s dribbling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                    }],

                    title: "Wall Catch",
                    description: "Stopping or slowing the ball on the wall by dribbling.",
                    rank: "D",
                    upstreamSkills: ["Catching", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95374b66691729713bdc144b215e2dfea7db01" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2157,-3594.74C2157,-3594.74 1962,-3594.74 1962,-3594.74 1956,-3594.74 1950,-3588.74 1950,-3582.74 1950,-3582.74 1950,-3512.74 1950,-3512.74 1950,-3506.74 1956,-3500.74 1962,-3500.74 1962,-3500.74 2157,-3500.74 2157,-3500.74 2163,-3500.74 2169,-3506.74 2169,-3512.74 2169,-3512.74 2169,-3582.74 2169,-3582.74 2169,-3588.74 2163,-3594.74 2157,-3594.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3558.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Catch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3518.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Catch",
                    tailId: "Catching"
                }}><GroupWrapper id="7c52fe6e101ea53ee24c5e2a71e8664d65463a1d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1952.12,-6770.91C1868.06,-6736.27 1761.89,-6673.53 1740.5,-6572.74 1736.23,-6552.63 1736.23,-3632.84 1740.5,-3612.74 1757.41,-3533.04 1856.41,-3522.48 1939.7,-3528.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1939.52,-3531.97 1949.77,-3529.28 1940.08,-3524.99 1939.52,-3531.97"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Driving",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Wall Driving",
                    description: "Keeping the car pointed within 90 degrees of 'straight up' for better wall control",
                    rank: "S",
                    upstreamSkills: ["Positioning", "Wall Driving"],

                    downstreamSkills: [
                        "Ceiling Shots",
                        "Ceiling Shuffle",
                        "Doomsee Dish",
                        "Wall Catch",
                        "Wall Clears",
                        "Wall Driving"
                    ]
                }}><GroupWrapper id="b1e98bfb4fd2b072fa60bfb557107a03abc8d8f9" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1603,-4898.74C1603,-4898.74 1380,-4898.74 1380,-4898.74 1374,-4898.74 1368,-4892.74 1368,-4886.74 1368,-4886.74 1368,-4816.74 1368,-4816.74 1368,-4810.74 1374,-4804.74 1380,-4804.74 1380,-4804.74 1603,-4804.74 1603,-4804.74 1609,-4804.74 1615,-4810.74 1615,-4816.74 1615,-4816.74 1615,-4886.74 1615,-4886.74 1615,-4892.74 1609,-4898.74 1603,-4898.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-4862.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Driving"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-4822.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Driving",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="08bd1bee76e24c25c70e36a826825fcfb0d504d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1387.87,-4898.77C1397.6,-4909.16 1432.15,-4916.74 1491.5,-4916.74 1539.26,-4916.74 1570.96,-4911.83 1586.59,-4904.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1588.78,-4907.25 1595.13,-4898.77 1584.88,-4901.44 1588.78,-4907.25"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling Shots",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="b526eb787420a90d5e9064d57cb6771ec8a2d3e4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1615.25,-4898.21C1831.58,-4982.87 2265.82,-5166.07 2349.5,-5302.74 2358.78,-5317.9 2344.85,-5930.24 2357.5,-5942.74 2494.74,-6078.27 3088.12,-6078.13 3225.5,-5942.74 3247.23,-5921.32 3213.24,-5416.54 3233.5,-5393.74 3300.74,-5318.03 3417.21,-5307.66 3510.31,-5314.19"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3510.15,-5317.69 3520.39,-5314.97 3510.69,-5310.71 3510.15,-5317.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling Shuffle",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Mondo’s ceiling shuffle tutorial.",
                        url: "https://www.youtube.com/watch?v=bnNrwTKuh3c"
                    }],

                    title: "Ceiling Shuffle",
                    description: "Having the car stay on the ceiling by turning in a way that keeps enough friction that it doesn’t fall.",
                    rank: "SSL",
                    upstreamSkills: ["Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="7bd330abe62856d16b531c4d8d1a133ff917a049" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4516,-6313.74C4516,-6313.74 4248,-6313.74 4248,-6313.74 4242,-6313.74 4236,-6307.74 4236,-6301.74 4236,-6301.74 4236,-6231.74 4236,-6231.74 4236,-6225.74 4242,-6219.74 4248,-6219.74 4248,-6219.74 4516,-6219.74 4516,-6219.74 4522,-6219.74 4528,-6225.74 4528,-6231.74 4528,-6231.74 4528,-6301.74 4528,-6301.74 4528,-6307.74 4522,-6313.74 4516,-6313.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-6277.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ceiling Shuffle"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-6237.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling Shuffle",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="513360333e08802f82692a009e06831324cc2f93" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1615.24,-4898.24C1661.52,-4922.37 1709.46,-4956.82 1736.5,-5003.74 1750.43,-5027.91 1727.26,-5232.79 1744.5,-5254.74 1916.9,-5474.18 2179.64,-5201.32 2349.5,-5422.74 2364.72,-5442.57 2339.74,-6305.14 2357.5,-6322.74 2886.52,-6847.07 3926.54,-6464.83 4268.84,-6317.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4270.23,-6320.94 4278.03,-6313.77 4267.46,-6314.51 4270.23,-6320.94"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee Dish",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="646243164902550e338f7d6f297985e621094eab" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1615.2,-4862.13C1853.89,-4882.36 2380.02,-4926.95 2639.6,-4948.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2639.6,-4952.46 2649.86,-4949.82 2640.19,-4945.48 2639.6,-4952.46"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Catch",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="486f1255898ee3ebeca05042837d42dd0f36476a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1615.3,-4837.66C1660.99,-4825.8 1708.5,-4804.15 1736.5,-4764.74 1755.18,-4738.44 1723.71,-3628.39 1744.5,-3603.74 1791.02,-3548.57 1871.54,-3535.06 1939.39,-3535.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1939.7,-3538.59 1949.73,-3535.19 1939.77,-3531.59 1939.7,-3538.59"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="15ff7ec5d2b6bede189461464370309e803249f3" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1367.87,-4863.47C1275.44,-4864.58 1161.81,-4846.71 1142.5,-4755.74 1137.51,-4732.22 1137.51,-1318.25 1142.5,-1294.74 1161.33,-1206.03 1273.8,-1197.82 1366.06,-1206.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1365.74,-1210.36 1376.06,-1207.93 1366.48,-1203.4 1365.74,-1210.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Chip Shot",
                    tailId: "Chipping"
                }}><GroupWrapper id="d8f1650af60a2b10741bdafd631f14f607a80927" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.3,-5065.52C1042.01,-5062.19 1103.07,-5047.61 1138.5,-5003.74 1153.26,-4985.46 1131.26,-1639.61 1146.5,-1621.74 1201.16,-1557.61 1298.13,-1546.68 1375.22,-1550.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1375.31,-1553.55 1385.48,-1550.58 1375.67,-1546.56 1375.31,-1553.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chip Clear",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip Clear",
                    description: "Using boost to make a strong clear with a chip",
                    rank: "S",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="ff959054bde4eddf18877d82e1437b395d710be3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1588.5,-5106.74C1588.5,-5106.74 1394.5,-5106.74 1394.5,-5106.74 1388.5,-5106.74 1382.5,-5100.74 1382.5,-5094.74 1382.5,-5094.74 1382.5,-5024.74 1382.5,-5024.74 1382.5,-5018.74 1388.5,-5012.74 1394.5,-5012.74 1394.5,-5012.74 1588.5,-5012.74 1588.5,-5012.74 1594.5,-5012.74 1600.5,-5018.74 1600.5,-5024.74 1600.5,-5024.74 1600.5,-5094.74 1600.5,-5094.74 1600.5,-5100.74 1594.5,-5106.74 1588.5,-5106.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5070.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Clear"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5030.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chip Clear",
                    tailId: "Chipping"
                }}><GroupWrapper id="76285d63c4bbe1f8272f2ffb3ec148fdaa141305" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.28,-5059.74C1095.62,-5059.74 1260.73,-5059.74 1372.04,-5059.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1372.31,-5063.24 1382.31,-5059.74 1372.31,-5056.24 1372.31,-5063.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chip Double Touch",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip Double Touch",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="28842baf84efc063b7718a83fa125785181da5c2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1664,-6964.74C1664,-6964.74 1319,-6964.74 1319,-6964.74 1313,-6964.74 1307,-6958.74 1307,-6952.74 1307,-6952.74 1307,-6882.74 1307,-6882.74 1307,-6876.74 1313,-6870.74 1319,-6870.74 1319,-6870.74 1664,-6870.74 1664,-6870.74 1670,-6870.74 1676,-6876.74 1676,-6882.74 1676,-6882.74 1676,-6952.74 1676,-6952.74 1676,-6958.74 1670,-6964.74 1664,-6964.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6928.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Double Touch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6888.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chip Double Touch",
                    tailId: "Chipping"
                }}><GroupWrapper id="d4d5bcdf8e567d985a0abaf5e8d1c9f757de5c1f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M988.18,-5093.42C1043.46,-5116.91 1106.04,-5154.33 1138.5,-5210.74 1149.94,-5230.61 1131.6,-6844.3 1146.5,-6861.74 1183.58,-6905.13 1240.05,-6924.15 1296.58,-6930.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1296.44,-6934.37 1306.75,-6931.94 1297.18,-6927.4 1296.44,-6934.37"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Clears"
                }}><GroupWrapper id="9372c9871c316b2392dced29667eb5241f626dc0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M469.54,-5856.96C482.24,-6086.26 570.17,-7090.59 1146.5,-7533.74 1173.02,-7554.13 1204.14,-7568.32 1236.62,-7578.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1235.7,-7581.43 1246.28,-7580.8 1237.62,-7574.69 1235.7,-7581.43"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Mognus Flick (180 Backflip Flick)",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Jonniboi_i's mognus flick only 1v1 video.",
                        url: "https://www.youtube.com/watch?v=QXUo6bARX1Y"
                    }, "When the player goes for a shot but turns their car more than 360* to hit the ball.", {
                        text: "Sir Timbers freestyle tutorial.",
                        url: "https://www.youtube.com/watch?v=AY1K5Z1OSEI"
                    }, {
                        text: "Kevpert freestyle tutorial",
                        url: "https://www.youtube.com/watch?v=eAO1sqr135c"
                    }, {
                        text: ".",
                        url: "https://www.youtube.com/watch?v=eAO1sqr135c"
                    }, {
                        text: "Jhzer’s freestyle tutorial.",
                        url: "https://www.youtube.com/watch?v=K1EqEm33jT0"
                    }],

                    title: "Mognus Flick (180 Backflip Flick)",
                    description: "After popping the ball into the air with a hood dribble. The player spins around (180) then backflips into the ball, causing power and some delay to the ball. Also known as the 180 backflip flick.",
                    rank: "GC",
                    upstreamSkills: ["Delayed Flicks"],
                    downstreamSkills: []
                }}><GroupWrapper id="c5da4d98b0e488f670d4dbb0ee2343896701af00" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3961.5,-5272.74C3961.5,-5272.74 3345.5,-5272.74 3345.5,-5272.74 3339.5,-5272.74 3333.5,-5266.74 3333.5,-5260.74 3333.5,-5260.74 3333.5,-5190.74 3333.5,-5190.74 3333.5,-5184.74 3339.5,-5178.74 3345.5,-5178.74 3345.5,-5178.74 3961.5,-5178.74 3961.5,-5178.74 3967.5,-5178.74 3973.5,-5184.74 3973.5,-5190.74 3973.5,-5190.74 3973.5,-5260.74 3973.5,-5260.74 3973.5,-5266.74 3967.5,-5272.74 3961.5,-5272.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5236.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Mognus Flick (180 Backflip Flick)"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5196.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Mognus Flick (180 Backflip Flick)",
                    tailId: "Delayed Flicks"
                }}><GroupWrapper id="cda66c9a9cd8bddb5195e38bc6f4676ac05c5f0a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2936.13,-5658.27C3032.63,-5665.77 3154.69,-5656.13 3225.5,-5577.74 3247.55,-5553.32 3211.5,-5306.2 3233.5,-5281.74 3258.23,-5254.24 3289.46,-5235.4 3323.66,-5222.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3325.08,-5226.08 3333.39,-5219.5 3322.79,-5219.47 3325.08,-5226.08"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Hood Dribble"
                }}><GroupWrapper id="77db32b2913a32a0165710dde8ce61a445cddb82" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1625.56,-7701.74C1703.51,-7701.74 1802.81,-7701.74 1886.64,-7701.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1886.79,-7705.24 1896.79,-7701.74 1886.79,-7698.24 1886.79,-7705.24"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hood To Air Dribble",
                    tailId: "Hood Dribble"
                }}><GroupWrapper id="2006738620e0ba3d9030fdc784a4f353f52b5f97" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1625.57,-7702.2C1667.48,-7695.17 1709.77,-7679.17 1736.5,-7645.74 1755.36,-7622.14 1725.2,-5493.98 1744.5,-5470.74 1945.5,-5228.66 2344.46,-5232.73 2587.38,-5262.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2587.04,-5265.65 2597.4,-5263.41 2587.9,-5258.7 2587.04,-5265.65"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Power Slide Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s dribbling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                    }],

                    title: "Power Slide Dribble",
                    description: "While hood dribbling, start to have the ball turn but, drift back into the ball for a fake.",
                    rank: "C",
                    upstreamSkills: ["Hood Dribble", "Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9cae66b7d691f1ffdcd0d4bd94e7a9313f8dfad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2972.5,-5456.74C2972.5,-5456.74 2610.5,-5456.74 2610.5,-5456.74 2604.5,-5456.74 2598.5,-5450.74 2598.5,-5444.74 2598.5,-5444.74 2598.5,-5374.74 2598.5,-5374.74 2598.5,-5368.74 2604.5,-5362.74 2610.5,-5362.74 2610.5,-5362.74 2972.5,-5362.74 2972.5,-5362.74 2978.5,-5362.74 2984.5,-5368.74 2984.5,-5374.74 2984.5,-5374.74 2984.5,-5444.74 2984.5,-5444.74 2984.5,-5450.74 2978.5,-5456.74 2972.5,-5456.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5420.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Power Slide Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5380.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Hood Dribble"
                }}><GroupWrapper id="a0e0a42ee00406d304ea812563a18cb812da0632" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1625.55,-7702.18C1667.45,-7695.15 1709.74,-7679.15 1736.5,-7645.74 1750.24,-7628.57 1735.9,-6082.97 1744.5,-6062.74 1893.24,-5712.73 2015.13,-5631.29 2357.5,-5465.74 2428.28,-5431.51 2512.78,-5415.83 2588.27,-5409.28"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2588.7,-5412.75 2598.38,-5408.45 2588.13,-5405.78 2588.7,-5412.75"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Doinking"
                }}><GroupWrapper id="f74ec4708b4af8a62b07acaf86411af898938406" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1597.73,-1449.8C1647.83,-1454.01 1703.81,-1468.82 1736.5,-1509.74 1747.93,-1524.04 1732.46,-4132.94 1744.5,-4146.74 1963.05,-4397.02 3004.62,-4104.49 3225.5,-4352.74 3239.13,-4368.05 3219.83,-4706.45 3233.5,-4721.74 3305.69,-4802.43 3433.83,-4808.72 3529.45,-4799.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3529.89,-4803.03 3539.48,-4798.53 3529.18,-4796.07 3529.89,-4803.03"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Double Jump Aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="994586aba8272d1dc3f81d9c00b6b78f21d02dc4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M968.83,-5382.67C1028.81,-5344.98 1103.65,-5286.01 1138.5,-5210.74 1149.62,-5186.71 1129.33,-1417.89 1146.5,-1397.74 1180.51,-1357.82 1230.92,-1338.52 1282.73,-1330.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1283.35,-1333.88 1292.75,-1329.01 1282.36,-1326.95 1283.35,-1333.88"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Fast Aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="12304fae0feb3989019ca462f0635f51eddd0de4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1038.54,-5430.78C1076.82,-5439.03 1113.8,-5455.35 1138.5,-5485.74 1154.76,-5505.74 1129.72,-6394.17 1146.5,-6413.74 1198.05,-6473.83 1286.77,-6487.12 1361.2,-6485.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1361.7,-6489.24 1371.6,-6485.47 1361.51,-6482.25 1361.7,-6489.24"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ad02c4f7b05a024681bb92a2ed2e803bf46c649e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M968.75,-5382.63C1028.69,-5344.92 1103.51,-5285.94 1138.5,-5210.74 1146.61,-5193.31 1132.87,-3840.29 1146.5,-3826.74 1332.45,-3641.85 1549.27,-3643.15 1736.5,-3826.74 1752.65,-3842.57 1729.76,-4216.58 1744.5,-4233.74 1962.12,-4487.1 3006.01,-4237.99 3225.5,-4489.74 3242.45,-4509.18 3216.18,-4702.62 3233.5,-4721.74 3306.08,-4801.84 3433.84,-4808.3 3529.26,-4799.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3529.67,-4802.83 3539.27,-4798.34 3528.97,-4795.86 3529.67,-4802.83"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Dunking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Dunking",
                    description: "Jumping before an opponent's pop (Hitting the ball in a way where it allows the player to hit it again) to get the ball over their head and in the players possession.",
                    rank: "D",
                    upstreamSkills: ["Pre-Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1ce809bfee8fa8ad999a8fad944514ab2a193edd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2885.5,-3930.74C2885.5,-3930.74 2697.5,-3930.74 2697.5,-3930.74 2691.5,-3930.74 2685.5,-3924.74 2685.5,-3918.74 2685.5,-3918.74 2685.5,-3848.74 2685.5,-3848.74 2685.5,-3842.74 2691.5,-3836.74 2697.5,-3836.74 2697.5,-3836.74 2885.5,-3836.74 2885.5,-3836.74 2891.5,-3836.74 2897.5,-3842.74 2897.5,-3848.74 2897.5,-3848.74 2897.5,-3918.74 2897.5,-3918.74 2897.5,-3924.74 2891.5,-3930.74 2885.5,-3930.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3894.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Dunking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-3854.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Dunking",
                    tailId: "Pre-Jumping"
                }}><GroupWrapper id="624eb4431d3a01fbcda01962bb9606910f24d20b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2184.86,-3796.84C2237.93,-3807.12 2300.63,-3818.7 2357.5,-3827.74 2464.9,-3844.79 2587.92,-3860.32 2675.32,-3870.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2674.92,-3874.15 2685.26,-3871.85 2675.74,-3867.2 2674.92,-3874.15"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wavedash Kickoff",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s guide to kickoffs",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12642/take-your-rocket-league-gameplay-to-the-next-level-kickoffs"
                    }],

                    title: "Wavedash Kickoff",
                    description: "During the kickoff, the player wavedashes to gain speed.",
                    rank: "P",
                    upstreamSkills: ["Fast Kickoffs"],
                    downstreamSkills: []
                }}><GroupWrapper id="46cec1e55d05a6e20e991106ff55c5e0d10bbe29" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1652,-5620.74C1652,-5620.74 1331,-5620.74 1331,-5620.74 1325,-5620.74 1319,-5614.74 1319,-5608.74 1319,-5608.74 1319,-5538.74 1319,-5538.74 1319,-5532.74 1325,-5526.74 1331,-5526.74 1331,-5526.74 1652,-5526.74 1652,-5526.74 1658,-5526.74 1664,-5532.74 1664,-5538.74 1664,-5538.74 1664,-5608.74 1664,-5608.74 1664,-5614.74 1658,-5620.74 1652,-5620.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5584.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wavedash Kickoff"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5544.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wavedash Kickoff",
                    tailId: "Fast Kickoffs"
                }}><GroupWrapper id="67d9afd180d6e1f10cc6a76e7f00728105982e64" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1362.97,-646.58C1271.31,-638.01 1161.12,-647.01 1142.5,-734.74 1139.19,-750.32 1139.19,-5306.16 1142.5,-5321.74 1163.12,-5418.9 1256.4,-5483.1 1341.33,-5522.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1340.03,-5525.62 1350.58,-5526.56 1342.92,-5519.25 1340.03,-5525.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Half Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Half Flipping",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Flip Canceling"],
                    downstreamSkills: ["Forward Half Flipping"]
                }}><GroupWrapper id="2f486098ed6ca725946e7874897f547e93ca3e85" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1611,-6292.74C1611,-6292.74 1372,-6292.74 1372,-6292.74 1366,-6292.74 1360,-6286.74 1360,-6280.74 1360,-6280.74 1360,-6210.74 1360,-6210.74 1360,-6204.74 1366,-6198.74 1372,-6198.74 1372,-6198.74 1611,-6198.74 1611,-6198.74 1617,-6198.74 1623,-6204.74 1623,-6210.74 1623,-6210.74 1623,-6280.74 1623,-6280.74 1623,-6286.74 1617,-6292.74 1611,-6292.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6256.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Half Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6216.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Half Flipping",
                    tailId: "Flip Canceling"
                }}><GroupWrapper id="213e51184931850635d69bb0c3526abb9edae090" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1347.7,-1877.34C1259.47,-1871.24 1160.09,-1883.84 1142.5,-1966.74 1139.46,-1981.05 1139.46,-6166.42 1142.5,-6180.74 1160.21,-6264.19 1260.8,-6276.4 1349.46,-6270.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1349.97,-6273.48 1359.65,-6269.19 1349.41,-6266.5 1349.97,-6273.48"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip Resets",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Classy Flip Reset Tutorial.",
                        url: "https://www.youtube.com/watch?v=TFNzBRRda7k"
                    }, {
                        text: "Kronovi Ceiling shot & Flip reset tutorial.",
                        url: "https://www.youtube.com/watch?v=TbIqMoPTvEA&t=301s"
                    }, {
                        text: "FLuuMP flip reset tutorial.",
                        url: "https://www.youtube.com/watch?v=kDhYkOlXrxM&t=24s"
                    }],

                    title: "Flip Resets",
                    description: "Hitting anything with the bottom of the car on all of the wheels at once to reset the flip timer on the car. Mainly used for ceiling shots, flip resets can also be used with dribbling and redirects.",
                    rank: "GC",
                    upstreamSkills: ["Flip Window"],
                    downstreamSkills: []
                }}><GroupWrapper id="e7f376482ca72c1e9ac02a746b294f2841867fb0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3754,-4936.74C3754,-4936.74 3553,-4936.74 3553,-4936.74 3547,-4936.74 3541,-4930.74 3541,-4924.74 3541,-4924.74 3541,-4854.74 3541,-4854.74 3541,-4848.74 3547,-4842.74 3553,-4842.74 3553,-4842.74 3754,-4842.74 3754,-4842.74 3760,-4842.74 3766,-4848.74 3766,-4854.74 3766,-4854.74 3766,-4924.74 3766,-4924.74 3766,-4930.74 3760,-4936.74 3754,-4936.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4900.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Resets"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4860.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip Resets",
                    tailId: "Flip Window"
                }}><GroupWrapper id="b772f4fec96f62f3ed42b7425c8f3cbe794bb97f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1006.04,-4951.93C1054.95,-4946.56 1106.85,-4930.74 1138.5,-4891.74 1157.95,-4867.77 1124.6,-3802.48 1146.5,-3780.74 1332.59,-3595.98 1549.45,-3596.96 1736.5,-3780.74 1754.45,-3798.38 1728.12,-4214.62 1744.5,-4233.74 1961.86,-4487.32 3007.43,-4236.76 3225.5,-4489.74 3237.98,-4504.21 3220.74,-4819.5 3233.5,-4833.74 3306.11,-4914.77 3435.14,-4920.73 3530.89,-4911.39"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3531.35,-4914.86 3540.93,-4910.34 3530.62,-4907.9 3531.35,-4914.86"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rumble - UFO Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Likuru’s video on UFO shots.",
                        url: "https://www.youtube.com/watch?v=fI1Qry4LqKY"
                    }],

                    title: "Rumble - UFO Shots",
                    description: "When using spikes in rumble, the player spikes the ball with all four of their wheels, allowing for infinite flip resets.",
                    rank: "P",
                    upstreamSkills: ["Flip Window"],
                    downstreamSkills: []
                }}><GroupWrapper id="17075a55ee3dc99408922e99aa3b9d8397b11618" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1677,-6740.74C1677,-6740.74 1306,-6740.74 1306,-6740.74 1300,-6740.74 1294,-6734.74 1294,-6728.74 1294,-6728.74 1294,-6658.74 1294,-6658.74 1294,-6652.74 1300,-6646.74 1306,-6646.74 1306,-6646.74 1677,-6646.74 1677,-6646.74 1683,-6646.74 1689,-6652.74 1689,-6658.74 1689,-6658.74 1689,-6728.74 1689,-6728.74 1689,-6734.74 1683,-6740.74 1677,-6740.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6704.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rumble - UFO Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6664.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - UFO Shots",
                    tailId: "Flip Window"
                }}><GroupWrapper id="164fe1cfbd8d0a7fda8f667b20ac2890ccc0cd22" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1006.09,-4943.51C1055,-4948.87 1106.89,-4964.69 1138.5,-5003.74 1152.78,-5021.37 1131.76,-6620.48 1146.5,-6637.74 1180.75,-6677.82 1231.54,-6697.1 1283.64,-6705.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1283.34,-6708.59 1293.73,-6706.51 1284.31,-6701.66 1283.34,-6708.59"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Forward Half Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Forward Half Flipping",
                    description: "A back flip that is canceled when parallel with the ground. Then air roll to have the wheels hit the ground.",
                    rank: "D",
                    upstreamSkills: ["Half Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="0e0242c7d3c6a2b7ad2e3915291b850782e5b202" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2262.5,-3706.74C2262.5,-3706.74 1856.5,-3706.74 1856.5,-3706.74 1850.5,-3706.74 1844.5,-3700.74 1844.5,-3694.74 1844.5,-3694.74 1844.5,-3624.74 1844.5,-3624.74 1844.5,-3618.74 1850.5,-3612.74 1856.5,-3612.74 1856.5,-3612.74 2262.5,-3612.74 2262.5,-3612.74 2268.5,-3612.74 2274.5,-3618.74 2274.5,-3624.74 2274.5,-3624.74 2274.5,-3694.74 2274.5,-3694.74 2274.5,-3700.74 2268.5,-3706.74 2262.5,-3706.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3670.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Forward Half Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-3630.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Forward Half Flipping",
                    tailId: "Half Flipping"
                }}><GroupWrapper id="58cf82bead5a18f29d1308b165179f8006204669" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1623.03,-6246.62C1665.77,-6239.82 1709.23,-6223.86 1736.5,-6189.74 1757.95,-6162.89 1722.4,-3742.04 1744.5,-3715.74 1767.86,-3687.93 1799.86,-3670.7 1834.54,-3660.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1835.68,-3663.76 1844.39,-3657.73 1833.82,-3657.01 1835.68,-3663.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rotation",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Rotation",
                    description: "",
                    rank: "S",
                    upstreamSkills: ["Positioning", "Teammate Awareness"],
                    downstreamSkills: ["Game Awareness", "Self Boost Management"]
                }}><GroupWrapper id="96df7e6ae52ce92ca621526e553a7673744a55f2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1587,-4363.74C1587,-4363.74 1396,-4363.74 1396,-4363.74 1390,-4363.74 1384,-4357.74 1384,-4351.74 1384,-4351.74 1384,-4281.74 1384,-4281.74 1384,-4275.74 1390,-4269.74 1396,-4269.74 1396,-4269.74 1587,-4269.74 1587,-4269.74 1593,-4269.74 1599,-4275.74 1599,-4281.74 1599,-4281.74 1599,-4351.74 1599,-4351.74 1599,-4357.74 1593,-4363.74 1587,-4363.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-4327.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rotation"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-4287.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Rotation"
                }}><GroupWrapper id="2179051b6b220f67738b5881612b5c4bd33724ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1517.7,-4269.72C1570.55,-4168.26 1691.76,-3919.72 1736.5,-3694.74 1738.81,-3683.1 1736.8,-3276.76 1744.5,-3267.74 1778.27,-3228.17 1829.54,-3210.1 1880.92,-3203.08"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1881.36,-3206.55 1890.85,-3201.86 1880.5,-3199.6 1881.36,-3206.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Self Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Self Boost Management",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Rotation"],
                    downstreamSkills: []
                }}><GroupWrapper id="e6eb7a78d9abbbc4245ab4f3ab258b6f827e13ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1709,-6404.74C1709,-6404.74 1274,-6404.74 1274,-6404.74 1268,-6404.74 1262,-6398.74 1262,-6392.74 1262,-6392.74 1262,-6322.74 1262,-6322.74 1262,-6316.74 1268,-6310.74 1274,-6310.74 1274,-6310.74 1709,-6310.74 1709,-6310.74 1715,-6310.74 1721,-6316.74 1721,-6322.74 1721,-6322.74 1721,-6392.74 1721,-6392.74 1721,-6398.74 1715,-6404.74 1709,-6404.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6368.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Self Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6328.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Self Boost Management",
                    tailId: "Rotation"
                }}><GroupWrapper id="73746e89f85b52d1f9d9a4f84871bea6859d5c75" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1402.46,-4363.89C1309.06,-4420.02 1171.77,-4523.8 1142.5,-4661.74 1137.8,-4683.89 1137.8,-6270.58 1142.5,-6292.74 1153.7,-6345.52 1198.06,-6369.8 1251.59,-6378.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1251.27,-6382.4 1261.68,-6380.43 1252.32,-6375.47 1251.27,-6382.4"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Teammate Awareness",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Teammate Awareness",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Positioning"],

                    downstreamSkills: [
                        "Game Awareness",
                        "Hoops - Friendship / Fusion Kickoff",
                        "Rotation",
                        "Team Pinch",
                        "Team Pinch Shot"
                    ]
                }}><GroupWrapper id="783469932a61ca943eee27536e95aa94b4fbef7e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1690,-1052.74C1690,-1052.74 1293,-1052.74 1293,-1052.74 1287,-1052.74 1281,-1046.74 1281,-1040.74 1281,-1040.74 1281,-970.74 1281,-970.74 1281,-964.74 1287,-958.74 1293,-958.74 1293,-958.74 1690,-958.74 1690,-958.74 1696,-958.74 1702,-964.74 1702,-970.74 1702,-970.74 1702,-1040.74 1702,-1040.74 1702,-1046.74 1696,-1052.74 1690,-1052.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-1016.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Teammate Awareness"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-976.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="6fa49c5829505d35fa1ab40353a79027f811101a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1702.01,-1031.82C1715.04,-1039.76 1726.8,-1049.6 1736.5,-1061.74 1754.66,-1084.45 1725.78,-3133.47 1744.5,-3155.74 1778.06,-3195.65 1829.42,-3213.78 1880.95,-3220.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1880.56,-3224.22 1890.91,-3221.96 1881.41,-3217.28 1880.56,-3224.22"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="e28ebf8d1f01dc0e418be90fdb1bf793bea2d8fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1280.65,-981.09C1214.75,-985.99 1155.68,-1008.64 1142.5,-1070.74 1138.57,-1089.27 1138.57,-3781.2 1142.5,-3799.74 1183.72,-3993.96 1344.91,-4175.17 1433.08,-4262.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1430.76,-4265 1440.34,-4269.51 1435.66,-4260 1430.76,-4265"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hoops - Friendship / Fusion Kickoff",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="12b5e0801706ea052e23a9ccb49475fb8629249b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1702.02,-1031.8C1715.06,-1039.75 1726.8,-1049.59 1736.5,-1061.74 1749.87,-1078.48 1732.49,-4128.99 1744.5,-4146.74 1907.01,-4386.84 2184.92,-4152.04 2349.5,-4390.74 2362.21,-4409.17 2342.55,-4777.06 2357.5,-4793.74 2382.31,-4821.4 2413.49,-4840.52 2447.69,-4853.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2446.82,-4856.76 2457.42,-4856.81 2449.17,-4850.17 2446.82,-4856.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Team Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Team Pinch",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="8f697b059b55b86443c0ced770e229f731238d1c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2164.5,-1052.74C2164.5,-1052.74 1954.5,-1052.74 1954.5,-1052.74 1948.5,-1052.74 1942.5,-1046.74 1942.5,-1040.74 1942.5,-1040.74 1942.5,-970.74 1942.5,-970.74 1942.5,-964.74 1948.5,-958.74 1954.5,-958.74 1954.5,-958.74 2164.5,-958.74 2164.5,-958.74 2170.5,-958.74 2176.5,-964.74 2176.5,-970.74 2176.5,-970.74 2176.5,-1040.74 2176.5,-1040.74 2176.5,-1046.74 2170.5,-1052.74 2164.5,-1052.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-1016.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Team Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2059.5"
                        y="-976.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Team Pinch",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="c2a493797bd635bfb8386a44e3977079c536da5e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1702.05,-1005.74C1779.29,-1005.74 1864.38,-1005.74 1932.04,-1005.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1932.32,-1009.24 1942.32,-1005.74 1932.32,-1002.24 1932.32,-1009.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Team Pinch Shot",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Team Pinch Shot",
                    description: "",
                    rank: "P",
                    upstreamSkills: ["Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="1089f15b09223b7ac4d51ab91f6810e64ef020f5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1644,-6852.74C1644,-6852.74 1339,-6852.74 1339,-6852.74 1333,-6852.74 1327,-6846.74 1327,-6840.74 1327,-6840.74 1327,-6770.74 1327,-6770.74 1327,-6764.74 1333,-6758.74 1339,-6758.74 1339,-6758.74 1644,-6758.74 1644,-6758.74 1650,-6758.74 1656,-6764.74 1656,-6770.74 1656,-6770.74 1656,-6840.74 1656,-6840.74 1656,-6846.74 1650,-6852.74 1644,-6852.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6816.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Team Pinch Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-6776.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Team Pinch Shot",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="c5e63fc84a1d0edc314039641c5cfea73741a950" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1280.65,-981.09C1214.75,-985.99 1155.68,-1008.64 1142.5,-1070.74 1138.41,-1089.99 1138.41,-6721.48 1142.5,-6740.74 1158.05,-6814.02 1237.52,-6832.36 1316.69,-6831.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1316.92,-6834.92 1326.85,-6831.2 1316.77,-6827.92 1316.92,-6834.92"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Speed",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Game Speed",
                    description: "",
                    rank: "P",
                    upstreamSkills: [],
                    downstreamSkills: ["Game Awareness"]
                }}><GroupWrapper id="c47f3d4df7d8556cd1bf2b526a12ce140a896a94" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1606,-5732.74C1606,-5732.74 1377,-5732.74 1377,-5732.74 1371,-5732.74 1365,-5726.74 1365,-5720.74 1365,-5720.74 1365,-5650.74 1365,-5650.74 1365,-5644.74 1371,-5638.74 1377,-5638.74 1377,-5638.74 1606,-5638.74 1606,-5638.74 1612,-5638.74 1618,-5644.74 1618,-5650.74 1618,-5650.74 1618,-5720.74 1618,-5720.74 1618,-5726.74 1612,-5732.74 1606,-5732.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5696.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Game Speed"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-5656.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Game Speed"
                }}><GroupWrapper id="630e285f11754702182280c9673f6d7525052569" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1618.25,-5687.34C1662.5,-5680.98 1708.21,-5665.13 1736.5,-5629.74 1756.98,-5604.11 1723.39,-3292.85 1744.5,-3267.74 1778.05,-3227.81 1829.41,-3209.68 1880.94,-3202.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1881.4,-3206.19 1890.9,-3201.5 1880.55,-3199.24 1881.4,-3206.19"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Wave Dash"
                }}><GroupWrapper id="03a801af447fa3c13f265187617f822427a2d5c9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1603.05,-1674.29C1651.75,-1679.09 1704.96,-1694.26 1736.5,-1733.74 1747.34,-1747.3 1739.64,-4217.07 1744.5,-4233.74 1885.26,-4716.06 2206.28,-4707.13 2349.5,-5188.74 2354.22,-5204.61 2346.76,-5772.14 2357.5,-5784.74 2606.66,-6076.85 3885.37,-6059.22 4270.86,-6046.98"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4271.02,-6050.48 4280.91,-6046.66 4270.8,-6043.48 4271.02,-6050.48"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Zap Dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Zap Dash",
                    description: "",
                    rank: "GC",
                    upstreamSkills: ["Speed Flipping", "Wave Dash"],
                    downstreamSkills: []
                }}><GroupWrapper id="4ca3378acf86cb1801e818134952d679d60822ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3749.5,-4712.74C3749.5,-4712.74 3557.5,-4712.74 3557.5,-4712.74 3551.5,-4712.74 3545.5,-4706.74 3545.5,-4700.74 3545.5,-4700.74 3545.5,-4630.74 3545.5,-4630.74 3545.5,-4624.74 3551.5,-4618.74 3557.5,-4618.74 3557.5,-4618.74 3749.5,-4618.74 3749.5,-4618.74 3755.5,-4618.74 3761.5,-4624.74 3761.5,-4630.74 3761.5,-4630.74 3761.5,-4700.74 3761.5,-4700.74 3761.5,-4706.74 3755.5,-4712.74 3749.5,-4712.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4676.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Zap Dash"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4636.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Zap Dash",
                    tailId: "Wave Dash"
                }}><GroupWrapper id="18688f80dba52db670f7c3496a5b987b80afceae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1603.05,-1674.29C1651.75,-1679.1 1704.96,-1694.27 1736.5,-1733.74 1757.42,-1759.92 1722.45,-4121.49 1744.5,-4146.74 1963.09,-4396.99 2917.59,-4227.83 3225.5,-4352.74 3375.58,-4413.61 3521.34,-4538.97 3597.64,-4611.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3595.6,-4614.09 3605.25,-4618.45 3600.43,-4609.02 3595.6,-4614.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kuxir Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Helvetiagaming's kuxir pinch tutorial.",
                        url: "https://www.youtube.com/watch?v=aYuTibfTZ4M"
                    }],

                    title: "Kuxir Pinch",
                    description: "Pinching the ball against the wall to make a shot on goal.",
                    rank: "C",
                    upstreamSkills: ["Wall Pinch"],
                    downstreamSkills: ["Hoops - Basket Pinch"]
                }}><GroupWrapper id="ad2e1a8bd58c4efa3605297cc3d542397b198cf5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2896.5,-5232.74C2896.5,-5232.74 2686.5,-5232.74 2686.5,-5232.74 2680.5,-5232.74 2674.5,-5226.74 2674.5,-5220.74 2674.5,-5220.74 2674.5,-5150.74 2674.5,-5150.74 2674.5,-5144.74 2680.5,-5138.74 2686.5,-5138.74 2686.5,-5138.74 2896.5,-5138.74 2896.5,-5138.74 2902.5,-5138.74 2908.5,-5144.74 2908.5,-5150.74 2908.5,-5150.74 2908.5,-5220.74 2908.5,-5220.74 2908.5,-5226.74 2902.5,-5232.74 2896.5,-5232.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5196.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Kuxir Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2791.5"
                        y="-5156.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Hoops - Basket Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Hoops net pinch example",
                        url: "https://streamable.com/y3nme"
                    }],

                    title: "Hoops - Basket Pinch",
                    description: "Pinching the ball against the rim of the goal to kuxir pinch and attempt to score.",
                    rank: "GC",
                    upstreamSkills: ["Kuxir Pinch"],
                    downstreamSkills: []
                }}><GroupWrapper id="9d18007d3de438d638a68348f5957c2bde716b8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3847,-5048.74C3847,-5048.74 3460,-5048.74 3460,-5048.74 3454,-5048.74 3448,-5042.74 3448,-5036.74 3448,-5036.74 3448,-4966.74 3448,-4966.74 3448,-4960.74 3454,-4954.74 3460,-4954.74 3460,-4954.74 3847,-4954.74 3847,-4954.74 3853,-4954.74 3859,-4960.74 3859,-4966.74 3859,-4966.74 3859,-5036.74 3859,-5036.74 3859,-5042.74 3853,-5048.74 3847,-5048.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-5012.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hoops - Basket Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3653.5"
                        y="-4972.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Basket Pinch",
                    tailId: "Kuxir Pinch"
                }}><GroupWrapper id="3daa79d67cb2293c0e3b297efb8b5446e9006453" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2908.85,-5206.22C3007.25,-5216.26 3144.77,-5211.93 3225.5,-5129.74 3248.06,-5106.76 3210.99,-5080.75 3233.5,-5057.74 3286,-5004.05 3363.46,-4984.34 3437.55,-4980.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3438.16,-4983.48 3447.98,-4979.5 3437.82,-4976.49 3438.16,-4983.48"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Kuxir Pinch",
                    tailId: "Wall Pinch"
                }}><GroupWrapper id="0928735b8a9b8fc402a38262b267aac6668bebec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1598.66,-7481.58C1648.52,-7477.26 1704,-7462.39 1736.5,-7421.74 1756.19,-7397.1 1722.16,-5173 1744.5,-5150.74 1808.27,-5087.18 2400.29,-5143.02 2664.37,-5171.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2664.07,-5174.96 2674.39,-5172.55 2664.83,-5168 2664.07,-5174.96"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Driving",
                    tailId: "Positioning"
                }}><GroupWrapper id="651dda6aa2f10ca0cd7d11fa1ee2c9ba68298667" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M993.2,-4838.67C1096.01,-4841.37 1248.64,-4845.38 1357.66,-4848.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1357.65,-4851.75 1367.74,-4848.51 1357.83,-4844.75 1357.65,-4851.75"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Positioning"
                }}><GroupWrapper id="a427c282c94acc51433e7494a2c9cbe0a942c74c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M993.11,-4840.21C1045.07,-4835.96 1103.1,-4820.96 1138.5,-4779.74 1156.92,-4758.28 1134.71,-4678.44 1146.5,-4652.74 1202.86,-4529.85 1325.57,-4427.98 1408.13,-4369.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1410.3,-4372.47 1416.49,-4363.87 1406.29,-4366.73 1410.3,-4372.47"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Teammate Awareness",
                    tailId: "Positioning"
                }}><GroupWrapper id="a9a17bcbe95848ce2fbe64466fe7579b0df9f2dd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M993.21,-4841.19C1045.7,-4837.28 1104.15,-4822.28 1138.5,-4779.74 1154.72,-4759.65 1129.75,-1081.39 1146.5,-1061.74 1177.89,-1024.9 1223.25,-1005.61 1270.79,-996.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1271.4,-999.96 1280.64,-994.77 1270.18,-993.06 1271.4,-999.96"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Positioning"
                }}><GroupWrapper id="26d39c2706f7dff1eab4875355a404b12dd1f07a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M993.17,-4830.32C1045.64,-4834.24 1104.09,-4849.23 1138.5,-4891.74 1152.78,-4909.37 1131.76,-6508.48 1146.5,-6525.74 1199.55,-6587.81 1292.25,-6600 1368.06,-6597.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1368.32,-6601.15 1378.17,-6597.25 1368.04,-6594.15 1368.32,-6601.15"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="133cd91cdf62e0d7e8a17dd618fc9ff8ba494556" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M888.16,-4004.53C906.42,-3895.19 968.37,-3625.47 1146.5,-3514.74 1369.2,-3376.29 1550.26,-3330.14 1736.5,-3514.74 1754.34,-3532.41 1733.35,-4396.23 1744.5,-4418.74 1895.57,-4723.58 2197.16,-4583.53 2349.5,-4887.74 2361.09,-4910.89 2340.24,-5334.43 2357.5,-5353.74 2414.31,-5417.26 2504.74,-5435.79 2588.3,-5436.59"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2588.44,-5440.09 2598.45,-5436.6 2588.45,-5433.09 2588.44,-5440.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Recovery",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powerslide Recovery",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="ccfc412c31f61c5e442aacee30a71f358100b194" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1680,-492.74C1680,-492.74 1303,-492.74 1303,-492.74 1297,-492.74 1291,-486.74 1291,-480.74 1291,-480.74 1291,-410.74 1291,-410.74 1291,-404.74 1297,-398.74 1303,-398.74 1303,-398.74 1680,-398.74 1680,-398.74 1686,-398.74 1692,-404.74 1692,-410.74 1692,-410.74 1692,-480.74 1692,-480.74 1692,-486.74 1686,-492.74 1680,-492.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-456.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powerslide Recovery"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1491.5"
                        y="-416.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Recovery",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="8eff5a91b6778636663f84b79a0efabc32d0103b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M881.56,-4004.63C882.54,-3603.72 898.21,-772.59 1146.5,-501.74 1181,-464.1 1230.13,-445.19 1280.49,-436.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1281.22,-440.18 1290.58,-435.2 1280.16,-433.26 1281.22,-440.18"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound Shots",
                    tailId: "Redirects"
                }}><GroupWrapper id="2d054f86d7010b7725e9d5e93f662ede705607f8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2165.87,-2539.74C2288,-2539.74 2490.55,-2539.74 2631.77,-2539.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2631.83,-2543.24 2641.83,-2539.74 2631.83,-2536.24 2631.83,-2543.24"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Spin",
                    tailId: "Sideways Aerials"
                }}><GroupWrapper id="49cf82c78a11e72225cda600bb6ecd4e3a259e81" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2958.06,-2427.74C3118.11,-2427.74 3358.05,-2427.74 3509.87,-2427.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3510.19,-2431.24 3520.19,-2427.74 3510.19,-2424.24 3510.19,-2431.24"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Zap Dash",
                    tailId: "Speed Flipping"
                }}><GroupWrapper id="8acdfdb46f728e1dfbeb77620b83a957e28b0930" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2209.22,-2980.29C2261.45,-2985.96 2315.52,-3002.87 2349.5,-3043.74 2367.4,-3065.27 2338.62,-4031.06 2357.5,-4051.74 2488.2,-4194.88 3054.91,-4045.7 3225.5,-4137.74 3228.82,-4139.53 3499.77,-4475.95 3608.29,-4610.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3605.58,-4613 3614.58,-4618.6 3611.03,-4608.62 3605.58,-4613"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle To Air Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "FLuuMP Turtle AirDribble tutorial.",
                        url: "https://www.youtube.com/watch?v=_pOs0oZMXFU"
                    }],

                    title: "Turtle To Air Dribble",
                    description: "While turtle dribbling, push the ball up the wall and start air dribbling.",
                    rank: "SSL",
                    upstreamSkills: ["Turtle Dribbling", "Wall Air Dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="f51bb7bb52d9283b236b3499c07ee06d5a200995" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4570.5,-5865.74C4570.5,-5865.74 4193.5,-5865.74 4193.5,-5865.74 4187.5,-5865.74 4181.5,-5859.74 4181.5,-5853.74 4181.5,-5853.74 4181.5,-5783.74 4181.5,-5783.74 4181.5,-5777.74 4187.5,-5771.74 4193.5,-5771.74 4193.5,-5771.74 4570.5,-5771.74 4570.5,-5771.74 4576.5,-5771.74 4582.5,-5777.74 4582.5,-5783.74 4582.5,-5783.74 4582.5,-5853.74 4582.5,-5853.74 4582.5,-5859.74 4576.5,-5865.74 4570.5,-5865.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-5829.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-5789.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle To Air Dribble",
                    tailId: "Turtle Dribbling"
                }}><GroupWrapper id="f325ae0c3b0270856649b6db112eca842a499910" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3812.14,-5100.22C3896.96,-5100.91 3999.11,-5115.43 4073.5,-5169.74 4275.48,-5317.18 4349.72,-5631.96 4372.4,-5761.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4368.99,-5762.2 4374.13,-5771.46 4375.89,-5761.02 4368.99,-5762.2"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Turtling"
                }}><GroupWrapper id="c9e95ffab6a02abd861459b79c033ee19ec33712" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1599.24,-4728.94C1775.68,-4755.9 2130.37,-4782.02 2349.5,-4608.74 2357.66,-4602.28 2348.98,-4592.7 2357.5,-4586.74 2515.49,-4476.08 3087.95,-4451.51 3225.5,-4586.74 3244.16,-4605.08 3216.1,-5038.19 3233.5,-5057.74 3294.76,-5126.55 3396.7,-5141.34 3484.69,-5138.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3484.94,-5142.03 3494.8,-5138.14 3484.66,-5135.04 3484.94,-5142.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "R.C Freestylers Reuben Turtle Flick tutorial",
                        url: "https://www.youtube.com/watch?v=JFRvlROxcCQ"
                    }],

                    title: "Turtle Flick",
                    description: "After popping the ball into the air, the player starts turtling then jumps when the ball almost hits the ground to flick it.",
                    rank: "SSL",
                    upstreamSkills: ["Turtling"],
                    downstreamSkills: []
                }}><GroupWrapper id="d694e122c43be2d97de647a2a32990e547b54583" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4487,-5977.74C4487,-5977.74 4277,-5977.74 4277,-5977.74 4271,-5977.74 4265,-5971.74 4265,-5965.74 4265,-5965.74 4265,-5895.74 4265,-5895.74 4265,-5889.74 4271,-5883.74 4277,-5883.74 4277,-5883.74 4487,-5883.74 4487,-5883.74 4493,-5883.74 4499,-5889.74 4499,-5895.74 4499,-5895.74 4499,-5965.74 4499,-5965.74 4499,-5971.74 4493,-5977.74 4487,-5977.74"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-5941.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4382"
                        y="-5901.94"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Flick",
                    tailId: "Turtling"
                }}><GroupWrapper id="af34872fb0c9c299694b3c45d92970eb48888303" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1580.1,-4661.61C1947.41,-4471.06 3376.48,-3801.08 4073.5,-4514.74 4086.7,-4528.25 4069.39,-5860.24 4081.5,-5874.74 4122.86,-5924.25 4192.79,-5939.29 4254.68,-5941.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4254.85,-5944.98 4264.93,-5941.72 4255.02,-5937.98 4254.85,-5944.98"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle To Air Dribble",
                    tailId: "Wall Air Dribble"
                }}><GroupWrapper id="c5cdc3690521f3eb089f3d6c6f310e0d7296f1b6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2948.55,-3782.36C3226.06,-3810.42 3801.68,-3911.91 4073.5,-4276.74 4255.49,-4520.99 4353.87,-5511.24 4376.1,-5761.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="4372.65,-5761.87 4377.02,-5771.52 4379.62,-5761.25 4372.65,-5761.87"></PolygonWrapper></GroupWrapper></Prerequisite></GroupWrapper></></SvgWrapper>)})