import React, { forwardRef } from "react"
import { SvgWrapperComponent } from "../dynamicComponentTypes"
import { EllipseWrapper } from "../wrappers/ellipseWrapper"
import { GroupWrapper } from "../wrappers/groupWrapper"
import { PathWrapper } from "../wrappers/pathWrapper"
import { PolygonWrapper } from "../wrappers/polygonWrapper"
import { SvgWrapper } from "../wrappers/svgWrapper"
import { TextWrapper } from "../wrappers/textWrapper"
import { Skill } from "../providers/skill"
import { Prerequisite } from "../providers/prerequisite"

export const Main: SvgWrapperComponent = forwardRef<SVGSVGElement>((props, ref) => { return  (<SvgWrapper
    width="100%"
    height="100%"
    viewBox="0.00 0.00 1939.00 2636.74"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}><><GroupWrapper
            id="1adafe6db7788063f4117ab4c77b6c55bc78bcab"
            className="graph"
            transform="scale(1 1) rotate(0) translate(4 2632.74)"><PolygonWrapper
                fill="white"
                stroke="transparent"
                points="-4,4 -4,-2632.74 1935,-2632.74 1935,4 -4,4"></PolygonWrapper><Skill
                {...{
                    id: "Wave dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wave dash",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Zap dash", "Hel-jump"]
                }}><GroupWrapper id="6cb36788737e9a90942aaa184711d31caae1f598" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M938.5,-2247C938.5,-2247 867.5,-2247 867.5,-2247 861.5,-2247 855.5,-2241 855.5,-2235 855.5,-2235 855.5,-2223 855.5,-2223 855.5,-2217 861.5,-2211 867.5,-2211 867.5,-2211 938.5,-2211 938.5,-2211 944.5,-2211 950.5,-2217 950.5,-2223 950.5,-2223 950.5,-2235 950.5,-2235 950.5,-2241 944.5,-2247 938.5,-2247"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2225.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wave Dash"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Zap dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Zap dash",
                    upstreamSkills: ["Wave dash", "Speed flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="07d5091b56cc1a310bf61efd2a9f4bd39c2a4adf" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1178,-2139C1178,-2139 1118,-2139 1118,-2139 1112,-2139 1106,-2133 1106,-2127 1106,-2127 1106,-2115 1106,-2115 1106,-2109 1112,-2103 1118,-2103 1118,-2103 1178,-2103 1178,-2103 1184,-2103 1190,-2109 1190,-2115 1190,-2115 1190,-2127 1190,-2127 1190,-2133 1184,-2139 1178,-2139"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2117.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Zap Dash"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Zap dash",
                    tailId: "Wave dash"
                }}><GroupWrapper id="bdeea73adb652fca8b2394c9e5599e9194668a58" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M950.55,-2217.58C965.6,-2213.33 982.22,-2208.06 997,-2202 1036.71,-2185.73 1079.56,-2161.91 1109.25,-2144.3"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1111.24,-2147.19 1118.03,-2139.06 1107.65,-2141.18 1111.24,-2147.19"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hel-jump",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Hel-jump",
                    upstreamSkills: ["Wave dash", "Boosting"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95c68cc3736c6dfaa388c5aadcd341c5b0a21f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1177,-1625C1177,-1625 1119,-1625 1119,-1625 1113,-1625 1107,-1619 1107,-1613 1107,-1613 1107,-1601 1107,-1601 1107,-1595 1113,-1589 1119,-1589 1119,-1589 1177,-1589 1177,-1589 1183,-1589 1189,-1595 1189,-1601 1189,-1601 1189,-1613 1189,-1613 1189,-1619 1183,-1625 1177,-1625"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1603.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hel-jump"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Wave dash"
                }}><GroupWrapper id="97ff0192c8fbde6c225ada95c170cd558c6511fa" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M950.89,-2226.38C967.99,-2222.92 985.85,-2215.9 997,-2202 1076.11,-2103.32 951.45,-1730.67 1033,-1634 1048.48,-1615.65 1073.92,-1608.48 1096.84,-1606.08"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1097.12,-1609.57 1106.82,-1605.31 1096.58,-1602.6 1097.12,-1609.57"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall driving",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Wall driving",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "Leveling out",
                        "Wall Clears",
                        "Wall catch",
                        "Doomsee dish",
                        "Ceiling shots",
                        "Ceiling shuffle"
                    ]
                }}><GroupWrapper id="a96c2cb142aa6ac2c936a4cff11f97ee24f1e5f2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M680,-295C680,-295 599,-295 599,-295 593,-295 587,-289 587,-283 587,-283 587,-271 587,-271 587,-265 593,-259 599,-259 599,-259 680,-259 680,-259 686,-259 692,-265 692,-271 692,-271 692,-283 692,-283 692,-289 686,-295 680,-295"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-273.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Driving"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Leveling out",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Leveling out",
                    upstreamSkills: ["Wall driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="6b3d365b50e70756bdc414d32fafc2220ef76880" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M945,-203C945,-203 861,-203 861,-203 855,-203 849,-197 849,-191 849,-191 849,-179 849,-179 849,-173 855,-167 861,-167 861,-167 945,-167 945,-167 951,-167 957,-173 957,-179 957,-179 957,-191 957,-191 957,-197 951,-203 945,-203"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-181.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Leveling Out"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Leveling out",
                    tailId: "Wall driving"
                }}><GroupWrapper id="763b994b6a045868362a41da8a85f8060c11ef86" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.12,-258.99C717.92,-245.33 766.07,-226.48 809,-212 818.66,-208.74 828.96,-205.51 839.05,-202.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="840.05,-205.84 848.64,-199.64 838.06,-199.13 840.05,-205.84"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Clears",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wall Clears",
                    upstreamSkills: ["Wall driving", "Powershot + Powerclears", "Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="b92bb096f87c33e3f2fe965b18a4ebdd7374756c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M940,-841C940,-841 866,-841 866,-841 860,-841 854,-835 854,-829 854,-829 854,-817 854,-817 854,-811 860,-805 866,-805 866,-805 940,-805 940,-805 946,-805 952,-811 952,-817 952,-817 952,-829 952,-829 952,-835 946,-841 940,-841"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-819.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Clears"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Wall driving"
                }}><GroupWrapper id="f9c0ec896be088d2f058793787b28edea2c8310d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M678.08,-295.14C709.24,-312.34 751.74,-341.31 773,-380 854.28,-527.9 724,-612.21 809,-758 819.14,-775.39 836,-789.25 852.61,-799.63"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="850.84,-802.66 861.23,-804.75 854.41,-796.64 850.84,-802.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall catch",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wall catch",
                    upstreamSkills: ["Wall driving", "Catching"],
                    downstreamSkills: []
                }}><GroupWrapper id="7ab8dbca628402320020496ca2e50eb5a9962b06" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1182.5,-128C1182.5,-128 1113.5,-128 1113.5,-128 1107.5,-128 1101.5,-122 1101.5,-116 1101.5,-116 1101.5,-104 1101.5,-104 1101.5,-98 1107.5,-92 1113.5,-92 1113.5,-92 1182.5,-92 1182.5,-92 1188.5,-92 1194.5,-98 1194.5,-104 1194.5,-104 1194.5,-116 1194.5,-116 1194.5,-122 1188.5,-128 1182.5,-128"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-106.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Catch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall catch",
                    tailId: "Wall driving"
                }}><GroupWrapper id="bddf6a1f226f3235ec64ef15485c811e8406d053" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M659.41,-258.95C688.81,-232.05 748.42,-182.05 809,-158 903.18,-120.6 1022.32,-111.75 1091.08,-109.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1091.33,-113.49 1101.26,-109.77 1091.19,-106.49 1091.33,-113.49"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doomsee dish",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Doomsee dish",
                    upstreamSkills: ["Wall driving", "Game Awareness", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="e1b011f80eecc4d250648c956021f50aeb0878ae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1195.5,-668C1195.5,-668 1100.5,-668 1100.5,-668 1094.5,-668 1088.5,-662 1088.5,-656 1088.5,-656 1088.5,-644 1088.5,-644 1088.5,-638 1094.5,-632 1100.5,-632 1100.5,-632 1195.5,-632 1195.5,-632 1201.5,-632 1207.5,-638 1207.5,-644 1207.5,-644 1207.5,-656 1207.5,-656 1207.5,-662 1201.5,-668 1195.5,-668"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-646.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Doomsee Dish"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Wall driving"
                }}><GroupWrapper id="88c81116498b22aca21d7c81489a6a2173751b51" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.27,-291.57C790.5,-319.28 994.43,-377.06 997,-380 1068.85,-462.2 959.17,-542.57 1033,-623 1044.79,-635.84 1061.45,-643.11 1078.41,-647.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1077.91,-650.56 1088.4,-649.08 1079.27,-643.7 1077.91,-650.56"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Ceiling shots",
                    upstreamSkills: ["Wall driving", "Game Awareness", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="17cc0c6cbc3f34d99fbd108905d9e1c36913221b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1192,-614C1192,-614 1104,-614 1104,-614 1098,-614 1092,-608 1092,-602 1092,-602 1092,-590 1092,-590 1092,-584 1098,-578 1104,-578 1104,-578 1192,-578 1192,-578 1198,-578 1204,-584 1204,-590 1204,-590 1204,-602 1204,-602 1204,-608 1198,-614 1192,-614"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-592.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Ceiling Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Wall driving"
                }}><GroupWrapper id="91e177a3f75b827e865d124e0fc673b66f860d0f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.31,-270.51C770.27,-263.92 917.07,-264.38 997,-347 1066.5,-418.84 964.9,-495.83 1033,-569 1045.63,-582.57 1063.71,-589.9 1081.76,-593.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1081.3,-597.18 1091.75,-595.48 1082.52,-590.29 1081.3,-597.18"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling shuffle",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Ceiling shuffle",
                    upstreamSkills: ["Wall driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="45e3dafb9b0a08bbd8690727d4bf6066b874978e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M952,-257C952,-257 854,-257 854,-257 848,-257 842,-251 842,-245 842,-245 842,-233 842,-233 842,-227 848,-221 854,-221 854,-221 952,-221 952,-221 958,-221 964,-227 964,-233 964,-233 964,-245 964,-245 964,-251 958,-257 952,-257"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-235.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Ceiling Shuffle"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling shuffle",
                    tailId: "Wall driving"
                }}><GroupWrapper id="5d909e64e00333b3088c0a686449d7c5750e065f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.16,-269.49C732.07,-263.69 787.72,-255.61 831.69,-249.22"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="832.34,-252.66 841.74,-247.76 831.34,-245.73 832.34,-252.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ball camera control",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Ball camera control",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Push dribbling"]
                }}><GroupWrapper id="57d57fd83c40caa7d68b83b1572e094e8324684b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M708.5,-1669C708.5,-1669 570.5,-1669 570.5,-1669 564.5,-1669 558.5,-1663 558.5,-1657 558.5,-1657 558.5,-1645 558.5,-1645 558.5,-1639 564.5,-1633 570.5,-1633 570.5,-1633 708.5,-1633 708.5,-1633 714.5,-1633 720.5,-1639 720.5,-1645 720.5,-1645 720.5,-1657 720.5,-1657 720.5,-1663 714.5,-1669 708.5,-1669"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1647.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Ball Camera Control"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Push dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Push dribbling",
                    upstreamSkills: ["Ball camera control"],
                    downstreamSkills: ["Hood dribble", "Bounce dribbling", "Turtle Dribbling"]
                }}><GroupWrapper id="1f89633229d14b505f218fdea712129e5d18d1dd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953,-1669C953,-1669 853,-1669 853,-1669 847,-1669 841,-1663 841,-1657 841,-1657 841,-1645 841,-1645 841,-1639 847,-1633 853,-1633 853,-1633 953,-1633 953,-1633 959,-1633 965,-1639 965,-1645 965,-1645 965,-1657 965,-1657 965,-1663 959,-1669 953,-1669"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1647.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Push Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Push dribbling",
                    tailId: "Ball camera control"
                }}><GroupWrapper id="f67d097a22f449d738d7f4193bff7081f66268ba" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M720.74,-1651C755.7,-1651 796.37,-1651 830.31,-1651"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="830.61,-1654.5 840.61,-1651 830.61,-1647.5 830.61,-1654.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Joystick air roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Joystick air roll",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Wall pinch", "Turtling", "Air roll shots", "Backwards aerials"]
                }}><GroupWrapper id="52c4080efca8c754eb74746d4fdb5ec0eda02d2a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.5,-1615C692.5,-1615 586.5,-1615 586.5,-1615 580.5,-1615 574.5,-1609 574.5,-1603 574.5,-1603 574.5,-1591 574.5,-1591 574.5,-1585 580.5,-1579 586.5,-1579 586.5,-1579 692.5,-1579 692.5,-1579 698.5,-1579 704.5,-1585 704.5,-1591 704.5,-1591 704.5,-1603 704.5,-1603 704.5,-1609 698.5,-1615 692.5,-1615"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1593.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Joystick Air Roll"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Wall pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wall pinch",
                    upstreamSkills: ["Joystick air roll", "Jumping", "Boosting"],
                    downstreamSkills: ["Kuxir pinch"]
                }}><GroupWrapper id="0cafa4b4135ad0c10019301e85c42bbcf18d737f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M937,-1831C937,-1831 869,-1831 869,-1831 863,-1831 857,-1825 857,-1819 857,-1819 857,-1807 857,-1807 857,-1801 863,-1795 869,-1795 869,-1795 937,-1795 937,-1795 943,-1795 949,-1801 949,-1807 949,-1807 949,-1819 949,-1819 949,-1825 943,-1831 937,-1831"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1809.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Pinch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="74a606d5ec07a25bc04d3678938c76caff60933d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M704.7,-1595.9C728.99,-1598.79 755.08,-1606.4 773,-1624 825.61,-1675.69 758.54,-1732.21 809,-1786 818.9,-1796.56 832.67,-1803.07 846.57,-1807.06"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.12,-1810.55 856.67,-1809.54 847.79,-1803.75 846.12,-1810.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtling",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Turtling",
                    upstreamSkills: ["Joystick air roll"],
                    downstreamSkills: ["Turtle Dribbling", "Turtle Flick"]
                }}><GroupWrapper id="f6ef1ec4e3cdd633da3819f1cb20f1feee3902c0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M928,-1777C928,-1777 878,-1777 878,-1777 872,-1777 866,-1771 866,-1765 866,-1765 866,-1753 866,-1753 866,-1747 872,-1741 878,-1741 878,-1741 928,-1741 928,-1741 934,-1741 940,-1747 940,-1753 940,-1753 940,-1765 940,-1765 940,-1771 934,-1777 928,-1777"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1755.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turtling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtling",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="e2b88e6fb7f4839535804f4b80bd508434b1b885" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M704.82,-1596.99C728.7,-1600.1 754.46,-1607.58 773,-1624 810.87,-1657.55 772.53,-1696.93 809,-1732 821.54,-1744.06 839.15,-1750.78 855.67,-1754.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="855.28,-1758 865.77,-1756.47 856.61,-1751.13 855.28,-1758"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air roll shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Air roll shots",
                    upstreamSkills: ["Joystick air roll", "Powershot + Powerclears", "Bounce Powershots"],
                    downstreamSkills: ["Sideways aerials"]
                }}><GroupWrapper id="8ed889690f1cbd15c45145c524af7e835735526a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1193.5,-1171C1193.5,-1171 1102.5,-1171 1102.5,-1171 1096.5,-1171 1090.5,-1165 1090.5,-1159 1090.5,-1159 1090.5,-1147 1090.5,-1147 1090.5,-1141 1096.5,-1135 1102.5,-1135 1102.5,-1135 1193.5,-1135 1193.5,-1135 1199.5,-1135 1205.5,-1141 1205.5,-1147 1205.5,-1147 1205.5,-1159 1205.5,-1159 1205.5,-1165 1199.5,-1171 1193.5,-1171"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1149.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Roll Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="92882808bdf167d4f112fe558aecff84b429732d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M704.72,-1586.77C796.42,-1570.82 958.12,-1537.34 997,-1494 1059.07,-1424.82 993.65,-1372.2 1033,-1288 1053.45,-1244.24 1091.87,-1203.24 1118.42,-1178.16"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1120.96,-1180.58 1125.91,-1171.21 1116.19,-1175.45 1120.96,-1180.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backwards aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Backwards aerials",
                    upstreamSkills: ["Joystick air roll", "Basic aerials"],
                    downstreamSkills: ["Tornado spin"]
                }}><GroupWrapper id="dea8a431dbfc07fac1a133f50b3af766ad88409c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.5,-1615C965.5,-1615 840.5,-1615 840.5,-1615 834.5,-1615 828.5,-1609 828.5,-1603 828.5,-1603 828.5,-1591 828.5,-1591 828.5,-1585 834.5,-1579 840.5,-1579 840.5,-1579 965.5,-1579 965.5,-1579 971.5,-1579 977.5,-1585 977.5,-1591 977.5,-1591 977.5,-1603 977.5,-1603 977.5,-1609 971.5,-1615 965.5,-1615"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1593.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Backwards Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backwards aerials",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="0b0d9c0a52762c08b1de328ec2b54a92242fcc60" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M704.81,-1597C738.95,-1597 781.32,-1597 818.03,-1597"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="818.22,-1600.5 828.22,-1597 818.22,-1593.5 818.22,-1600.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Directional air roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Directional air roll",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Speed flipping", "Stalling", "Bunny hopping", "Tornado spin"]
                }}><GroupWrapper id="1ab2ed97bb359c4ddc5161fefbace20b74ebb447" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M704,-1923C704,-1923 575,-1923 575,-1923 569,-1923 563,-1917 563,-1911 563,-1911 563,-1899 563,-1899 563,-1893 569,-1887 575,-1887 575,-1887 704,-1887 704,-1887 710,-1887 716,-1893 716,-1899 716,-1899 716,-1911 716,-1911 716,-1917 710,-1923 704,-1923"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1901.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Directional Air Roll"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Speed flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Speed flipping",
                    upstreamSkills: ["Directional air roll", "Flipping"],
                    downstreamSkills: ["Zap dash"]
                }}><GroupWrapper id="a4dfc80ce8e6927ad97338af954e64a2369ec1cd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953.5,-2031C953.5,-2031 852.5,-2031 852.5,-2031 846.5,-2031 840.5,-2025 840.5,-2019 840.5,-2019 840.5,-2007 840.5,-2007 840.5,-2001 846.5,-1995 852.5,-1995 852.5,-1995 953.5,-1995 953.5,-1995 959.5,-1995 965.5,-2001 965.5,-2007 965.5,-2007 965.5,-2019 965.5,-2019 965.5,-2025 959.5,-2031 953.5,-2031"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2009.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Speed Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Speed flipping",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="2118c598e1936c0f53e31153b466368cabb9ab14" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M673.98,-1923.13C707.47,-1940.78 760.8,-1967.56 809,-1986 815.91,-1988.64 823.19,-1991.17 830.51,-1993.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="829.9,-1997.03 840.49,-1996.71 832.01,-1990.36 829.9,-1997.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Stalling",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Stalling",
                    upstreamSkills: ["Directional air roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9f7b99a1949e67ad3915822fb4c785629eab00c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M927,-1977C927,-1977 879,-1977 879,-1977 873,-1977 867,-1971 867,-1965 867,-1965 867,-1953 867,-1953 867,-1947 873,-1941 879,-1941 879,-1941 927,-1941 927,-1941 933,-1941 939,-1947 939,-1953 939,-1953 939,-1965 939,-1965 939,-1971 933,-1977 927,-1977"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1955.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Stalling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Stalling",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="6c6cb72f92935a8705a3f0424613374a52fa09fd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M716.14,-1920.62C761.69,-1930.03 818.17,-1941.69 856.84,-1949.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="856.26,-1953.13 866.76,-1951.72 857.68,-1946.27 856.26,-1953.13"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bunny hopping",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Bunny hopping",
                    upstreamSkills: ["Directional air roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="da8643db0fba88c2799215c0b1b595c0b8e3c51a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M955,-1923C955,-1923 851,-1923 851,-1923 845,-1923 839,-1917 839,-1911 839,-1911 839,-1899 839,-1899 839,-1893 845,-1887 851,-1887 851,-1887 955,-1887 955,-1887 961,-1887 967,-1893 967,-1899 967,-1899 967,-1911 967,-1911 967,-1917 961,-1923 955,-1923"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1901.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bunny Hopping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bunny hopping",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="5c24ee50eadb8367b58a63ebd7aba3aeba9829fe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M716.14,-1905C751.56,-1905 793.58,-1905 828.7,-1905"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="828.89,-1908.5 838.89,-1905 828.89,-1901.5 828.89,-1908.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tornado spin",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Tornado spin",
                    upstreamSkills: ["Directional air roll", "Backwards aerials", "Sideways aerials"],
                    downstreamSkills: ["Tornado Flick / Spin", "Breezi Flick"]
                }}><GroupWrapper id="494f28b9703c3cb93e33db4ff93b223fb4e23e00" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1618.5,-1279C1618.5,-1279 1531.5,-1279 1531.5,-1279 1525.5,-1279 1519.5,-1273 1519.5,-1267 1519.5,-1267 1519.5,-1255 1519.5,-1255 1519.5,-1249 1525.5,-1243 1531.5,-1243 1531.5,-1243 1618.5,-1243 1618.5,-1243 1624.5,-1243 1630.5,-1249 1630.5,-1255 1630.5,-1255 1630.5,-1267 1630.5,-1267 1630.5,-1273 1624.5,-1279 1618.5,-1279"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-1257.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Tornado Spin"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="78aa13f7936aab916925ecbebe2ff683e64c6d1d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M716.16,-1890.95C745.11,-1886.08 778.49,-1881.08 809,-1878 845.79,-1874.29 1446.26,-1874.45 1474,-1850 1559.3,-1774.83 1571.84,-1396.49 1573.68,-1289.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1577.18,-1289.32 1573.84,-1279.27 1570.18,-1289.21 1577.18,-1289.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Jumping",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "Ball camera control",
                        "Joystick air roll",
                        "Directional air roll",
                        "Double Jumping",
                        "Flipping",
                        "Flip window",
                        "Bounce Powershots",
                        "Popping",
                        "Wall pinch",
                        "Basic aerials",
                        "Hoops - Friendship / fusion Kickoff"
                    ]
                }}><GroupWrapper id="38d0bb0d896dbbec2e35ed651df7e15babe319b5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M409.5,-1642C409.5,-1642 357.5,-1642 357.5,-1642 351.5,-1642 345.5,-1636 345.5,-1630 345.5,-1630 345.5,-1618 345.5,-1618 345.5,-1612 351.5,-1606 357.5,-1606 357.5,-1606 409.5,-1606 409.5,-1606 415.5,-1606 421.5,-1612 421.5,-1618 421.5,-1618 421.5,-1630 421.5,-1630 421.5,-1636 415.5,-1642 409.5,-1642"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-1620.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Jumping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ball camera control",
                    tailId: "Jumping"
                }}><GroupWrapper id="e4eb51790b6963ed4042ffcc42eab1a183e247c5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M421.71,-1627.95C454.88,-1631.48 504.79,-1636.79 548.36,-1641.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="548.1,-1644.91 558.42,-1642.49 548.84,-1637.95 548.1,-1644.91"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Joystick air roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="7c65d28bd6b0f8ee958ddb1025619a4df1589719" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M421.71,-1620.05C458.93,-1616.09 517.24,-1609.89 564.01,-1604.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="564.53,-1608.38 574.11,-1603.84 563.79,-1601.42 564.53,-1608.38"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional air roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="0886c5668eb4ef50cd4ad379c49348b76baccc65" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M393.74,-1642.1C411.98,-1676.73 455.29,-1753.65 506,-1807 533.93,-1836.38 571.52,-1863.25 599.53,-1881.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="597.95,-1884.54 608.26,-1886.98 601.72,-1878.64 597.95,-1884.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Double Jumping",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Double jump aerials", "Fast aerials", "Spring Roll"]
                }}><GroupWrapper id="03c645b9ea53657cc27a20182e7610dcc89b94ee" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693,-1495C693,-1495 586,-1495 586,-1495 580,-1495 574,-1489 574,-1483 574,-1483 574,-1471 574,-1471 574,-1465 580,-1459 586,-1459 586,-1459 693,-1459 693,-1459 699,-1459 705,-1465 705,-1471 705,-1471 705,-1483 705,-1483 705,-1489 699,-1495 693,-1495"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1473.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Double Jumping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jumping",
                    tailId: "Jumping"
                }}><GroupWrapper id="968f8634e8cf7c030c4fbb56a8841097ca9a258b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M415.65,-1605.97C461.63,-1579.36 547.71,-1529.54 598.37,-1500.22"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="600.2,-1503.21 607.1,-1495.17 596.69,-1497.15 600.2,-1503.21"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Flipping",
                    upstreamSkills: ["Jumping"],

                    downstreamSkills: [
                        "Wave dash",
                        "Diagonal Flipping",
                        "Speed flipping",
                        "50/50’s + Kickoffs",
                        "Backflip shot",
                        "Tilted drift",
                        "Flip canceling",
                        "Directional Flick",
                        "Rumble - Spike Flicks"
                    ]
                }}><GroupWrapper id="61b9cf036213209cd135a592fa61c15f6a53072e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M665.5,-2270C665.5,-2270 613.5,-2270 613.5,-2270 607.5,-2270 601.5,-2264 601.5,-2258 601.5,-2258 601.5,-2246 601.5,-2246 601.5,-2240 607.5,-2234 613.5,-2234 613.5,-2234 665.5,-2234 665.5,-2234 671.5,-2234 677.5,-2240 677.5,-2246 677.5,-2246 677.5,-2258 677.5,-2258 677.5,-2264 671.5,-2270 665.5,-2270"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2248.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flipping",
                    tailId: "Jumping"
                }}><GroupWrapper id="96092db701ed22de4a7d19868e7adbf9d35b541e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M384.14,-1642.39C383.6,-1714.7 389.84,-1984.05 506,-2158 527.2,-2189.75 563.02,-2214.2 592.08,-2230.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="590.78,-2233.47 601.25,-2235.09 594.07,-2227.3 590.78,-2233.47"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip window",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Flip window",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Flip resets", "Rumble - UFO Shots"]
                }}><GroupWrapper id="7441b6c43e96a03b31594525e70e57de9c88c53b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M680.5,-2085C680.5,-2085 598.5,-2085 598.5,-2085 592.5,-2085 586.5,-2079 586.5,-2073 586.5,-2073 586.5,-2061 586.5,-2061 586.5,-2055 592.5,-2049 598.5,-2049 598.5,-2049 680.5,-2049 680.5,-2049 686.5,-2049 692.5,-2055 692.5,-2061 692.5,-2061 692.5,-2073 692.5,-2073 692.5,-2079 686.5,-2085 680.5,-2085"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2063.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flip Window"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip window",
                    tailId: "Jumping"
                }}><GroupWrapper id="1fff6d4684e74beb0eb3619a8c33eccbc0553781" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M388.94,-1642.2C401.56,-1691.74 441.04,-1831.96 506,-1932 534.28,-1975.55 578.18,-2016.81 607.61,-2041.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="605.61,-2044.88 615.5,-2048.66 610.12,-2039.53 605.61,-2044.88"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce Powershots",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Bounce Powershots",
                    upstreamSkills: ["Jumping", "Powershot + Powerclears"],
                    downstreamSkills: ["Air roll shots"]
                }}><GroupWrapper id="b209979857f96555ea66ffe9ffcb87645ccec92f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M969,-1063C969,-1063 837,-1063 837,-1063 831,-1063 825,-1057 825,-1051 825,-1051 825,-1039 825,-1039 825,-1033 831,-1027 837,-1027 837,-1027 969,-1027 969,-1027 975,-1027 981,-1033 981,-1039 981,-1039 981,-1051 981,-1051 981,-1057 975,-1063 969,-1063"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1041.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bounce Powershots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Jumping"
                }}><GroupWrapper id="29ed75b408be8185556eb730bdc5870d85da7d79" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M390,-1605.93C403.68,-1563.36 442.77,-1455.17 506,-1386 600.6,-1282.52 690.91,-1331.66 773,-1218 812.13,-1163.82 762.72,-1120.21 809,-1072 811.13,-1069.78 813.43,-1067.74 815.86,-1065.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="818.18,-1068.54 824.61,-1060.12 814.33,-1062.69 818.18,-1068.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Popping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Popping",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Doinking", "Double touches", "45 degree flick"]
                }}><GroupWrapper id="91a3270cb0d1d83b450b4ded0b087df6325a3148" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M664.5,-2555C664.5,-2555 614.5,-2555 614.5,-2555 608.5,-2555 602.5,-2549 602.5,-2543 602.5,-2543 602.5,-2531 602.5,-2531 602.5,-2525 608.5,-2519 614.5,-2519 614.5,-2519 664.5,-2519 664.5,-2519 670.5,-2519 676.5,-2525 676.5,-2531 676.5,-2531 676.5,-2543 676.5,-2543 676.5,-2549 670.5,-2555 664.5,-2555"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2533.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Popping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Popping",
                    tailId: "Jumping"
                }}><GroupWrapper id="03d1e8d95dd46376633beb1fd22529e51ff511fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M385.93,-1642.2C392.46,-1720.47 422.87,-2035.46 506,-2279 536.36,-2367.94 592.88,-2464.33 621.28,-2510.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="618.45,-2512.12 626.73,-2518.74 624.39,-2508.41 618.45,-2512.12"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Jumping"
                }}><GroupWrapper id="d63045344dd68ad51eb474a6ae10182403dead33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M396.16,-1642.16C415.34,-1670.37 456.42,-1724.15 506,-1750 616.76,-1807.76 766.81,-1815.5 846.65,-1814.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="847.02,-1818.46 856.97,-1814.85 846.93,-1811.46 847.02,-1818.46"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Basic aerials",
                    upstreamSkills: ["Jumping", "Boosting"],

                    downstreamSkills: [
                        "Air Demos",
                        "Aerial Powershot",
                        "Double jump aerials",
                        "Fast aerials",
                        "Backwards aerials",
                        "Sideways aerials",
                        "Rebound shots",
                        "Doomsee dish",
                        "Ceiling shots"
                    ]
                }}><GroupWrapper id="2c45eae6dd207b555f843560a51016dd135f5b07" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M682,-1431C682,-1431 597,-1431 597,-1431 591,-1431 585,-1425 585,-1419 585,-1419 585,-1407 585,-1407 585,-1401 591,-1395 597,-1395 597,-1395 682,-1395 682,-1395 688,-1395 694,-1401 694,-1407 694,-1407 694,-1419 694,-1419 694,-1425 688,-1431 682,-1431"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1409.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Basic Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic aerials",
                    tailId: "Jumping"
                }}><GroupWrapper id="59d4c18483840653f54eebc6100174318dac059c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M392.05,-1605.88C407.78,-1570.36 447.54,-1491.45 506,-1450 526.2,-1435.68 551.78,-1426.89 575.05,-1421.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="575.83,-1424.91 584.87,-1419.39 574.36,-1418.07 575.83,-1424.91"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hoops - Friendship / fusion Kickoff",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Hoops - Friendship / fusion Kickoff",
                    upstreamSkills: ["Jumping", "Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4c97e91301b9bb257aceb3aa8119334ea2d99a2f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M761,-956C761,-956 518,-956 518,-956 512,-956 506,-950 506,-944 506,-944 506,-932 506,-932 506,-926 512,-920 518,-920 518,-920 761,-920 761,-920 767,-920 773,-926 773,-932 773,-932 773,-944 773,-944 773,-950 767,-956 761,-956"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-934.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hoops - Friendship / Fusion Kickoff"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Friendship / fusion Kickoff",
                    tailId: "Jumping"
                }}><GroupWrapper id="eaab3ac652d99cb29dc1915b52f2791f3e468bf2" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M391.81,-1605.85C408.69,-1563.1 450.42,-1452.44 470,-1356 487.36,-1270.49 447.76,-1029.98 506,-965 506.65,-964.27 507.32,-963.56 507.99,-962.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="510.56,-965.28 515.74,-956.04 505.92,-960.03 510.56,-965.28"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turning",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Turning",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powershot + Powerclears", "Redirects", "Basic Demos"]
                }}><GroupWrapper id="b0f78a0f574630800e6d978b85363ff41bd7ad8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M408,-933C408,-933 359,-933 359,-933 353,-933 347,-927 347,-921 347,-921 347,-909 347,-909 347,-903 353,-897 359,-897 359,-897 408,-897 408,-897 414,-897 420,-903 420,-909 420,-909 420,-921 420,-921 420,-927 414,-933 408,-933"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-911.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turning"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Powershot + Powerclears",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Powershot + Powerclears",
                    upstreamSkills: ["Turning", "Driving", "Boosting"],

                    downstreamSkills: [
                        "Bounce Powershots",
                        "Possession Prediction",
                        "Aerial Powershot",
                        "Air roll shots",
                        "Guillotine passing",
                        "Wall Clears"
                    ]
                }}><GroupWrapper id="3c3b4b9344db3ee02350c34a2e0a00b2d87168d2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M727.5,-1010C727.5,-1010 551.5,-1010 551.5,-1010 545.5,-1010 539.5,-1004 539.5,-998 539.5,-998 539.5,-986 539.5,-986 539.5,-980 545.5,-974 551.5,-974 551.5,-974 727.5,-974 727.5,-974 733.5,-974 739.5,-980 739.5,-986 739.5,-986 739.5,-998 739.5,-998 739.5,-1004 733.5,-1010 727.5,-1010"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-988.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powershot + Powerclears"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Turning"
                }}><GroupWrapper id="65d524634dc012c0ec9b26a6896ba3cfa8d7d463" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M420,-931.7C443.89,-942.41 476.32,-955.96 506,-965 513.66,-967.33 521.64,-969.53 529.71,-971.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="529.03,-975.01 539.58,-974 530.7,-968.21 529.03,-975.01"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Redirects",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Redirects",
                    upstreamSkills: ["Turning", "Boosting"],
                    downstreamSkills: ["Rebound shots"]
                }}><GroupWrapper id="fd69be653321b291759b25bacb9d457fe645abae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M670,-902C670,-902 609,-902 609,-902 603,-902 597,-896 597,-890 597,-890 597,-878 597,-878 597,-872 603,-866 609,-866 609,-866 670,-866 670,-866 676,-866 682,-872 682,-878 682,-878 682,-890 682,-890 682,-896 676,-902 670,-902"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-880.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Redirects"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Turning"
                }}><GroupWrapper id="86d5ea5067f613df951463cdbd4fa42a98441d9e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M420.09,-910.66C463.42,-905.37 536.97,-896.39 586.62,-890.33"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="587.33,-893.77 596.83,-889.09 586.48,-886.82 587.33,-893.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Basic Demos",
                    upstreamSkills: ["Turning", "Boosting"],
                    downstreamSkills: ["Goalie Demos", "Air Demos"]
                }}><GroupWrapper id="7336660793449ed1297223c8aefa547b3bea0a96" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M681.5,-1209C681.5,-1209 597.5,-1209 597.5,-1209 591.5,-1209 585.5,-1203 585.5,-1197 585.5,-1197 585.5,-1185 585.5,-1185 585.5,-1179 591.5,-1173 597.5,-1173 597.5,-1173 681.5,-1173 681.5,-1173 687.5,-1173 693.5,-1179 693.5,-1185 693.5,-1185 693.5,-1197 693.5,-1197 693.5,-1203 687.5,-1209 681.5,-1209"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1187.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Basic Demos"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Turning"
                }}><GroupWrapper id="04363ac6b640dc5c3d688ce5a59f51e53ce1b738" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M401.17,-933.11C445.03,-980.77 563.81,-1109.84 614.76,-1165.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="612.43,-1167.84 621.77,-1172.82 617.58,-1163.1 612.43,-1167.84"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Driving",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Driving",
                    upstreamSkills: [],

                    downstreamSkills: [
                        "Wall driving",
                        "Jumping",
                        "Turning",
                        "Braking",
                        "Boosting",
                        "Powershot + Powerclears",
                        "Powerslide Turning",
                        "Positioning",
                        "Prediction"
                    ]
                }}><GroupWrapper id="ff52a774cad89d125cacf645052cfe567096d753" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M58,-695C58,-695 12,-695 12,-695 6,-695 0,-689 0,-683 0,-683 0,-671 0,-671 0,-665 6,-659 12,-659 12,-659 58,-659 58,-659 64,-659 70,-665 70,-671 70,-671 70,-683 70,-683 70,-689 64,-695 58,-695"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="35"
                        y="-673.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Driving"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall driving",
                    tailId: "Driving"
                }}><GroupWrapper id="15037e985c66a7cbef252e08c95a777ac8f3fce8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M35.92,-658.86C36.62,-612.21 44.48,-486.34 106,-409 219.85,-265.88 462.47,-263.19 576.65,-270.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="576.74,-274.31 586.96,-271.53 577.24,-267.32 576.74,-274.31"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Jumping",
                    tailId: "Driving"
                }}><GroupWrapper id="4acdb597339422b238ab40122e44811df9987004" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M36.79,-695.25C39.85,-755.85 53.55,-955.31 106,-1110 173.56,-1309.24 313.4,-1523.39 363.85,-1597.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="361.27,-1599.64 369.81,-1605.9 367.04,-1595.68 361.27,-1599.64"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="d26ba9c663855ade1d9248c95687355f9190979d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M62.33,-695.08C124.12,-737.53 278.45,-843.53 347.79,-891.16"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="345.99,-894.17 356.21,-896.94 349.95,-888.4 345.99,-894.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Braking",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Braking",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="eaa44d00fe236ab417d0738ebd452e912564166a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M208,-113C208,-113 159,-113 159,-113 153,-113 147,-107 147,-101 147,-101 147,-89 147,-89 147,-83 153,-77 159,-77 159,-77 208,-77 208,-77 214,-77 220,-83 220,-89 220,-89 220,-101 220,-101 220,-107 214,-113 208,-113"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="183.5"
                        y="-91.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Braking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Braking",
                    tailId: "Driving"
                }}><GroupWrapper id="ebf18b4afe73755cc0d0b934b00523fd5e4f7036" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M35.82,-658.87C35.31,-572.94 37.28,-207.25 106,-122 113.8,-112.32 125.32,-106.11 137.07,-102.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="138.28,-105.41 146.91,-99.26 136.33,-98.69 138.28,-105.41"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boosting",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Boosting",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "50/50’s + Kickoffs",
                        "Powershot + Powerclears",
                        "Redirects",
                        "Wall pinch",
                        "Tilted drift",
                        "Basic Demos",
                        "Hel-jump",
                        "Basic aerials"
                    ]
                }}><GroupWrapper id="537c9a929ccd9e9add13b15ba512c096d2fd52c4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M411.5,-1347C411.5,-1347 355.5,-1347 355.5,-1347 349.5,-1347 343.5,-1341 343.5,-1335 343.5,-1335 343.5,-1323 343.5,-1323 343.5,-1317 349.5,-1311 355.5,-1311 355.5,-1311 411.5,-1311 411.5,-1311 417.5,-1311 423.5,-1317 423.5,-1323 423.5,-1323 423.5,-1335 423.5,-1335 423.5,-1341 417.5,-1347 411.5,-1347"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-1325.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Boosting"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boosting",
                    tailId: "Driving"
                }}><GroupWrapper id="f8161b17441a7def2138c218af3057859b4183f1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M37.15,-695.26C40.89,-744.98 55.52,-886.07 106,-990 170.96,-1123.76 298.29,-1251.21 354.59,-1303.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="352.34,-1306.44 362.05,-1310.67 357.09,-1301.31 352.34,-1306.44"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Driving"
                }}><GroupWrapper id="a95d5e59165072fdf6c0c854a63cde1a2361053e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M44.14,-695C55.64,-719.22 78.36,-762.83 106,-794 177.24,-874.36 198.18,-899.95 297,-942 370.57,-973.31 460.23,-985.56 529.21,-990.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="529.04,-993.61 539.24,-990.74 529.47,-986.63 529.04,-993.61"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Turning",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Powerslide Turning",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powerslide Recovery", "Power Slide Dribble"]
                }}><GroupWrapper id="0fbaf27e68e4e8e34b42a9e74352bce7299da410" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M249,-167C249,-167 118,-167 118,-167 112,-167 106,-161 106,-155 106,-155 106,-143 106,-143 106,-137 112,-131 118,-131 118,-131 249,-131 249,-131 255,-131 261,-137 261,-143 261,-143 261,-155 261,-155 261,-161 255,-167 249,-167"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="183.5"
                        y="-145.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powerslide Turning"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="46995ef069361998ccf614c333fdc6e911c332b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M36.51,-658.73C38.7,-599.85 49.94,-410.62 106,-267 119.3,-232.92 143.25,-198.3 160.81,-175.46"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="163.79,-177.34 167.2,-167.3 158.28,-173.02 163.79,-177.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Positioning",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Positioning",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Shadowing", "Teammate Awareness", "Rotation"]
                }}><GroupWrapper id="a712a04c933abf5a931bcfdc872cedc3542e0268" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M219.5,-454C219.5,-454 147.5,-454 147.5,-454 141.5,-454 135.5,-448 135.5,-442 135.5,-442 135.5,-430 135.5,-430 135.5,-424 141.5,-418 147.5,-418 147.5,-418 219.5,-418 219.5,-418 225.5,-418 231.5,-424 231.5,-430 231.5,-430 231.5,-442 231.5,-442 231.5,-448 225.5,-454 219.5,-454"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="183.5"
                        y="-432.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Positioning"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Positioning",
                    tailId: "Driving"
                }}><GroupWrapper id="6d69af14f92aa38b283d9f38a8f8e55b7da6c9be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M47.01,-658.89C72.57,-616.84 136.03,-512.44 166.14,-462.91"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="169.16,-464.69 171.36,-454.32 163.18,-461.05 169.16,-464.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Prediction",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "Game Awareness",
                        "Pre-Jumping",
                        "Cutting",
                        "Faking",
                        "Softblock",
                        "Catching",
                        "Rebound shots",
                        "Bounce dribbling",
                        "Wall Clears"
                    ]
                }}><GroupWrapper id="ee38cfee82eaaaaee93464fde8775d2369d8d404" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M672.5,-695C672.5,-695 606.5,-695 606.5,-695 600.5,-695 594.5,-689 594.5,-683 594.5,-683 594.5,-671 594.5,-671 594.5,-665 600.5,-659 606.5,-659 606.5,-659 672.5,-659 672.5,-659 678.5,-659 684.5,-665 684.5,-671 684.5,-671 684.5,-683 684.5,-683 684.5,-689 678.5,-695 672.5,-695"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-673.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Prediction",
                    tailId: "Driving"
                }}><GroupWrapper id="e6d0ac4250488960d3927971b52afff6bb1c939b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M70.12,-677C170.02,-677 462.49,-677 584.29,-677"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="584.5,-680.5 594.5,-677 584.5,-673.5 584.5,-680.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double jump aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Double jump aerials",
                    upstreamSkills: ["Double Jumping", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="d7a2f6ed1c0ab39bbe8fd25a89d2e285f02074b5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M972,-1485C972,-1485 834,-1485 834,-1485 828,-1485 822,-1479 822,-1473 822,-1473 822,-1461 822,-1461 822,-1455 828,-1449 834,-1449 834,-1449 972,-1449 972,-1449 978,-1449 984,-1455 984,-1461 984,-1461 984,-1473 984,-1473 984,-1479 978,-1485 972,-1485"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1463.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Double Jump Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double jump aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="0df125d690097c5707cd4815127d1dcb711300cf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M705.14,-1474.53C737.21,-1473.3 776.49,-1471.8 811.5,-1470.46"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="811.87,-1473.95 821.73,-1470.07 811.61,-1466.95 811.87,-1473.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Fast aerials",
                    upstreamSkills: ["Double Jumping", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="f38a452faec31adb27135b563ce6b43880be5c7b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M941.5,-1431C941.5,-1431 864.5,-1431 864.5,-1431 858.5,-1431 852.5,-1425 852.5,-1419 852.5,-1419 852.5,-1407 852.5,-1407 852.5,-1401 858.5,-1395 864.5,-1395 864.5,-1395 941.5,-1395 941.5,-1395 947.5,-1395 953.5,-1401 953.5,-1407 953.5,-1407 953.5,-1419 953.5,-1419 953.5,-1425 947.5,-1431 941.5,-1431"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1409.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Fast Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ebed3c96ee622da9af0ebdb96f577f64a5d00b4b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M705.14,-1461.18C747.2,-1450.89 801.64,-1437.56 842.61,-1427.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="843.57,-1430.9 852.45,-1425.13 841.91,-1424.1 843.57,-1430.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Spring Roll",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Spring Roll",
                    upstreamSkills: ["Double Jumping", "Doinking", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="76e9558e859ffe4b4d74c25a894bb587785133d0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1184.5,-1425C1184.5,-1425 1111.5,-1425 1111.5,-1425 1105.5,-1425 1099.5,-1419 1099.5,-1413 1099.5,-1413 1099.5,-1401 1099.5,-1401 1099.5,-1395 1105.5,-1389 1111.5,-1389 1111.5,-1389 1184.5,-1389 1184.5,-1389 1190.5,-1389 1196.5,-1395 1196.5,-1401 1196.5,-1401 1196.5,-1413 1196.5,-1413 1196.5,-1419 1190.5,-1425 1184.5,-1425"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1403.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Spring Roll"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ad02c4f7b05a024681bb92a2ed2e803bf46c649e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M690.14,-1495.04C762.74,-1518.14 899.81,-1549.03 997,-1494 1024.06,-1478.68 1007.9,-1452.36 1033,-1434 1049.29,-1422.09 1070.07,-1415.35 1089.42,-1411.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1090.12,-1415 1099.38,-1409.85 1088.93,-1408.11 1090.12,-1415"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wave dash",
                    tailId: "Flipping"
                }}><GroupWrapper id="dc949969e7dffed44d2cfec04071f3a68f05a9a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.69,-2248.73C721.35,-2244.89 794.25,-2238.48 845.05,-2234.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="845.57,-2237.48 855.22,-2233.11 844.95,-2230.5 845.57,-2237.48"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Diagonal Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Diagonal Flipping",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1e85eff77e89770205d9c74e3c78f5034b966ad0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M962.5,-2447C962.5,-2447 843.5,-2447 843.5,-2447 837.5,-2447 831.5,-2441 831.5,-2435 831.5,-2435 831.5,-2423 831.5,-2423 831.5,-2417 837.5,-2411 843.5,-2411 843.5,-2411 962.5,-2411 962.5,-2411 968.5,-2411 974.5,-2417 974.5,-2423 974.5,-2423 974.5,-2435 974.5,-2435 974.5,-2441 968.5,-2447 962.5,-2447"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2425.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Diagonal Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Diagonal Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="261c87736cbe53fafb62bf8314c992a171d8018a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M655.77,-2270.09C683.25,-2301.5 744.22,-2366.19 809,-2402 813,-2404.21 817.2,-2406.26 821.5,-2408.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="820.5,-2411.52 831.08,-2412.04 823.14,-2405.03 820.5,-2411.52"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Speed flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="55939fa0e30c0eb191f3b0497e63c325778de99b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M657.1,-2233.57C682.89,-2204.64 733.72,-2146.43 773,-2094 790.29,-2070.91 785.74,-2057.06 809,-2040 815.55,-2035.19 822.95,-2031.24 830.64,-2027.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="832.03,-2031.2 840.12,-2024.36 829.53,-2024.67 832.03,-2031.2"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "50/50’s + Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "50/50’s + Kickoffs",
                    upstreamSkills: ["Flipping", "Boosting"],
                    downstreamSkills: ["Fast Kickoffs"]
                }}><GroupWrapper id="a2b936491d4b9c3849b428df5f3f16a31cc9d59d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M964,-1723C964,-1723 842,-1723 842,-1723 836,-1723 830,-1717 830,-1711 830,-1711 830,-1699 830,-1699 830,-1693 836,-1687 842,-1687 842,-1687 964,-1687 964,-1687 970,-1687 976,-1693 976,-1699 976,-1699 976,-1711 976,-1711 976,-1717 970,-1723 964,-1723"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1701.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"50/50’s + Kickoffs"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Flipping"
                }}><GroupWrapper id="9629a67191bfe59987557df418272e39594e5e63" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M662.24,-2233.97C692.96,-2207.08 748.07,-2153.23 773,-2094 804.37,-2019.49 757.31,-1794.16 809,-1732 812.41,-1727.9 816.39,-1724.41 820.77,-1721.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="822.71,-1724.35 829.6,-1716.3 819.19,-1718.29 822.71,-1724.35"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backflip shot",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Backflip shot",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="ea54f7ee4b0949603f1aa4df4dd85877d59eafb6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M946.5,-2393C946.5,-2393 859.5,-2393 859.5,-2393 853.5,-2393 847.5,-2387 847.5,-2381 847.5,-2381 847.5,-2369 847.5,-2369 847.5,-2363 853.5,-2357 859.5,-2357 859.5,-2357 946.5,-2357 946.5,-2357 952.5,-2357 958.5,-2363 958.5,-2369 958.5,-2369 958.5,-2381 958.5,-2381 958.5,-2387 952.5,-2393 946.5,-2393"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2371.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Backflip Shot"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backflip shot",
                    tailId: "Flipping"
                }}><GroupWrapper id="6962bee10e7ea6267af2c2e5586d3934452044b8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M667.5,-2270.05C699.95,-2291.09 756.6,-2325.83 809,-2348 818.06,-2351.83 827.83,-2355.32 837.52,-2358.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="836.57,-2361.8 847.16,-2361.4 838.63,-2355.11 836.57,-2361.8"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tilted drift",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Tilted drift",
                    upstreamSkills: ["Flipping", "Boosting"],
                    downstreamSkills: []
                }}><GroupWrapper id="bc39cc9f4f8933fa4c939aea82d280f199742478" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M939,-2193C939,-2193 867,-2193 867,-2193 861,-2193 855,-2187 855,-2181 855,-2181 855,-2169 855,-2169 855,-2163 861,-2157 867,-2157 867,-2157 939,-2157 939,-2157 945,-2157 951,-2163 951,-2169 951,-2169 951,-2181 951,-2181 951,-2187 945,-2193 939,-2193"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2171.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Tilted Drift"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tilted drift",
                    tailId: "Flipping"
                }}><GroupWrapper id="cb124b8d6d0696496124ea3d4424402dfc935d0c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.63,-2240.91C711.76,-2230.74 763.76,-2215.28 809,-2202 820.59,-2198.6 833.01,-2194.98 844.87,-2191.53"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.05,-2194.83 854.67,-2188.68 844.09,-2188.11 846.05,-2194.83"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip canceling",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Flip canceling",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Half flipping"]
                }}><GroupWrapper id="7b29daf22ac71cf45cefd3252bbdb88fe8895ce6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M950.5,-2555C950.5,-2555 855.5,-2555 855.5,-2555 849.5,-2555 843.5,-2549 843.5,-2543 843.5,-2543 843.5,-2531 843.5,-2531 843.5,-2525 849.5,-2519 855.5,-2519 855.5,-2519 950.5,-2519 950.5,-2519 956.5,-2519 962.5,-2525 962.5,-2531 962.5,-2531 962.5,-2543 962.5,-2543 962.5,-2549 956.5,-2555 950.5,-2555"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2533.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flip Canceling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip canceling",
                    tailId: "Flipping"
                }}><GroupWrapper id="8cb1a3eae957ffe71f4a2235200013a07cb31752" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M647.14,-2270.18C665.3,-2317.32 720.43,-2444.42 809,-2510 816.44,-2515.51 824.99,-2519.9 833.81,-2523.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="832.87,-2526.78 843.47,-2526.85 835.23,-2520.18 832.87,-2526.78"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Directional Flick",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Directional Flick",
                    upstreamSkills: ["Flipping", "Hood dribble"],
                    downstreamSkills: ["45 degree flick", "Musty Flick", "Delayed Flicks"]
                }}><GroupWrapper id="19641b3805579dd37624bf66b09257f750974774" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1441.5,-2293C1441.5,-2293 1331.5,-2293 1331.5,-2293 1325.5,-2293 1319.5,-2287 1319.5,-2281 1319.5,-2281 1319.5,-2269 1319.5,-2269 1319.5,-2263 1325.5,-2257 1331.5,-2257 1331.5,-2257 1441.5,-2257 1441.5,-2257 1447.5,-2257 1453.5,-2263 1453.5,-2269 1453.5,-2269 1453.5,-2281 1453.5,-2281 1453.5,-2287 1447.5,-2293 1441.5,-2293"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2271.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Directional Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Flipping"
                }}><GroupWrapper id="e45baa78fa3c1200e296a306aacaef56a3377c2c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.7,-2253.15C793.84,-2256.73 1151.36,-2267.77 1309.23,-2272.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1309.23,-2276.15 1319.33,-2272.96 1309.45,-2269.15 1309.23,-2276.15"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rumble - Spike Flicks",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Rumble - Spike Flicks",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="147dbe8bf54f7f867d98ea39b01f66d718271304" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976.5,-2339C976.5,-2339 829.5,-2339 829.5,-2339 823.5,-2339 817.5,-2333 817.5,-2327 817.5,-2327 817.5,-2315 817.5,-2315 817.5,-2309 823.5,-2303 829.5,-2303 829.5,-2303 976.5,-2303 976.5,-2303 982.5,-2303 988.5,-2309 988.5,-2315 988.5,-2315 988.5,-2327 988.5,-2327 988.5,-2333 982.5,-2339 976.5,-2339"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2317.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rumble - Spike Flicks"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - Spike Flicks",
                    tailId: "Flipping"
                }}><GroupWrapper id="16d66adb5bb5e45604b95ecc253ebd736034bcbb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.69,-2261.81C715.55,-2271.8 775.39,-2287.59 823.74,-2300.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="823,-2303.77 833.56,-2302.94 824.79,-2297.01 823,-2303.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip resets",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Flip resets",
                    upstreamSkills: ["Flip window"],
                    downstreamSkills: []
                }}><GroupWrapper id="0fe3247bc2c9e35723c70886c2da1c9b57cf642b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M939.5,-2139C939.5,-2139 866.5,-2139 866.5,-2139 860.5,-2139 854.5,-2133 854.5,-2127 854.5,-2127 854.5,-2115 854.5,-2115 854.5,-2109 860.5,-2103 866.5,-2103 866.5,-2103 939.5,-2103 939.5,-2103 945.5,-2103 951.5,-2109 951.5,-2115 951.5,-2115 951.5,-2127 951.5,-2127 951.5,-2133 945.5,-2139 939.5,-2139"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2117.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flip Resets"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip resets",
                    tailId: "Flip window"
                }}><GroupWrapper id="3afc56c662b85082767d2e1dfb1268c22473e11f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.79,-2077.8C736.58,-2086.84 798.99,-2099.73 844.25,-2109.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="843.7,-2112.54 854.2,-2111.13 845.12,-2105.68 843.7,-2112.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rumble - UFO Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Rumble - UFO Shots",
                    upstreamSkills: ["Flip window"],
                    downstreamSkills: []
                }}><GroupWrapper id="17075a55ee3dc99408922e99aa3b9d8397b11618" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M972.5,-2085C972.5,-2085 833.5,-2085 833.5,-2085 827.5,-2085 821.5,-2079 821.5,-2073 821.5,-2073 821.5,-2061 821.5,-2061 821.5,-2055 827.5,-2049 833.5,-2049 833.5,-2049 972.5,-2049 972.5,-2049 978.5,-2049 984.5,-2055 984.5,-2061 984.5,-2061 984.5,-2073 984.5,-2073 984.5,-2079 978.5,-2085 972.5,-2085"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2063.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rumble - UFO Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - UFO Shots",
                    tailId: "Flip window"
                }}><GroupWrapper id="0250975e69ab579c1a04a079b5a1a0e21c674911" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.79,-2067C726.66,-2067 771.67,-2067 811.26,-2067"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="811.47,-2070.5 821.47,-2067 811.47,-2063.5 811.47,-2070.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Zap dash",
                    tailId: "Speed flipping"
                }}><GroupWrapper id="d76756184096fb581ac06959e244cb32f1f993a4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.67,-2028.9C976.25,-2032.19 987.04,-2035.92 997,-2040 1036.71,-2056.27 1079.56,-2080.09 1109.25,-2097.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1107.65,-2100.82 1118.03,-2102.94 1111.24,-2094.81 1107.65,-2100.82"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Boosting"
                }}><GroupWrapper id="5d8996827b436d743ab2e51c0f78da5c2dfeaa6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M391.79,-1347.1C407.2,-1382.97 446.6,-1463.09 506,-1504 606.67,-1573.34 683.2,-1487.06 773,-1570 810.17,-1604.33 772.53,-1642.93 809,-1678 812.53,-1681.39 816.45,-1684.36 820.64,-1686.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="819.1,-1690.11 829.56,-1691.79 822.44,-1683.95 819.1,-1690.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Boosting"
                }}><GroupWrapper id="51301e2282283ee5735d568c01e581d46214133c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M397.86,-1310.59C420.09,-1280.01 466.19,-1216.85 506,-1164 545.2,-1111.96 591.87,-1051.78 618.05,-1018.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="620.86,-1020.27 624.25,-1010.23 615.34,-1015.96 620.86,-1020.27"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Boosting"
                }}><GroupWrapper id="2b101ad152e13d18e42311c10f858ec8a217e3d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M387.25,-1310.87C398.66,-1237.99 444.58,-967.58 506,-911 527.51,-891.18 559.46,-884.26 586.6,-882.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="586.92,-885.86 596.74,-881.88 586.58,-878.87 586.92,-885.86"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Boosting"
                }}><GroupWrapper id="174936d386e79231fe49f9d9a99586a031f46c23" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M390.27,-1347.05C412.64,-1416.87 493.09,-1665.98 506,-1678 595.96,-1761.74 666.61,-1688.46 773,-1750 792.59,-1761.33 789.52,-1774.48 809,-1786 820.53,-1792.82 833.9,-1798.01 846.83,-1801.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.03,-1805.33 856.61,-1804.67 847.93,-1798.6 846.03,-1805.33"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tilted drift",
                    tailId: "Boosting"
                }}><GroupWrapper id="e773c38c8f5a4939fc2a750117b53518db7eeecf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M391.94,-1347.13C409.09,-1389.82 451.36,-1500.37 470,-1597 480.49,-1651.36 469.46,-2052.4 506,-2094 590.85,-2190.62 757.13,-2190.42 844.79,-2182.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="845.2,-2185.98 854.82,-2181.53 844.53,-2179.01 845.2,-2185.98"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Boosting"
                }}><GroupWrapper id="52167b9a65db45a3347dca992a7cc93919727046" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M417.71,-1310.96C463.53,-1286.06 546.17,-1241.16 596.32,-1213.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="598.17,-1216.89 605.29,-1209.05 594.83,-1210.74 598.17,-1216.89"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Boosting"
                }}><GroupWrapper id="e6abb339e33d2c148fdb01ea27b6ee3307a4035c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M423.79,-1329.95C552.34,-1333.43 954.66,-1347.34 997,-1386 1061.76,-1445.13 972.53,-1516.49 1033,-1580 1049.3,-1597.12 1074.29,-1604.26 1096.72,-1606.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1096.53,-1610.45 1106.81,-1607.9 1097.18,-1603.48 1096.53,-1610.45"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic aerials",
                    tailId: "Boosting"
                }}><GroupWrapper id="7602d96def6adb029b613d4821567cac668c7c8a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M423.63,-1341.94C463.99,-1355.29 527.57,-1376.31 575.11,-1392.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="574.11,-1395.39 584.7,-1395.21 576.3,-1388.74 574.11,-1395.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Fast Kickoffs",
                    upstreamSkills: ["50/50’s + Kickoffs"],
                    downstreamSkills: ["Wavedash Kickoff"]
                }}><GroupWrapper id="70ae9f10a1ebfc1c3e2894c6b3cf99364f1eab4e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1190,-1679C1190,-1679 1106,-1679 1106,-1679 1100,-1679 1094,-1673 1094,-1667 1094,-1667 1094,-1655 1094,-1655 1094,-1649 1100,-1643 1106,-1643 1106,-1643 1190,-1643 1190,-1643 1196,-1643 1202,-1649 1202,-1655 1202,-1655 1202,-1667 1202,-1667 1202,-1673 1196,-1679 1190,-1679"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1657.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Fast Kickoffs"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Kickoffs",
                    tailId: "50/50’s + Kickoffs"
                }}><GroupWrapper id="f52925957ddb7918578ad02bb3562cee452d58b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976.25,-1691.92C1010.48,-1685.72 1050.99,-1678.38 1083.96,-1672.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1084.72,-1675.83 1093.94,-1670.61 1083.47,-1668.95 1084.72,-1675.83"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5393ce41d9044769cb75e995ed926cb6df79f6b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M729.4,-1010.02C756.96,-1015.6 787.29,-1021.75 814.74,-1027.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="814.22,-1030.78 824.71,-1029.34 815.61,-1023.92 814.22,-1030.78"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Possession Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Possession Prediction",
                    upstreamSkills: ["Powershot + Powerclears", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="8b5a1709bd001cb3cd9bee3c80300276e4531ff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1222,-1100C1222,-1100 1074,-1100 1074,-1100 1068,-1100 1062,-1094 1062,-1088 1062,-1088 1062,-1076 1062,-1076 1062,-1070 1068,-1064 1074,-1064 1074,-1064 1222,-1064 1222,-1064 1228,-1064 1234,-1070 1234,-1076 1234,-1076 1234,-1088 1234,-1088 1234,-1094 1228,-1100 1222,-1100"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1078.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Possession Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="801627f5997fc9b6df68fbbcd96e5454f49ae0d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M739.74,-978.41C830.04,-968.11 955.39,-959.61 997,-985 1026.86,-1003.22 1005.45,-1033.44 1033,-1055 1038.89,-1059.61 1045.44,-1063.45 1052.34,-1066.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1051.36,-1070.04 1061.94,-1070.64 1054.04,-1063.57 1051.36,-1070.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Aerial Powershot",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Aerial Powershot",
                    upstreamSkills: ["Powershot + Powerclears", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="95db5dbea9d6dd0b9b333735ed54b07d0bd15896" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M960,-1171C960,-1171 846,-1171 846,-1171 840,-1171 834,-1165 834,-1159 834,-1159 834,-1147 834,-1147 834,-1141 840,-1135 846,-1135 846,-1135 960,-1135 960,-1135 966,-1135 972,-1141 972,-1147 972,-1147 972,-1159 972,-1159 972,-1165 966,-1171 960,-1171"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1149.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Aerial Powershot"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6e12ddd82ba76fbdfd2f127c4d354e7597f33141" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M658.49,-1010.34C687.59,-1039.01 747.91,-1094.41 809,-1126 813.85,-1128.51 818.97,-1130.82 824.21,-1132.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="823.16,-1136.27 833.75,-1136.54 825.63,-1129.73 823.16,-1136.27"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6593f4c98a54ef0fe027b6c0cc07a3c8bd7718e5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M739.86,-987.76C830.95,-985.88 957.49,-988.98 997,-1018 1032.06,-1043.75 1002.12,-1078.37 1033,-1109 1046.15,-1122.05 1063.6,-1131.31 1080.88,-1137.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1079.84,-1141.2 1090.43,-1141.22 1082.16,-1134.6 1079.84,-1141.2"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Guillotine passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Guillotine passing",
                    upstreamSkills: ["Powershot + Powerclears", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="d38b4a8b07534956531b0f922440a52ab564a50b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1209,-992C1209,-992 1087,-992 1087,-992 1081,-992 1075,-986 1075,-980 1075,-980 1075,-968 1075,-968 1075,-962 1081,-956 1087,-956 1087,-956 1209,-956 1209,-956 1215,-956 1221,-962 1221,-968 1221,-968 1221,-980 1221,-980 1221,-986 1215,-992 1209,-992"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-970.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Guillotine Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Guillotine passing",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="7361172893963c864d90140f043f64979e68390a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M739.68,-974.77C751.03,-971.92 762.35,-968.68 773,-965 789.91,-959.16 791.59,-951.11 809,-947 890.32,-927.8 913.78,-939.57 997,-947 1019.17,-948.98 1042.96,-952.57 1064.92,-956.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1064.4,-959.97 1074.87,-958.33 1065.67,-953.08 1064.4,-959.97"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="c9f4387c8905c55860eef274e62c9c20ac39b475" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M739.55,-984.2C751.83,-979.83 763.41,-973.65 773,-965 812.76,-929.12 770.74,-887.47 809,-850 818.57,-840.63 831.2,-834.47 844.04,-830.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="845.14,-833.77 853.87,-827.75 843.3,-827.02 845.14,-833.77"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Bounce Powershots"
                }}><GroupWrapper id="7f690d379036991dd5e1a8228d33fdfc5633cd0d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M979.07,-1063.03C985.31,-1065.65 991.38,-1068.62 997,-1072 1016.67,-1083.81 1013.86,-1096.35 1033,-1109 1047.58,-1118.63 1064.57,-1126.61 1080.92,-1133.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1079.85,-1136.36 1090.44,-1136.61 1082.32,-1129.81 1079.85,-1136.36"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Recovery",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Powerslide Recovery",
                    upstreamSkills: ["Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="ccfc412c31f61c5e442aacee30a71f358100b194" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M454,-36C454,-36 313,-36 313,-36 307,-36 301,-30 301,-24 301,-24 301,-12 301,-12 301,-6 307,0 313,0 313,0 454,0 454,0 460,0 466,-6 466,-12 466,-12 466,-24 466,-24 466,-30 460,-36 454,-36"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-14.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powerslide Recovery"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Recovery",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="8eff5a91b6778636663f84b79a0efabc32d0103b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M248.47,-130.89C252.95,-128.3 257.2,-125.36 261,-122 287.82,-98.32 270.4,-73.93 297,-50 300.64,-46.73 304.64,-43.78 308.87,-41.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="310.83,-44.04 317.82,-36.07 307.39,-37.94 310.83,-44.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Power Slide Dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Power Slide Dribble",
                    upstreamSkills: ["Powerslide Turning", "Hood dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9cae66b7d691f1ffdcd0d4bd94e7a9313f8dfad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1454,-1279C1454,-1279 1319,-1279 1319,-1279 1313,-1279 1307,-1273 1307,-1267 1307,-1267 1307,-1255 1307,-1255 1307,-1249 1313,-1243 1319,-1243 1319,-1243 1454,-1243 1454,-1243 1460,-1243 1466,-1249 1466,-1255 1466,-1255 1466,-1267 1466,-1267 1466,-1273 1460,-1279 1454,-1279"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1257.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Power Slide Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="133cd91cdf62e0d7e8a17dd618fc9ff8ba494556" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M242.62,-130.97C328.35,-106.02 494.16,-64 638.5,-64 638.5,-64 638.5,-64 904,-64 1063.78,-64 1151.19,31.14 1263,-83 1349.59,-171.39 1241.93,-1086.21 1299,-1196 1307.92,-1213.16 1323.65,-1227.03 1339.27,-1237.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1337.58,-1240.54 1347.9,-1242.93 1341.32,-1234.63 1337.58,-1240.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rebound shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Rebound shots",
                    upstreamSkills: ["Redirects", "Prediction", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="97cc5b3e3e1b1e8bdeef9ae11de24d6cc3b84c24" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953.5,-895C953.5,-895 852.5,-895 852.5,-895 846.5,-895 840.5,-889 840.5,-883 840.5,-883 840.5,-871 840.5,-871 840.5,-865 846.5,-859 852.5,-859 852.5,-859 953.5,-859 953.5,-859 959.5,-859 965.5,-865 965.5,-871 965.5,-871 965.5,-883 965.5,-883 965.5,-889 959.5,-895 953.5,-895"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-873.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rebound Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Redirects"
                }}><GroupWrapper id="99fd4fb144afe2c7928adf112338cd2834b8afdd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M682.22,-882.88C721.99,-881.82 782.67,-880.19 830.21,-878.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="830.54,-882.41 840.45,-878.65 830.36,-875.42 830.54,-882.41"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doinking",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Doinking",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: ["Spring Roll"]
                }}><GroupWrapper id="22b7d554e91104658d1fd7dd53c5509ac0553f92" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M931,-2501C931,-2501 875,-2501 875,-2501 869,-2501 863,-2495 863,-2489 863,-2489 863,-2477 863,-2477 863,-2471 869,-2465 875,-2465 875,-2465 931,-2465 931,-2465 937,-2465 943,-2471 943,-2477 943,-2477 943,-2489 943,-2489 943,-2495 937,-2501 931,-2501"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2479.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Doinking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doinking",
                    tailId: "Popping"
                }}><GroupWrapper id="2c4d9f9f18fcf706152e3f4ba6b7590de8a75010" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M676.59,-2529.55C722.43,-2520.08 801.73,-2503.71 853.01,-2493.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="853.79,-2496.53 862.88,-2491.08 852.37,-2489.67 853.79,-2496.53"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double touches",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Double touches",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="f0e48d8570476a93f9304a0346a5f0cbf9687edc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M955.5,-2609C955.5,-2609 850.5,-2609 850.5,-2609 844.5,-2609 838.5,-2603 838.5,-2597 838.5,-2597 838.5,-2585 838.5,-2585 838.5,-2579 844.5,-2573 850.5,-2573 850.5,-2573 955.5,-2573 955.5,-2573 961.5,-2573 967.5,-2579 967.5,-2585 967.5,-2585 967.5,-2597 967.5,-2597 967.5,-2603 961.5,-2609 955.5,-2609"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2587.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Double Touches"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double touches",
                    tailId: "Popping"
                }}><GroupWrapper id="d490c51b781f4314627ff622454f363a65369b60" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M676.59,-2544.45C715.58,-2552.5 778.79,-2565.56 828.37,-2575.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="827.91,-2579.27 838.41,-2577.87 829.32,-2572.42 827.91,-2579.27"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "45 degree flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "45 degree flick",
                    upstreamSkills: ["Popping", "Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="a44c3fda54c2848638e74852c4edfad6b48b6a7b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1628,-2514C1628,-2514 1522,-2514 1522,-2514 1516,-2514 1510,-2508 1510,-2502 1510,-2502 1510,-2490 1510,-2490 1510,-2484 1516,-2478 1522,-2478 1522,-2478 1628,-2478 1628,-2478 1634,-2478 1640,-2484 1640,-2490 1640,-2490 1640,-2502 1640,-2502 1640,-2508 1634,-2514 1628,-2514"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-2492.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"45 Degree Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "45 degree flick",
                    tailId: "Popping"
                }}><GroupWrapper id="89aab463b2aa42e628b16805c3e43a3f78983a9d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M667.98,-2555.02C700.21,-2574.97 755.99,-2605.92 809,-2618 975.24,-2655.88 1432.65,-2579.33 1474,-2564 1500.58,-2554.15 1526.94,-2535.77 1545.92,-2520.61"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1548.32,-2523.16 1553.83,-2514.12 1543.88,-2517.75 1548.32,-2523.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Doinking"
                }}><GroupWrapper id="f74ec4708b4af8a62b07acaf86411af898938406" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M943.41,-2481.85C962.68,-2479.07 984.4,-2472.18 997,-2456 1066.82,-2366.36 960.96,-1521.87 1033,-1434 1046.58,-1417.44 1068.26,-1409.94 1089.1,-1406.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1089.69,-1410.29 1099.22,-1405.65 1088.88,-1403.34 1089.69,-1410.29"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Team pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Team pinch",
                    upstreamSkills: ["Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="762c743dd4e9d3683cda58f1199d93c5a7edce1d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677,-479C677,-479 602,-479 602,-479 596,-479 590,-473 590,-467 590,-467 590,-455 590,-455 590,-449 596,-443 602,-443 602,-443 677,-443 677,-443 683,-443 689,-449 689,-455 689,-455 689,-467 689,-467 689,-473 683,-479 677,-479"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-457.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Team Pinch"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Kuxir pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Kuxir pinch",
                    upstreamSkills: ["Wall pinch"],
                    downstreamSkills: ["Hoops - Basket Pinch"]
                }}><GroupWrapper id="19f714137c3551fd679698d1528df94f691d1694" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1186,-1841C1186,-1841 1110,-1841 1110,-1841 1104,-1841 1098,-1835 1098,-1829 1098,-1829 1098,-1817 1098,-1817 1098,-1811 1104,-1805 1110,-1805 1110,-1805 1186,-1805 1186,-1805 1192,-1805 1198,-1811 1198,-1817 1198,-1817 1198,-1829 1198,-1829 1198,-1835 1192,-1841 1186,-1841"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1819.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Kuxir Pinch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kuxir pinch",
                    tailId: "Wall pinch"
                }}><GroupWrapper id="238c61ab422a7413770f10cb5d2481a371395195" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M949.14,-1814.86C988.27,-1816.47 1045.19,-1818.81 1087.94,-1820.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1087.79,-1824.07 1097.93,-1820.98 1088.08,-1817.07 1087.79,-1824.07"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hoops - Basket Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Hoops - Basket Pinch",
                    upstreamSkills: ["Kuxir pinch"],
                    downstreamSkills: []
                }}><GroupWrapper id="9d18007d3de438d638a68348f5957c2bde716b8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1458.5,-1841C1458.5,-1841 1314.5,-1841 1314.5,-1841 1308.5,-1841 1302.5,-1835 1302.5,-1829 1302.5,-1829 1302.5,-1817 1302.5,-1817 1302.5,-1811 1308.5,-1805 1314.5,-1805 1314.5,-1805 1458.5,-1805 1458.5,-1805 1464.5,-1805 1470.5,-1811 1470.5,-1817 1470.5,-1817 1470.5,-1829 1470.5,-1829 1470.5,-1835 1464.5,-1841 1458.5,-1841"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1819.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hoops - Basket Pinch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Basket Pinch",
                    tailId: "Kuxir pinch"
                }}><GroupWrapper id="e2579cb88734ffd2d7fb450753917b52053100b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1198,-1823C1225.11,-1823 1259.7,-1823 1291.78,-1823"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1292.09,-1826.5 1302.09,-1823 1292.09,-1819.5 1292.09,-1826.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Turtle Dribbling",
                    upstreamSkills: ["Turtling", "Push dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="0a0ec5499fd29060e4849605f069cc89d07aebab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1202,-1733C1202,-1733 1094,-1733 1094,-1733 1088,-1733 1082,-1727 1082,-1721 1082,-1721 1082,-1709 1082,-1709 1082,-1703 1088,-1697 1094,-1697 1094,-1697 1202,-1697 1202,-1697 1208,-1697 1214,-1703 1214,-1709 1214,-1709 1214,-1721 1214,-1721 1214,-1727 1208,-1733 1202,-1733"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1711.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turtle Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Turtling"
                }}><GroupWrapper id="c9e95ffab6a02abd861459b79c033ee19ec33712" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M940.12,-1752.46C974.71,-1746.2 1027.96,-1736.55 1071.78,-1728.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1072.62,-1732.03 1081.83,-1726.8 1071.37,-1725.14 1072.62,-1732.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Turtle Flick",
                    upstreamSkills: ["Turtling"],
                    downstreamSkills: []
                }}><GroupWrapper id="d694e122c43be2d97de647a2a32990e547b54583" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1185.5,-1787C1185.5,-1787 1110.5,-1787 1110.5,-1787 1104.5,-1787 1098.5,-1781 1098.5,-1775 1098.5,-1775 1098.5,-1763 1098.5,-1763 1098.5,-1757 1104.5,-1751 1110.5,-1751 1110.5,-1751 1185.5,-1751 1185.5,-1751 1191.5,-1751 1197.5,-1757 1197.5,-1763 1197.5,-1763 1197.5,-1775 1197.5,-1775 1197.5,-1781 1191.5,-1787 1185.5,-1787"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1765.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turtle Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Flick",
                    tailId: "Turtling"
                }}><GroupWrapper id="af34872fb0c9c299694b3c45d92970eb48888303" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M940.12,-1760.49C979.08,-1762.09 1041.73,-1764.67 1087.9,-1766.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1087.93,-1770.07 1098.07,-1766.99 1088.22,-1763.08 1087.93,-1770.07"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wavedash Kickoff",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wavedash Kickoff",
                    upstreamSkills: ["Fast Kickoffs"],
                    downstreamSkills: []
                }}><GroupWrapper id="46cec1e55d05a6e20e991106ff55c5e0d10bbe29" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1445.5,-1679C1445.5,-1679 1327.5,-1679 1327.5,-1679 1321.5,-1679 1315.5,-1673 1315.5,-1667 1315.5,-1667 1315.5,-1655 1315.5,-1655 1315.5,-1649 1321.5,-1643 1327.5,-1643 1327.5,-1643 1445.5,-1643 1445.5,-1643 1451.5,-1643 1457.5,-1649 1457.5,-1655 1457.5,-1655 1457.5,-1667 1457.5,-1667 1457.5,-1673 1451.5,-1679 1445.5,-1679"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1657.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wavedash Kickoff"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wavedash Kickoff",
                    tailId: "Fast Kickoffs"
                }}><GroupWrapper id="67d9afd180d6e1f10cc6a76e7f00728105982e64" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1202.08,-1661C1232.31,-1661 1270.82,-1661 1304.74,-1661"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1305.1,-1664.5 1315.1,-1661 1305.1,-1657.5 1305.1,-1664.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Half flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Half flipping",
                    upstreamSkills: ["Flip canceling"],
                    downstreamSkills: ["Forward half flipping"]
                }}><GroupWrapper id="6e456ff83a6fb39702fb4818a12508833212f04e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1191,-2555C1191,-2555 1105,-2555 1105,-2555 1099,-2555 1093,-2549 1093,-2543 1093,-2543 1093,-2531 1093,-2531 1093,-2525 1099,-2519 1105,-2519 1105,-2519 1191,-2519 1191,-2519 1197,-2519 1203,-2525 1203,-2531 1203,-2531 1203,-2543 1203,-2543 1203,-2549 1197,-2555 1191,-2555"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2533.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Half Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Half flipping",
                    tailId: "Flip canceling"
                }}><GroupWrapper id="27e3db83e2cb3f4ddec06f20804f6b0c40463e73" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M962.51,-2537C998.71,-2537 1045.22,-2537 1082.49,-2537"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1082.74,-2540.5 1092.74,-2537 1082.74,-2533.5 1082.74,-2540.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Awareness",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Game Awareness",
                    upstreamSkills: ["Teammate Awareness", "Rotation", "Game Speed", "Prediction"],

                    downstreamSkills: [
                        "Shadowing",
                        "Opponent Boost Management",
                        "Possession Prediction",
                        "Playstyle Reading",
                        "Kickoff prediction",
                        "Opponent prediction",
                        "Boost Stealing",
                        "Clear Prevention",
                        "Cherry picking",
                        "Corner pass",
                        "Powershot passing",
                        "Backboard passing",
                        "Back-passing",
                        "Infield passing",
                        "Guillotine passing",
                        "Spring Roll",
                        "Doomsee dish",
                        "Ceiling shots"
                    ]
                }}><GroupWrapper id="0bda27abf75b1ff6c7b200711164e200d08d66c9" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M961,-533C961,-533 845,-533 845,-533 839,-533 833,-527 833,-521 833,-521 833,-509 833,-509 833,-503 839,-497 845,-497 845,-497 961,-497 961,-497 967,-497 973,-503 973,-509 973,-509 973,-521 973,-521 973,-527 967,-533 961,-533"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-511.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Game Awareness"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Shadowing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Shadowing",
                    upstreamSkills: ["Game Awareness", "Positioning"],
                    downstreamSkills: []
                }}><GroupWrapper id="e53555343e30299d84ed9ce47681c9d59614d7fc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1183.5,-182C1183.5,-182 1112.5,-182 1112.5,-182 1106.5,-182 1100.5,-176 1100.5,-170 1100.5,-170 1100.5,-158 1100.5,-158 1100.5,-152 1106.5,-146 1112.5,-146 1112.5,-146 1183.5,-146 1183.5,-146 1189.5,-146 1195.5,-152 1195.5,-158 1195.5,-158 1195.5,-170 1195.5,-170 1195.5,-176 1189.5,-182 1183.5,-182"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-160.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Shadowing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="21204dd13f3ebc8562e7c30347a6ed2beea4a3b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.05,-505.07C982.17,-501.07 990.58,-495.56 997,-488 1083.11,-386.68 944.39,-290.13 1033,-191 1047.39,-174.91 1069.44,-167.52 1090.33,-164.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1090.94,-167.83 1100.45,-163.16 1090.1,-160.88 1090.94,-167.83"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Opponent Boost Management",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="706e36a274b1cefd87f6a0b56902596027196f36" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1251,-884C1251,-884 1045,-884 1045,-884 1039,-884 1033,-878 1033,-872 1033,-872 1033,-860 1033,-860 1033,-854 1039,-848 1045,-848 1045,-848 1251,-848 1251,-848 1257,-848 1263,-854 1263,-860 1263,-860 1263,-872 1263,-872 1263,-878 1257,-884 1251,-884"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-862.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Opponent Boost Management"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="86d86f548fb4ae64e6c33c63d7d1a638f3be6a08" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.05,-524.93C982.17,-528.93 990.58,-534.44 997,-542 1083.11,-643.32 944.39,-739.87 1033,-839 1033.65,-839.73 1034.32,-840.44 1035,-841.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1033,-844.03 1042.86,-847.93 1037.58,-838.74 1033,-844.03"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="3f2bf2ce818de0032db4a4a2cab7c52c512cd922" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.39,-524.65C982.47,-528.69 990.77,-534.28 997,-542 1068.78,-630.92 959.02,-967.9 1033,-1055 1038.42,-1061.38 1045.03,-1066.4 1052.33,-1070.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1051.35,-1073.75 1061.89,-1074.78 1054.29,-1067.4 1051.35,-1073.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Playstyle Reading",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Playstyle Reading",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6e557670f4bc0f5c3a2d75244514eca81de801ad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1208.5,-830C1208.5,-830 1087.5,-830 1087.5,-830 1081.5,-830 1075.5,-824 1075.5,-818 1075.5,-818 1075.5,-806 1075.5,-806 1075.5,-800 1081.5,-794 1087.5,-794 1087.5,-794 1208.5,-794 1208.5,-794 1214.5,-794 1220.5,-800 1220.5,-806 1220.5,-806 1220.5,-818 1220.5,-818 1220.5,-824 1214.5,-830 1208.5,-830"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-808.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Playstyle Reading"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Playstyle Reading",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="20995368ade62436142b3311fab09e973cf901ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.33,-525.29C982.31,-529.25 990.59,-534.65 997,-542 1068.8,-624.25 959.17,-704.57 1033,-785 1041.82,-794.61 1053.38,-801.1 1065.75,-805.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1064.75,-808.79 1075.34,-808.34 1066.78,-802.09 1064.75,-808.79"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kickoff prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Kickoff prediction",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="f739d0f6e6e90379c4c56d3ccfe6c0f612094445" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1207.5,-776C1207.5,-776 1088.5,-776 1088.5,-776 1082.5,-776 1076.5,-770 1076.5,-764 1076.5,-764 1076.5,-752 1076.5,-752 1076.5,-746 1082.5,-740 1088.5,-740 1088.5,-740 1207.5,-740 1207.5,-740 1213.5,-740 1219.5,-746 1219.5,-752 1219.5,-752 1219.5,-764 1219.5,-764 1219.5,-770 1213.5,-776 1207.5,-776"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-754.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Kickoff Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kickoff prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="e8f6624f6272b0e403d7efe20e8240e98780eabf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.06,-525.53C982.08,-529.46 990.44,-534.79 997,-542 1054.55,-605.25 973.89,-669.21 1033,-731 1042.13,-740.55 1053.97,-746.98 1066.55,-751.28"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1065.7,-754.68 1076.28,-754.16 1067.68,-747.97 1065.7,-754.68"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Opponent prediction",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b358190da5082ad2e952824b0c66563b8bf3b812" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218,-722C1218,-722 1078,-722 1078,-722 1072,-722 1066,-716 1066,-710 1066,-710 1066,-698 1066,-698 1066,-692 1072,-686 1078,-686 1078,-686 1218,-686 1218,-686 1224,-686 1230,-692 1230,-698 1230,-698 1230,-710 1230,-710 1230,-716 1224,-722 1218,-722"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-700.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Opponent Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="4f5def919719b5a5d7e006c1d5bcc03154641b15" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.07,-526.16C981.97,-530.01 990.3,-535.15 997,-542 1040.42,-586.39 988.48,-633.71 1033,-677 1039.75,-683.56 1047.78,-688.63 1056.41,-692.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1055.39,-695.9 1065.98,-696.33 1057.97,-689.39 1055.39,-695.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boost Stealing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Boost Stealing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4dc40bb7caf9fed2ed66bb13f46fbb1df2387ff2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1196.5,-560C1196.5,-560 1099.5,-560 1099.5,-560 1093.5,-560 1087.5,-554 1087.5,-548 1087.5,-548 1087.5,-536 1087.5,-536 1087.5,-530 1093.5,-524 1099.5,-524 1099.5,-524 1196.5,-524 1196.5,-524 1202.5,-524 1208.5,-530 1208.5,-536 1208.5,-536 1208.5,-548 1208.5,-548 1208.5,-554 1202.5,-560 1196.5,-560"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-538.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Boost Stealing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boost Stealing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cb3916ed6895d30b621b55760369746d38aca7bf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.31,-522.7C1005.84,-526.32 1044.54,-530.62 1077.14,-534.24"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1077.17,-537.76 1087.49,-535.39 1077.94,-530.8 1077.17,-537.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Clear Prevention",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Clear Prevention",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="5ea77ad958d862ae971aa72ce8101208cc8fd5b6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1204.5,-506C1204.5,-506 1091.5,-506 1091.5,-506 1085.5,-506 1079.5,-500 1079.5,-494 1079.5,-494 1079.5,-482 1079.5,-482 1079.5,-476 1085.5,-470 1091.5,-470 1091.5,-470 1204.5,-470 1204.5,-470 1210.5,-470 1216.5,-476 1216.5,-482 1216.5,-482 1216.5,-494 1216.5,-494 1216.5,-500 1210.5,-506 1204.5,-506"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-484.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Clear Prevention"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Clear Prevention",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b4b3e97ec498cd1c679051ecdd4af42abf11f05b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.31,-507.3C1003.18,-503.98 1038.25,-500.08 1069.02,-496.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1069.73,-500.11 1079.28,-495.52 1068.95,-493.15 1069.73,-500.11"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cherry picking",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Cherry picking",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b18dcf1bf8d0f5cecb3079a28bfad5b15164a811" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1197.5,-452C1197.5,-452 1098.5,-452 1098.5,-452 1092.5,-452 1086.5,-446 1086.5,-440 1086.5,-440 1086.5,-428 1086.5,-428 1086.5,-422 1092.5,-416 1098.5,-416 1098.5,-416 1197.5,-416 1197.5,-416 1203.5,-416 1209.5,-422 1209.5,-428 1209.5,-428 1209.5,-440 1209.5,-440 1209.5,-446 1203.5,-452 1197.5,-452"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-430.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Cherry Picking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cherry picking",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="6ed1c637384cc9a334843c2a35aeb18256a48035" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.13,-497.98C981.35,-495.07 989.48,-491.75 997,-488 1014.89,-479.07 1014.89,-469.48 1033,-461 1046.47,-454.69 1061.54,-449.78 1076.21,-445.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1077.39,-449.31 1086.27,-443.54 1075.73,-442.51 1077.39,-449.31"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Corner pass",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Corner pass",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="51a5e5c46fb1d44a5bf47841bef257507504eff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1187.5,-398C1187.5,-398 1108.5,-398 1108.5,-398 1102.5,-398 1096.5,-392 1096.5,-386 1096.5,-386 1096.5,-374 1096.5,-374 1096.5,-368 1102.5,-362 1108.5,-362 1108.5,-362 1187.5,-362 1187.5,-362 1193.5,-362 1199.5,-368 1199.5,-374 1199.5,-374 1199.5,-386 1199.5,-386 1199.5,-392 1193.5,-398 1187.5,-398"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-376.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Corner Pass"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Corner pass",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="461158952042e2b2d3d40833ee16ebb46418a4d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.08,-502.45C981.77,-498.79 990.03,-494.08 997,-488 1026.68,-462.1 1002.68,-432.15 1033,-407 1047.93,-394.62 1067.55,-387.71 1086.3,-383.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1087.05,-387.34 1096.3,-382.17 1085.84,-380.45 1087.05,-387.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Powershot passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="04c45cc997fa47189f5c85cf56f1bfcad9a0654f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1211.5,-344C1211.5,-344 1084.5,-344 1084.5,-344 1078.5,-344 1072.5,-338 1072.5,-332 1072.5,-332 1072.5,-320 1072.5,-320 1072.5,-314 1078.5,-308 1084.5,-308 1084.5,-308 1211.5,-308 1211.5,-308 1217.5,-308 1223.5,-314 1223.5,-320 1223.5,-320 1223.5,-332 1223.5,-332 1223.5,-338 1217.5,-344 1211.5,-344"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-322.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powershot Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="73177d9443084b5fe018c1d95df1c3f588c7d818" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.07,-503.84C981.97,-499.99 990.3,-494.85 997,-488 1040.42,-443.61 988.48,-396.29 1033,-353 1041.35,-344.88 1051.66,-339.05 1062.64,-334.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1064.04,-338.1 1072.43,-331.63 1061.84,-331.46 1064.04,-338.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backboard passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Backboard passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="7c745c1619ce496adb98ad777a43ffab482afad4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1212,-290C1212,-290 1084,-290 1084,-290 1078,-290 1072,-284 1072,-278 1072,-278 1072,-266 1072,-266 1072,-260 1078,-254 1084,-254 1084,-254 1212,-254 1212,-254 1218,-254 1224,-260 1224,-266 1224,-266 1224,-278 1224,-278 1224,-284 1218,-290 1212,-290"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-268.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Backboard Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backboard passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="9bbc79b2c3b8d3750a50d19d48dcdbbc70c3991b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.06,-504.47C982.08,-500.54 990.44,-495.21 997,-488 1054.55,-424.75 973.89,-360.79 1033,-299 1041.05,-290.59 1051.19,-284.59 1062.1,-280.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1063.49,-283.56 1071.85,-277.04 1061.25,-276.93 1063.49,-283.56"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Back-passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Back-passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6dbb66d80f6a9020c7a2bd3cd6e334226b358b0d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1191,-236C1191,-236 1105,-236 1105,-236 1099,-236 1093,-230 1093,-224 1093,-224 1093,-212 1093,-212 1093,-206 1099,-200 1105,-200 1105,-200 1191,-200 1191,-200 1197,-200 1203,-206 1203,-212 1203,-212 1203,-224 1203,-224 1203,-230 1197,-236 1191,-236"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-214.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Back-passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Back-passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="d13f3701214bb777840e3fb34cd86a1f8bd83764" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.33,-504.71C982.31,-500.75 990.59,-495.35 997,-488 1068.8,-405.75 959.17,-325.43 1033,-245 1045.82,-231.03 1064.43,-223.65 1082.91,-219.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1083.54,-223.36 1092.82,-218.25 1082.38,-216.46 1083.54,-223.36"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Infield passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Infield passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="19ffb85246b85d1c44fbe34397993326cba4856e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1196.5,-938C1196.5,-938 1099.5,-938 1099.5,-938 1093.5,-938 1087.5,-932 1087.5,-926 1087.5,-926 1087.5,-914 1087.5,-914 1087.5,-908 1093.5,-902 1099.5,-902 1099.5,-902 1196.5,-902 1196.5,-902 1202.5,-902 1208.5,-908 1208.5,-914 1208.5,-914 1208.5,-926 1208.5,-926 1208.5,-932 1202.5,-938 1196.5,-938"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-916.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Infield Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Infield passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="45961b3c10fe38e8bdc7b6a52f83abd5a8896dd1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.17,-524.83C982.28,-528.84 990.65,-534.38 997,-542 1097.45,-662.42 929.57,-775.13 1033,-893 1044.38,-905.97 1060.74,-913.31 1077.53,-917.33"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1076.94,-920.78 1087.43,-919.32 1078.32,-913.91 1076.94,-920.78"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Guillotine passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b005fdaa002b8f52350e95e56a2474fa71b071f6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.26,-524.75C982.36,-528.78 990.7,-534.34 997,-542 1054.41,-611.77 973.87,-878.68 1033,-947 1041.46,-956.77 1052.73,-963.35 1064.91,-967.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1064.25,-971.19 1074.84,-970.78 1066.31,-964.5 1064.25,-971.19"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="ce96d7f23d91250787935e64e821ff1ea5fe14e0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.1,-524.3C982.34,-528.38 990.76,-534.07 997,-542 1052.02,-611.93 986.58,-1266.09 1033,-1342 1045.95,-1363.17 1068.52,-1378.1 1090.18,-1388.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1088.81,-1391.48 1099.38,-1392.32 1091.64,-1385.08 1088.81,-1391.48"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cdd8d95c5408a6d51155d7141ff7f6c1b55bd653" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.08,-527.55C981.77,-531.21 990.03,-535.92 997,-542 1026.68,-567.9 1002.68,-597.85 1033,-623 1045.83,-633.65 1062.14,-640.24 1078.38,-644.29"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1077.93,-647.78 1088.45,-646.5 1079.43,-640.94 1077.93,-647.78"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="aa8fbdc7897fcfac22ecf32c76380b4325889b5b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.13,-532.02C981.35,-534.93 989.48,-538.25 997,-542 1014.89,-550.93 1014.89,-560.52 1033,-569 1048.18,-576.11 1065.39,-581.44 1081.77,-585.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1081.3,-588.88 1091.82,-587.69 1082.85,-582.06 1081.3,-588.88"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Positioning"
                }}><GroupWrapper id="26d39c2706f7dff1eab4875355a404b12dd1f07a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M231.58,-426.73C402.56,-393 981.54,-278.12 997,-266 1026.1,-243.19 1004.2,-214.19 1033,-191 1049.19,-177.96 1070.63,-171.03 1090.55,-167.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1091.14,-170.86 1100.48,-165.84 1090.05,-163.94 1091.14,-170.86"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Teammate Awareness",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Teammate Awareness",
                    upstreamSkills: ["Positioning"],

                    downstreamSkills: [
                        "Team pinch",
                        "Game Awareness",
                        "Rotation",
                        "Hoops - Friendship / fusion Kickoff"
                    ]
                }}><GroupWrapper id="783469932a61ca943eee27536e95aa94b4fbef7e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M458,-479C458,-479 309,-479 309,-479 303,-479 297,-473 297,-467 297,-467 297,-455 297,-455 297,-449 303,-443 309,-443 309,-443 458,-443 458,-443 464,-443 470,-449 470,-455 470,-455 470,-467 470,-467 470,-473 464,-479 458,-479"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-457.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Teammate Awareness"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Teammate Awareness",
                    tailId: "Positioning"
                }}><GroupWrapper id="a9a17bcbe95848ce2fbe64466fe7579b0df9f2dd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M231.67,-441.96C248.33,-444.06 267.71,-446.51 286.92,-448.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="286.58,-452.42 296.94,-450.2 287.45,-445.47 286.58,-452.42"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rotation",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Rotation",
                    upstreamSkills: ["Positioning", "Teammate Awareness"],
                    downstreamSkills: ["Game Awareness", "Self Boost Management"]
                }}><GroupWrapper id="96df7e6ae52ce92ca621526e553a7673744a55f2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M666,-425C666,-425 613,-425 613,-425 607,-425 601,-419 601,-413 601,-413 601,-401 601,-401 601,-395 607,-389 613,-389 613,-389 666,-389 666,-389 672,-389 678,-395 678,-401 678,-401 678,-413 678,-413 678,-419 672,-425 666,-425"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-403.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rotation"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Positioning"
                }}><GroupWrapper id="a427c282c94acc51433e7494a2c9cbe0a942c74c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M231.8,-432.98C318.77,-427.42 503.15,-415.65 590.58,-410.06"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="590.99,-413.54 600.75,-409.41 590.54,-406.56 590.99,-413.54"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Team pinch",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="ba3e3f3aec20599a233ce03099dfe7218b1137d6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M470.14,-461C506.14,-461 547.11,-461 579.63,-461"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="579.87,-464.5 589.87,-461 579.87,-457.5 579.87,-464.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="6fa49c5829505d35fa1ab40353a79027f811101a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M403.65,-479.11C426.12,-499 465.48,-529.73 506,-542 614.47,-574.84 747.01,-554.34 827.93,-535.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="829.1,-538.8 838.02,-533.08 827.48,-531.99 829.1,-538.8"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="e28ebf8d1f01dc0e418be90fdb1bf793bea2d8fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M464.84,-442.94C478.57,-439.91 492.69,-436.84 506,-434 534.05,-428.03 565.5,-421.6 590.72,-416.52"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="591.65,-419.91 600.77,-414.5 590.27,-413.04 591.65,-419.91"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hoops - Friendship / fusion Kickoff",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="ea4238ca45b3842e8fbae81d40e6b537dc4c4aae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M386.86,-479.19C397.14,-555.6 440.45,-849.44 506,-911 506.99,-911.93 508,-912.83 509.03,-913.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="507.2,-916.7 517.32,-919.86 511.38,-911.08 507.2,-916.7"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Rotation"
                }}><GroupWrapper id="2179051b6b220f67738b5881612b5c4bd33724ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M678.28,-407.15C706.53,-408.95 744.95,-415.14 773,-434 796.94,-450.09 785.74,-470.94 809,-488 813.49,-491.29 818.38,-494.19 823.48,-496.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="822.31,-500.04 832.86,-500.93 825.17,-493.65 822.31,-500.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Self Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Self Boost Management",
                    upstreamSkills: ["Rotation"],
                    downstreamSkills: []
                }}><GroupWrapper id="e6eb7a78d9abbbc4245ab4f3ab258b6f827e13ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M985,-425C985,-425 821,-425 821,-425 815,-425 809,-419 809,-413 809,-413 809,-401 809,-401 809,-395 815,-389 821,-389 821,-389 985,-389 985,-389 991,-389 997,-395 997,-401 997,-401 997,-413 997,-413 997,-419 991,-425 985,-425"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-403.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Self Boost Management"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Self Boost Management",
                    tailId: "Rotation"
                }}><GroupWrapper id="73746e89f85b52d1f9d9a4f84871bea6859d5c75" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M678.25,-407C709.8,-407 756.35,-407 798.82,-407"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="798.95,-410.5 808.95,-407 798.95,-403.5 798.95,-410.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Speed",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Game Speed",
                    upstreamSkills: [],
                    downstreamSkills: ["Game Awareness"]
                }}><GroupWrapper id="c47f3d4df7d8556cd1bf2b526a12ce140a896a94" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M681,-533C681,-533 598,-533 598,-533 592,-533 586,-527 586,-521 586,-521 586,-509 586,-509 586,-503 592,-497 598,-497 598,-497 681,-497 681,-497 687,-497 693,-503 693,-509 693,-509 693,-521 693,-521 693,-527 687,-533 681,-533"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-511.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Game Speed"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Game Speed"
                }}><GroupWrapper id="630e285f11754702182280c9673f6d7525052569" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693.1,-515C730.17,-515 780.47,-515 822.42,-515"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="822.61,-518.5 832.61,-515 822.61,-511.5 822.61,-518.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Prediction"
                }}><GroupWrapper id="2fbce5d5cb08c9e3b5b28c5b2e122d00c7b59e01" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M665.42,-658.82C692.43,-638.88 736.56,-605.63 773,-575 789.61,-561.03 790.08,-552.64 809,-542 813.55,-539.44 818.37,-537.1 823.33,-534.97"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="824.98,-538.08 832.98,-531.13 822.39,-531.58 824.98,-538.08"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Pre-Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Pre-Jumping",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Dunking"]
                }}><GroupWrapper id="31b1c68d0c763bd78d74aa80fa015f89ca816635" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M943.5,-749C943.5,-749 862.5,-749 862.5,-749 856.5,-749 850.5,-743 850.5,-737 850.5,-737 850.5,-725 850.5,-725 850.5,-719 856.5,-713 862.5,-713 862.5,-713 943.5,-713 943.5,-713 949.5,-713 955.5,-719 955.5,-725 955.5,-725 955.5,-737 955.5,-737 955.5,-743 949.5,-749 943.5,-749"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-727.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Pre-Jumping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Pre-Jumping",
                    tailId: "Prediction"
                }}><GroupWrapper id="d4e13a0daae87bc7082db04fd54cc27db9a4a959" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.56,-686.1C727.23,-694.91 792.32,-708.35 840.17,-718.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="839.6,-721.69 850.1,-720.28 841.02,-714.83 839.6,-721.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cutting",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Cutting",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="750fe6eb4a39e4f1fd5ae30f1e7e0384a489c056" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M926.5,-695C926.5,-695 879.5,-695 879.5,-695 873.5,-695 867.5,-689 867.5,-683 867.5,-683 867.5,-671 867.5,-671 867.5,-665 873.5,-659 879.5,-659 879.5,-659 926.5,-659 926.5,-659 932.5,-659 938.5,-665 938.5,-671 938.5,-671 938.5,-683 938.5,-683 938.5,-689 932.5,-695 926.5,-695"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-673.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Cutting"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cutting",
                    tailId: "Prediction"
                }}><GroupWrapper id="7a0bd30db6e0621af48c9cc65ab6295c941fb508" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.56,-677C732.57,-677 808.95,-677 857.23,-677"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="857.38,-680.5 867.38,-677 857.38,-673.5 857.38,-680.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Faking",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Faking",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="cb7144819d80f8b5b3a7e0d5f75f4e1a9642b668" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M923.5,-641C923.5,-641 882.5,-641 882.5,-641 876.5,-641 870.5,-635 870.5,-629 870.5,-629 870.5,-617 870.5,-617 870.5,-611 876.5,-605 882.5,-605 882.5,-605 923.5,-605 923.5,-605 929.5,-605 935.5,-611 935.5,-617 935.5,-617 935.5,-629 935.5,-629 935.5,-635 929.5,-641 923.5,-641"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-619.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Faking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Faking",
                    tailId: "Prediction"
                }}><GroupWrapper id="9cb42e435c1a2484a1d90b27ada123b31d29ed07" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.56,-667.9C733.52,-657.79 811.98,-641.59 860.06,-631.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="861.04,-635.03 870.13,-629.58 859.63,-628.18 861.04,-635.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Softblock",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Softblock",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="69add1126959a35c36aa060f4a758a5e3ff23617" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M932.5,-587C932.5,-587 873.5,-587 873.5,-587 867.5,-587 861.5,-581 861.5,-575 861.5,-575 861.5,-563 861.5,-563 861.5,-557 867.5,-551 873.5,-551 873.5,-551 932.5,-551 932.5,-551 938.5,-551 944.5,-557 944.5,-563 944.5,-563 944.5,-575 944.5,-575 944.5,-581 938.5,-587 932.5,-587"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-565.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Softblock"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Softblock",
                    tailId: "Prediction"
                }}><GroupWrapper id="6653f1c7ab683566a092a4bb4dd44dbc5b5e38d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M673.98,-658.87C707.47,-641.22 760.8,-614.44 809,-596 822.52,-590.83 837.47,-586.08 851.35,-582.06"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="852.57,-585.35 861.24,-579.26 850.66,-578.62 852.57,-585.35"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Catching",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Catching",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Wall catch"]
                }}><GroupWrapper id="2b9bcf7bbecd708379dfee8a9b9b2044a98476b3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M931,-479C931,-479 875,-479 875,-479 869,-479 863,-473 863,-467 863,-467 863,-455 863,-455 863,-449 869,-443 875,-443 875,-443 931,-443 931,-443 937,-443 943,-449 943,-455 943,-455 943,-467 943,-467 943,-473 937,-479 931,-479"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-457.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Catching"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Catching",
                    tailId: "Prediction"
                }}><GroupWrapper id="02d351bfa707895de9cc91d3f16b92318244efa6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M660.56,-658.83C687.6,-633.85 736.57,-586.87 773,-542 791.18,-519.61 785.74,-505.06 809,-488 821.79,-478.62 837.78,-472.49 852.88,-468.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="853.72,-471.88 862.63,-466.15 852.09,-465.07 853.72,-471.88"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Prediction"
                }}><GroupWrapper id="9edddb9f9f4947781b86746b9f875bc69a1e8cbc" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M653.09,-695.16C678.45,-730.37 739.26,-808.14 809,-850 815.69,-854.02 823.01,-857.46 830.51,-860.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="829.49,-863.76 840.08,-863.9 831.88,-857.19 829.49,-863.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Bounce dribbling",
                    upstreamSkills: ["Prediction", "Push dribbling"],
                    downstreamSkills: ["Bounce to air dribble", "Tornado Flick / Spin", "Breezi Flick"]
                }}><GroupWrapper id="cb5f223c0110f96fa41789e4d7d0a30e93b35cd5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1206.5,-1333C1206.5,-1333 1089.5,-1333 1089.5,-1333 1083.5,-1333 1077.5,-1327 1077.5,-1321 1077.5,-1321 1077.5,-1309 1077.5,-1309 1077.5,-1303 1083.5,-1297 1089.5,-1297 1089.5,-1297 1206.5,-1297 1206.5,-1297 1212.5,-1297 1218.5,-1303 1218.5,-1309 1218.5,-1309 1218.5,-1321 1218.5,-1321 1218.5,-1327 1212.5,-1333 1206.5,-1333"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1311.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bounce Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce dribbling",
                    tailId: "Prediction"
                }}><GroupWrapper id="18ffd6d5c0815ba52b742a26c23bb8e84655a92f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M672.11,-695.15C705.25,-713.45 759.3,-741.32 809,-758 889.82,-785.12 940,-732.61 997,-796 1054.31,-859.73 999.83,-1100.97 1033,-1180 1051.58,-1224.28 1090.07,-1264.89 1117.17,-1289.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1115.05,-1292.56 1124.83,-1296.65 1119.73,-1287.36 1115.05,-1292.56"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Prediction"
                }}><GroupWrapper id="6bc6bf6f6cd4304d059809f4565e825bab3d5f13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M663.02,-695.1C694.26,-719.51 753.23,-763.15 809,-791 819.98,-796.48 832.13,-801.41 843.92,-805.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="843.11,-809.08 853.7,-809.07 845.41,-802.47 843.11,-809.08"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Dunking",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Dunking",
                    upstreamSkills: ["Pre-Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1ce809bfee8fa8ad999a8fad944514ab2a193edd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1174.5,-1046C1174.5,-1046 1121.5,-1046 1121.5,-1046 1115.5,-1046 1109.5,-1040 1109.5,-1034 1109.5,-1034 1109.5,-1022 1109.5,-1022 1109.5,-1016 1115.5,-1010 1121.5,-1010 1121.5,-1010 1174.5,-1010 1174.5,-1010 1180.5,-1010 1186.5,-1016 1186.5,-1022 1186.5,-1022 1186.5,-1034 1186.5,-1034 1186.5,-1040 1180.5,-1046 1174.5,-1046"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1024.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Dunking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Dunking",
                    tailId: "Pre-Jumping"
                }}><GroupWrapper id="624eb4431d3a01fbcda01962bb9606910f24d20b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M955.76,-738.26C971.13,-742.92 986.62,-750.54 997,-763 1065.49,-845.18 960.53,-922.3 1033,-1001 1049.68,-1019.12 1076.09,-1026.14 1099.28,-1028.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1099.09,-1032 1109.33,-1029.27 1099.62,-1025.02 1099.09,-1032"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Goalie Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Goalie Demos",
                    upstreamSkills: ["Basic Demos"],
                    downstreamSkills: []
                }}><GroupWrapper id="4a28cafe911bf4ae8e044789441ae3d4cd2c6576" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M948.5,-1117C948.5,-1117 857.5,-1117 857.5,-1117 851.5,-1117 845.5,-1111 845.5,-1105 845.5,-1105 845.5,-1093 845.5,-1093 845.5,-1087 851.5,-1081 857.5,-1081 857.5,-1081 948.5,-1081 948.5,-1081 954.5,-1081 960.5,-1087 960.5,-1093 960.5,-1093 960.5,-1105 960.5,-1105 960.5,-1111 954.5,-1117 948.5,-1117"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1095.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Goalie Demos"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Goalie Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="02e51b4e5b1f27760f2c22fdbe3eba01bfd80e33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.12,-1172.99C717.92,-1159.33 766.07,-1140.48 809,-1126 817.54,-1123.12 826.58,-1120.26 835.54,-1117.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="836.62,-1120.87 845.2,-1114.65 834.62,-1114.16 836.62,-1120.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Air Demos",
                    upstreamSkills: ["Basic Demos", "Basic aerials"],
                    downstreamSkills: ["Air Dribble to Demo"]
                }}><GroupWrapper id="bad725340e6b5269093a4ee7bb2589b16cb4b07c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M936.5,-1339C936.5,-1339 869.5,-1339 869.5,-1339 863.5,-1339 857.5,-1333 857.5,-1327 857.5,-1327 857.5,-1315 857.5,-1315 857.5,-1309 863.5,-1303 869.5,-1303 869.5,-1303 936.5,-1303 936.5,-1303 942.5,-1303 948.5,-1309 948.5,-1315 948.5,-1315 948.5,-1327 948.5,-1327 948.5,-1333 942.5,-1339 936.5,-1339"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1317.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Demos"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="fe6b2b43b66db6b558febc32a7bfbac1bfff3165" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M676.86,-1209.08C723.76,-1232.39 805.36,-1272.96 856.37,-1298.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="855.02,-1301.55 865.53,-1302.87 858.13,-1295.28 855.02,-1301.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Dribble to Demo",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Air Dribble to Demo",
                    upstreamSkills: ["Air Demos", "Air dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="cc0f8509ac5d9e08c6be164a987b56555f0b2005" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1455.5,-1425C1455.5,-1425 1317.5,-1425 1317.5,-1425 1311.5,-1425 1305.5,-1419 1305.5,-1413 1305.5,-1413 1305.5,-1401 1305.5,-1401 1305.5,-1395 1311.5,-1389 1317.5,-1389 1317.5,-1389 1455.5,-1389 1455.5,-1389 1461.5,-1389 1467.5,-1395 1467.5,-1401 1467.5,-1401 1467.5,-1413 1467.5,-1413 1467.5,-1419 1461.5,-1425 1455.5,-1425"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1403.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Dribble To Demo"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble to Demo",
                    tailId: "Air Demos"
                }}><GroupWrapper id="c4e39ecafc958bef406000ddc9296e8f93d2a1c0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M948.57,-1328.26C1041.29,-1343.37 1247.65,-1377.05 1263,-1380 1273.92,-1382.1 1285.35,-1384.43 1296.66,-1386.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1296.04,-1390.27 1306.55,-1388.94 1297.51,-1383.43 1296.04,-1390.27"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall catch",
                    tailId: "Catching"
                }}><GroupWrapper id="04255f1ce01cff07d202d051c087cf16444e85ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M943.32,-459.33C962.33,-456.38 983.83,-449.5 997,-434 1083.11,-332.68 944.39,-236.13 1033,-137 1047.56,-120.71 1069.97,-113.34 1091.09,-110.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1091.78,-113.71 1101.31,-109.08 1090.97,-106.76 1091.78,-113.71"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Forward half flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Forward half flipping",
                    upstreamSkills: ["Half flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="d4e2f4dd965ce87f034484e11bc002c0f51b4cad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1462,-2555C1462,-2555 1311,-2555 1311,-2555 1305,-2555 1299,-2549 1299,-2543 1299,-2543 1299,-2531 1299,-2531 1299,-2525 1305,-2519 1311,-2519 1311,-2519 1462,-2519 1462,-2519 1468,-2519 1474,-2525 1474,-2531 1474,-2531 1474,-2543 1474,-2543 1474,-2549 1468,-2555 1462,-2555"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2533.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Forward Half Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Forward half flipping",
                    tailId: "Half flipping"
                }}><GroupWrapper id="3c4a0763becb7b270f1521194a57cb81990b7454" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.26,-2537C1228.51,-2537 1259.33,-2537 1288.4,-2537"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1288.59,-2540.5 1298.59,-2537 1288.59,-2533.5 1288.59,-2540.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tornado Flick / Spin",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Tornado Flick / Spin",
                    upstreamSkills: ["Tornado spin", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="58c831a400d054a656225db6965364b2dbd9ba76" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1871,-1306C1871,-1306 1736,-1306 1736,-1306 1730,-1306 1724,-1300 1724,-1294 1724,-1294 1724,-1282 1724,-1282 1724,-1276 1730,-1270 1736,-1270 1736,-1270 1871,-1270 1871,-1270 1877,-1270 1883,-1276 1883,-1282 1883,-1282 1883,-1294 1883,-1294 1883,-1300 1877,-1306 1871,-1306"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1803.5"
                        y="-1284.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Tornado Flick / Spin"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Tornado spin"
                }}><GroupWrapper id="730633388a8ffa5dbcb6e4b8a8c1d335830d5742" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1630.54,-1267.5C1655.37,-1270.46 1685.41,-1274.04 1713.39,-1277.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1713.24,-1280.88 1723.59,-1278.59 1714.07,-1273.93 1713.24,-1280.88"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Breezi Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Breezi Flick",
                    upstreamSkills: ["Tornado spin", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="78c633192e33640847f65ab13614156fc4721a49" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1842,-1243C1842,-1243 1765,-1243 1765,-1243 1759,-1243 1753,-1237 1753,-1231 1753,-1231 1753,-1219 1753,-1219 1753,-1213 1759,-1207 1765,-1207 1765,-1207 1842,-1207 1842,-1207 1848,-1207 1854,-1213 1854,-1219 1854,-1219 1854,-1231 1854,-1231 1854,-1237 1848,-1243 1842,-1243"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1803.5"
                        y="-1221.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Breezi Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Tornado spin"
                }}><GroupWrapper id="ded1f8273b2b83fa63d22a2814ea4316f9d7ae35" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1630.54,-1252.33C1664.38,-1246.95 1707.88,-1240.04 1742.66,-1234.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1743.36,-1237.94 1752.69,-1232.92 1742.26,-1231.03 1743.36,-1237.94"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="78bdf96a28ae2d5fa30ddb36fa10c0123ef2e9d0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.07,-1402.6C718.47,-1397.22 747.53,-1389.9 773,-1381 802.46,-1370.7 834.27,-1355.96 858.93,-1343.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="860.65,-1346.71 868.01,-1339.08 857.5,-1340.46 860.65,-1346.71"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="3800ea18673cc16cddd3c4d4de11234809ab25f8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.1,-1413.22C721.37,-1410.42 752.91,-1402.23 773,-1381 833.87,-1316.66 751.23,-1252.14 809,-1185 813.49,-1179.78 818.87,-1175.41 824.75,-1171.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="826.57,-1174.75 833.68,-1166.89 823.23,-1168.6 826.57,-1174.75"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Double jump aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="d64a14ba6ae8d0a80c29e380c9eb93b01b9c3493" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.05,-1424.06C728,-1431.07 772.78,-1440.32 812.09,-1448.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="811.45,-1451.88 821.95,-1450.47 812.87,-1445.02 811.45,-1451.88"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Fast aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="1d02213e3107a4ebb7aa91ceae7b22268523e48d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.05,-1413C737.02,-1413 797.33,-1413 841.94,-1413"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="842.07,-1416.5 852.07,-1413 842.07,-1409.5 842.07,-1416.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backwards aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="3f235ad3a8524a6801f94ccb9b6dfc7ff26adcb7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.25,-1420.29C719.67,-1425.6 749.51,-1434.65 773,-1450 794.15,-1463.82 792.53,-1474.84 809,-1494 831.98,-1520.73 859.07,-1550.55 878.07,-1571.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="875.57,-1573.66 884.92,-1578.64 880.72,-1568.91 875.57,-1573.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Sideways aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Sideways aerials",
                    upstreamSkills: ["Basic aerials", "Air roll shots"],
                    downstreamSkills: ["Tornado spin"]
                }}><GroupWrapper id="bcfeb56f9d582050fe5b94a3c8328133136aba87" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1443.5,-1187C1443.5,-1187 1329.5,-1187 1329.5,-1187 1323.5,-1187 1317.5,-1181 1317.5,-1175 1317.5,-1175 1317.5,-1163 1317.5,-1163 1317.5,-1157 1323.5,-1151 1329.5,-1151 1329.5,-1151 1443.5,-1151 1443.5,-1151 1449.5,-1151 1455.5,-1157 1455.5,-1163 1455.5,-1163 1455.5,-1175 1455.5,-1175 1455.5,-1181 1449.5,-1187 1443.5,-1187"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1165.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Sideways Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Sideways aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="8130ae266add859e91df1269174e8fe3d4b4c4d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M664.88,-1394.96C707.7,-1363.41 793.39,-1300.86 809,-1294 820.49,-1288.95 1152.55,-1218.31 1307.4,-1185.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1308.28,-1188.9 1317.34,-1183.41 1306.83,-1182.06 1308.28,-1188.9"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="fadc556dadbe15d619d890597983a84f224b8ef4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M656.74,-1394.9C685.17,-1362.16 743.69,-1289.81 773,-1218 807.13,-1134.38 775.45,-1101.85 809,-1018 826.47,-974.33 858.56,-930.03 880.09,-903.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="882.84,-905.2 886.41,-895.23 877.39,-900.8 882.84,-905.2"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="47c1377f4d0f354dfba0026f47c5378ce578cd6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M671.34,-1394.93C699.88,-1377.22 742.39,-1348.26 773,-1316 793.11,-1294.81 785.23,-1277.99 809,-1261 879.16,-1210.85 941.85,-1279.29 997,-1213 1073.35,-1121.23 955.85,-768.1 1033,-677 1044.37,-663.57 1061.08,-656.13 1078.22,-652.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1079.16,-655.56 1088.32,-650.23 1077.84,-648.68 1079.16,-655.56"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="b75a8be85276490a8b8bcd8b6b43bf46d55153a4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M676.15,-1394.89C705.88,-1378.12 747.38,-1350.59 773,-1316 801.86,-1277.03 772.04,-1244.39 809,-1213 873.66,-1158.08 940.38,-1243.17 997,-1180 1079.79,-1087.64 952.96,-717.76 1033,-623 1045.18,-608.58 1063.52,-601.06 1081.94,-597.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1082.56,-600.79 1091.85,-595.69 1081.41,-593.89 1082.56,-600.79"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Air dribbling",
                    upstreamSkills: [],

                    downstreamSkills: [
                        "Air Dribble to Demo",
                        "hood to air dribble",
                        "Bounce to air dribble",
                        "Wall Air dribble"
                    ]
                }}><GroupWrapper id="647de96687b5f1b73867a507ae74b6096b467c45" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1191,-1479C1191,-1479 1105,-1479 1105,-1479 1099,-1479 1093,-1473 1093,-1467 1093,-1467 1093,-1455 1093,-1455 1093,-1449 1099,-1443 1105,-1443 1105,-1443 1191,-1443 1191,-1443 1197,-1443 1203,-1449 1203,-1455 1203,-1455 1203,-1467 1203,-1467 1203,-1473 1197,-1479 1191,-1479"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1457.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble to Demo",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="d8c849e07c4e21b64676bde51be8b8feb662d45c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.26,-1448.61C1230.82,-1442.32 1265.03,-1434.51 1296.33,-1427.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1297.41,-1430.7 1306.38,-1425.07 1295.85,-1423.88 1297.41,-1430.7"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "hood to air dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "hood to air dribble",
                    upstreamSkills: ["Air dribbling", "Hood dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="ba2dc3a69ab1146a34f6909c21e4ef807b14ad37" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.5,-1571C1453.5,-1571 1319.5,-1571 1319.5,-1571 1313.5,-1571 1307.5,-1565 1307.5,-1559 1307.5,-1559 1307.5,-1547 1307.5,-1547 1307.5,-1541 1313.5,-1535 1319.5,-1535 1319.5,-1535 1453.5,-1535 1453.5,-1535 1459.5,-1535 1465.5,-1541 1465.5,-1547 1465.5,-1547 1465.5,-1559 1465.5,-1559 1465.5,-1565 1459.5,-1571 1453.5,-1571"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1549.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hood To Air Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "hood to air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="5f703ff28fee8e5da5396bf9a480519af4baa336" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1195.44,-1479.07C1233.92,-1494.04 1288.74,-1515.36 1329.62,-1531.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1328.58,-1534.61 1339.16,-1534.97 1331.11,-1528.09 1328.58,-1534.61"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce to air dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Bounce to air dribble",
                    upstreamSkills: ["Air dribbling", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="9354bfe67d752a0f523ec603919747179ff365a8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1461,-1371C1461,-1371 1312,-1371 1312,-1371 1306,-1371 1300,-1365 1300,-1359 1300,-1359 1300,-1347 1300,-1347 1300,-1341 1306,-1335 1312,-1335 1312,-1335 1461,-1335 1461,-1335 1467,-1335 1473,-1341 1473,-1347 1473,-1347 1473,-1359 1473,-1359 1473,-1365 1467,-1371 1461,-1371"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1349.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bounce To Air Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce to air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="f7894eef5cb5acdf00b84d9ae060eea6ede5864a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.19,-1456.57C1223.35,-1452.86 1245.55,-1446.14 1263,-1434 1286.68,-1417.53 1275.91,-1397.29 1299,-1380 1300.84,-1378.62 1302.76,-1377.31 1304.73,-1376.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1306.69,-1378.98 1313.7,-1371.03 1303.26,-1372.88 1306.69,-1378.98"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Air dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wall Air dribble",
                    upstreamSkills: ["Air dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="c2a8946dd0dab510c518dda78067266ecd466515" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1440,-1479C1440,-1479 1333,-1479 1333,-1479 1327,-1479 1321,-1473 1321,-1467 1321,-1467 1321,-1455 1321,-1455 1321,-1449 1327,-1443 1333,-1443 1333,-1443 1440,-1443 1440,-1443 1446,-1443 1452,-1449 1452,-1455 1452,-1455 1452,-1467 1452,-1467 1452,-1473 1446,-1479 1440,-1479"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1457.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Air Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="a17f4812c0305752a343e9c54e2f545defb256e8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.26,-1461C1235.16,-1461 1275.95,-1461 1310.85,-1461"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1310.99,-1464.5 1320.99,-1461 1310.99,-1457.5 1310.99,-1464.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Sideways aerials",
                    tailId: "Air roll shots"
                }}><GroupWrapper id="cb221c554e41d3109ed5343d97cec2c4a70220c6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1205.65,-1156.83C1235.99,-1158.89 1273.84,-1161.45 1306.98,-1163.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1306.88,-1167.19 1317.1,-1164.37 1307.35,-1160.21 1306.88,-1167.19"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Backwards aerials"
                }}><GroupWrapper id="b946e51387a79af9781dccec86a3a3f0a40dac57" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M935.3,-1578.88C970.07,-1558.9 1022.69,-1529.13 1033,-1526 1127.13,-1497.44 1394,-1545.22 1474,-1488 1540.41,-1440.5 1563.3,-1338.86 1570.71,-1289.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1574.19,-1289.68 1572.1,-1279.29 1567.26,-1288.72 1574.19,-1289.68"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Sideways aerials"
                }}><GroupWrapper id="b152fdb4137fa7058fa0ee1360879b1ffe8fd749" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1424.35,-1187.18C1454.1,-1201.86 1496.14,-1222.59 1528.09,-1238.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1526.71,-1241.58 1537.23,-1242.86 1529.81,-1235.3 1526.71,-1241.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hood dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Hood dribble",
                    upstreamSkills: ["Push dribbling"],
                    downstreamSkills: ["hood to air dribble", "Power Slide Dribble", "Directional Flick"]
                }}><GroupWrapper id="4c61f86edb9a6722edee939ef919a0f3f51681a3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1192,-1571C1192,-1571 1104,-1571 1104,-1571 1098,-1571 1092,-1565 1092,-1559 1092,-1559 1092,-1547 1092,-1547 1092,-1541 1098,-1535 1104,-1535 1104,-1535 1192,-1535 1192,-1535 1198,-1535 1204,-1541 1204,-1547 1204,-1547 1204,-1559 1204,-1559 1204,-1565 1198,-1571 1192,-1571"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1549.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hood Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hood dribble",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="171d3393df4e87a5d37dd9ade1883b19d3b3fb41" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.37,-1638.9C976.43,-1635.16 987.46,-1630.3 997,-1624 1018.08,-1610.07 1011.58,-1593.4 1033,-1580 1047.7,-1570.81 1065.26,-1564.74 1082.14,-1560.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1082.93,-1564.15 1091.97,-1558.62 1081.45,-1557.31 1082.93,-1564.15"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce dribbling",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="ea33b285cc29ef5dd53146a0ce166e8907d90c3b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.3,-1643.84C977.3,-1639.75 988.71,-1633.5 997,-1624 1069.06,-1541.4 971.15,-1470.5 1033,-1380 1045.65,-1361.49 1065.42,-1347.6 1084.97,-1337.52"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1086.76,-1340.55 1094.21,-1333.02 1083.69,-1334.26 1086.76,-1340.55"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="bc8ee86d653fdb76f81d6e04a8e0036198d849d0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.13,-1668.83C991.74,-1676.52 1019.81,-1684.55 1033,-1688 1045.54,-1691.28 1058.91,-1694.6 1071.91,-1697.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1071.22,-1701.18 1081.76,-1700.1 1072.85,-1694.37 1071.22,-1701.18"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "hood to air dribble",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="c76613cf8ab5ade59c84cf6fb9e193af47351fa0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1204.15,-1553C1231.86,-1553 1266.11,-1553 1297.36,-1553"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1297.38,-1556.5 1307.38,-1553 1297.38,-1549.5 1297.38,-1556.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="d299a91979286074dcc1ba023402956113417ab6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1200.21,-1534.89C1222.65,-1524.47 1247.38,-1509.17 1263,-1488 1306.79,-1428.65 1259.04,-1388 1299,-1326 1309.73,-1309.35 1326.3,-1295.38 1342.08,-1284.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1344.22,-1287.5 1350.72,-1279.14 1340.42,-1281.62 1344.22,-1287.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="b2539993659fa6ad68fb4efe04bff79dc2bdeb2d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1204.18,-1553.26C1225.46,-1556.29 1248.19,-1563.64 1263,-1580 1303.61,-1624.89 1288.96,-1790.31 1299,-1850 1324.32,-2000.48 1363.76,-2179.05 1379.1,-2246.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1375.72,-2247.88 1381.34,-2256.86 1382.55,-2246.33 1375.72,-2247.88"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce to air dribble",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="edc991954571e41ad4b6e92aafb66f09c388dbd9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218.68,-1326.2C1240.97,-1329.78 1266.06,-1333.81 1289.87,-1337.63"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1289.55,-1341.13 1299.98,-1339.26 1290.66,-1334.22 1289.55,-1341.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="007ee0c3010fd2f75044a149df90bd0965f401ba" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218.63,-1312.12C1338.18,-1307.18 1582.31,-1297.1 1713.84,-1291.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1714.04,-1295.16 1723.89,-1291.25 1713.75,-1288.16 1714.04,-1295.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="9aba1c670dc9d53349ceb3a3ebd3384003960793" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218.58,-1303.34C1234.08,-1298.66 1249.82,-1292.13 1263,-1283 1285.22,-1267.62 1275,-1246.42 1299,-1234 1374.56,-1194.9 1626.25,-1210.05 1742.59,-1219.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1742.49,-1223.07 1752.74,-1220.41 1743.07,-1216.09 1742.49,-1223.07"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "45 degree flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="20b84fca4ce8c7c8a278f764abbffe62cba90175" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1402.76,-2293.09C1435.77,-2332.2 1513.88,-2424.76 1552.13,-2470.08"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1549.66,-2472.59 1558.79,-2477.97 1555.01,-2468.08 1549.66,-2472.59"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Musty Flick",
                    isUnnecessary: true,
                    isRecommended: false,
                    notes: [],
                    title: "Musty Flick",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="2f919bdec851e293a32953373f2fe7249af39cab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.5,-2320C1613.5,-2320 1536.5,-2320 1536.5,-2320 1530.5,-2320 1524.5,-2314 1524.5,-2308 1524.5,-2308 1524.5,-2296 1524.5,-2296 1524.5,-2290 1530.5,-2284 1536.5,-2284 1536.5,-2284 1613.5,-2284 1613.5,-2284 1619.5,-2284 1625.5,-2290 1625.5,-2296 1625.5,-2296 1625.5,-2308 1625.5,-2308 1625.5,-2314 1619.5,-2320 1613.5,-2320"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-2298.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Musty Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Musty Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="702449faeb3b2b4420f8ef7f458b5c724ca44ad8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.52,-2284.56C1473.32,-2287.43 1494.93,-2290.55 1514.31,-2293.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1513.82,-2296.82 1524.22,-2294.79 1514.82,-2289.9 1513.82,-2296.82"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Delayed Flicks",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Delayed Flicks",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: ["Mognus Flick (180 backflip flick)"]
                }}><GroupWrapper id="f98ade5cba23fdc5ba98b6019d8a6c89885d1eca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1623.5,-2266C1623.5,-2266 1526.5,-2266 1526.5,-2266 1520.5,-2266 1514.5,-2260 1514.5,-2254 1514.5,-2254 1514.5,-2242 1514.5,-2242 1514.5,-2236 1520.5,-2230 1526.5,-2230 1526.5,-2230 1623.5,-2230 1623.5,-2230 1629.5,-2230 1635.5,-2236 1635.5,-2242 1635.5,-2242 1635.5,-2254 1635.5,-2254 1635.5,-2260 1629.5,-2266 1623.5,-2266"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-2244.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Delayed Flicks"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Delayed Flicks",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="09a925621b6b66c33763adab53b0f6fb39fff733" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.52,-2265.44C1469.92,-2263.07 1487.55,-2260.52 1504.13,-2258.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1504.9,-2261.54 1514.29,-2256.64 1503.9,-2254.61 1504.9,-2261.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Mognus Flick (180 backflip flick)",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Mognus Flick (180 backflip flick)",
                    upstreamSkills: ["Delayed Flicks"],
                    downstreamSkills: []
                }}><GroupWrapper id="8acee1c4e2c55e829ffa2d1fb40445ac3bd2b84a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1919,-2266C1919,-2266 1688,-2266 1688,-2266 1682,-2266 1676,-2260 1676,-2254 1676,-2254 1676,-2242 1676,-2242 1676,-2236 1682,-2230 1688,-2230 1688,-2230 1919,-2230 1919,-2230 1925,-2230 1931,-2236 1931,-2242 1931,-2242 1931,-2254 1931,-2254 1931,-2260 1925,-2266 1919,-2266"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1803.5"
                        y="-2244.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Mognus Flick (180 Backflip Flick)"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Mognus Flick (180 backflip flick)",
                    tailId: "Delayed Flicks"
                }}><GroupWrapper id="019b72d3cf8cd5ad78f9a6ddae510156779c3fb5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1635.51,-2248C1645.05,-2248 1655.24,-2248 1665.72,-2248"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1665.84,-2251.5 1675.84,-2248 1665.84,-2244.5 1665.84,-2251.5"></PolygonWrapper></GroupWrapper></Prerequisite></GroupWrapper></></SvgWrapper>)})