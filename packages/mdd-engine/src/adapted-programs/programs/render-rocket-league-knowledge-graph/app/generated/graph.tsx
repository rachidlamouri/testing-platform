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

export const RootGraph: SvgWrapperComponent = forwardRef<SVGSVGElement>((props, ref) => { return  (<SvgWrapper
    width="100%"
    height="100%"
    viewBox="0.00 0.00 4388.00 6049.00"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}><><GroupWrapper
            id="1adafe6db7788063f4117ab4c77b6c55bc78bcab"
            className="graph"
            transform="scale(1 1) rotate(0) translate(4 6045)"><PolygonWrapper
                fill="white"
                stroke="transparent"
                points="-4,4 -4,-6045 4384,-6045 4384,4 -4,4"></PolygonWrapper><Skill
                {...{
                    id: "Jumping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: ["Has in-game tutorial.", {
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }],

                    title: "Jumping",
                    description: "Preform by pressing the button for jumping in the controls panel.",
                    rank: "",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "Double Jumping",
                        "Flipping",
                        "Bounce Powershots",
                        "Ball camera control",
                        "Joystick air roll",
                        "Directional air roll",
                        "Flip window",
                        "Popping",
                        "Wall pinch",
                        "Basic aerials",
                        "Hoops - Friendship / fusion Kickoff"
                    ]
                }}><GroupWrapper id="38d0bb0d896dbbec2e35ed651df7e15babe319b5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M966,-4042C966,-4042 785,-4042 785,-4042 779,-4042 773,-4036 773,-4030 773,-4030 773,-3960 773,-3960 773,-3954 779,-3948 785,-3948 785,-3948 966,-3948 966,-3948 972,-3948 978,-3954 978,-3960 978,-3960 978,-4030 978,-4030 978,-4036 972,-4042 966,-4042"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-4006.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-3966.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Double Jumping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }],

                    title: "Double Jumping",
                    description: "Pressing the button for jump in the control panel.",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Double jump aerials", "Fast aerials", "Spring Roll"]
                }}><GroupWrapper id="03c645b9ea53657cc27a20182e7610dcc89b94ee" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1602,-3741C1602,-3741 1310,-3741 1310,-3741 1304,-3741 1298,-3735 1298,-3729 1298,-3729 1298,-3659 1298,-3659 1298,-3653 1304,-3647 1310,-3647 1310,-3647 1602,-3647 1602,-3647 1608,-3647 1614,-3653 1614,-3659 1614,-3659 1614,-3729 1614,-3729 1614,-3735 1608,-3741 1602,-3741"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3705.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3665.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jumping",
                    tailId: "Jumping"
                }}><GroupWrapper id="968f8634e8cf7c030c4fbb56a8841097ca9a258b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M947.59,-3947.92C995.86,-3916.79 1061.65,-3875.98 1122,-3844 1189.82,-3808.06 1267.95,-3772.57 1331.49,-3745.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1332.95,-3748.32 1340.75,-3741.15 1330.18,-3741.89 1332.95,-3748.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flipping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: ["Has in-game tutorial.", {
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }],

                    title: "Flipping",
                    description: "Pressing the action for jump in the air, while turning the car.",
                    rank: "",
                    upstreamSkills: ["Jumping"],

                    downstreamSkills: [
                        "50/50’s + Kickoffs",
                        "Wave dash",
                        "Diagonal Flipping",
                        "Speed flipping",
                        "Backflip shot",
                        "Tilted drift",
                        "Flip canceling",
                        "Directional Flick",
                        "Rumble - Spike Flicks"
                    ]
                }}><GroupWrapper id="61b9cf036213209cd135a592fa61c15f6a53072e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-5461C1546.5,-5461 1365.5,-5461 1365.5,-5461 1359.5,-5461 1353.5,-5455 1353.5,-5449 1353.5,-5449 1353.5,-5379 1353.5,-5379 1353.5,-5373 1359.5,-5367 1365.5,-5367 1365.5,-5367 1546.5,-5367 1546.5,-5367 1552.5,-5367 1558.5,-5373 1558.5,-5379 1558.5,-5379 1558.5,-5449 1558.5,-5449 1558.5,-5455 1552.5,-5461 1546.5,-5461"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5425.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5385.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flipping",
                    tailId: "Jumping"
                }}><GroupWrapper id="96092db701ed22de4a7d19868e7adbf9d35b541e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M878.05,-4042.02C885.05,-4198.93 922.81,-4715.05 1122,-5078 1186.71,-5195.92 1304.92,-5300.49 1381.69,-5360.52"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1379.87,-5363.53 1389.91,-5366.9 1384.16,-5358 1379.87,-5363.53"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Jumping", "Powershot + Powerclears"],
                    downstreamSkills: ["Air roll shots"]
                }}><GroupWrapper id="b209979857f96555ea66ffe9ffcb87645ccec92f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2233.5,-2861C2233.5,-2861 1877.5,-2861 1877.5,-2861 1871.5,-2861 1865.5,-2855 1865.5,-2849 1865.5,-2849 1865.5,-2779 1865.5,-2779 1865.5,-2773 1871.5,-2767 1877.5,-2767 1877.5,-2767 2233.5,-2767 2233.5,-2767 2239.5,-2767 2245.5,-2773 2245.5,-2779 2245.5,-2779 2245.5,-2849 2245.5,-2849 2245.5,-2855 2239.5,-2861 2233.5,-2861"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2825.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce Powershots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2785.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Jumping"
                }}><GroupWrapper id="29ed75b408be8185556eb730bdc5870d85da7d79" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M878,-3947.62C884.71,-3822.46 921.45,-3481.55 1122,-3319 1354.92,-3130.22 1582.15,-3441.07 1790,-3225 1844.97,-3167.86 1773.97,-2929.83 1826,-2870 1834.86,-2859.81 1845.25,-2851.31 1856.62,-2844.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1858.59,-2847.16 1865.49,-2839.12 1855.08,-2841.09 1858.59,-2847.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ball camera control",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Ball camera control",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Push dribbling"]
                }}><GroupWrapper id="57d57fd83c40caa7d68b83b1572e094e8324684b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.5,-4238C1642.5,-4238 1269.5,-4238 1269.5,-4238 1263.5,-4238 1257.5,-4232 1257.5,-4226 1257.5,-4226 1257.5,-4156 1257.5,-4156 1257.5,-4150 1263.5,-4144 1269.5,-4144 1269.5,-4144 1642.5,-4144 1642.5,-4144 1648.5,-4144 1654.5,-4150 1654.5,-4156 1654.5,-4156 1654.5,-4226 1654.5,-4226 1654.5,-4232 1648.5,-4238 1642.5,-4238"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4202.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ball Camera Control"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4162.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ball camera control",
                    tailId: "Jumping"
                }}><GroupWrapper id="e4eb51790b6963ed4042ffcc42eab1a183e247c5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.94,-4042.06C1018.44,-4062.45 1072.22,-4085.59 1122,-4103 1162.06,-4117.01 1205.5,-4130.01 1247.37,-4141.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1246.56,-4144.9 1257.13,-4144.15 1248.4,-4138.15 1246.56,-4144.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Joystick air roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Joystick air roll",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Turtling", "Wall pinch", "Air roll shots", "Backwards aerials"]
                }}><GroupWrapper id="52c4080efca8c754eb74746d4fdb5ec0eda02d2a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1601,-3947C1601,-3947 1311,-3947 1311,-3947 1305,-3947 1299,-3941 1299,-3935 1299,-3935 1299,-3865 1299,-3865 1299,-3859 1305,-3853 1311,-3853 1311,-3853 1601,-3853 1601,-3853 1607,-3853 1613,-3859 1613,-3865 1613,-3865 1613,-3935 1613,-3935 1613,-3941 1607,-3947 1601,-3947"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3911.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Joystick Air Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3871.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Joystick air roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="7c65d28bd6b0f8ee958ddb1025619a4df1589719" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-3978.29C1064.07,-3964.2 1188.57,-3943.75 1288.82,-3927.29"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1289.46,-3930.73 1298.76,-3925.66 1288.32,-3923.82 1289.46,-3930.73"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Directional air roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Directional air roll",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Speed flipping", "Stalling", "Bunny hopping", "Tornado spin"]
                }}><GroupWrapper id="1ab2ed97bb359c4ddc5161fefbace20b74ebb447" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1630.5,-5069C1630.5,-5069 1281.5,-5069 1281.5,-5069 1275.5,-5069 1269.5,-5063 1269.5,-5057 1269.5,-5057 1269.5,-4987 1269.5,-4987 1269.5,-4981 1275.5,-4975 1281.5,-4975 1281.5,-4975 1630.5,-4975 1630.5,-4975 1636.5,-4975 1642.5,-4981 1642.5,-4987 1642.5,-4987 1642.5,-5057 1642.5,-5057 1642.5,-5063 1636.5,-5069 1630.5,-5069"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5033.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Directional Air Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4993.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional air roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="0886c5668eb4ef50cd4ad379c49348b76baccc65" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M882.15,-4042.44C899.12,-4168.77 958.89,-4519.83 1122,-4756 1184.96,-4847.16 1288.19,-4922.68 1363.04,-4969.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1361.22,-4972.66 1371.56,-4974.97 1364.92,-4966.72 1361.22,-4972.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip window",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Flip window",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Flip resets", "Rumble - UFO Shots"]
                }}><GroupWrapper id="7441b6c43e96a03b31594525e70e57de9c88c53b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1569.5,-4583C1569.5,-4583 1342.5,-4583 1342.5,-4583 1336.5,-4583 1330.5,-4577 1330.5,-4571 1330.5,-4571 1330.5,-4501 1330.5,-4501 1330.5,-4495 1336.5,-4489 1342.5,-4489 1342.5,-4489 1569.5,-4489 1569.5,-4489 1575.5,-4489 1581.5,-4495 1581.5,-4501 1581.5,-4501 1581.5,-4571 1581.5,-4571 1581.5,-4577 1575.5,-4583 1569.5,-4583"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4547.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Window"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4507.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip window",
                    tailId: "Jumping"
                }}><GroupWrapper id="1fff6d4684e74beb0eb3619a8c33eccbc0553781" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M895.16,-4042.31C929.09,-4122.95 1008.11,-4287.91 1122,-4387 1179.16,-4436.73 1255.6,-4472.51 1320.83,-4496.53"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1319.78,-4499.87 1330.37,-4499.99 1322.16,-4493.29 1319.78,-4499.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Popping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Popping",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Doinking", "Double touches", "45 degree flick"]
                }}><GroupWrapper id="91a3270cb0d1d83b450b4ded0b087df6325a3148" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-4378C1546.5,-4378 1365.5,-4378 1365.5,-4378 1359.5,-4378 1353.5,-4372 1353.5,-4366 1353.5,-4366 1353.5,-4296 1353.5,-4296 1353.5,-4290 1359.5,-4284 1365.5,-4284 1365.5,-4284 1546.5,-4284 1546.5,-4284 1552.5,-4284 1558.5,-4290 1558.5,-4296 1558.5,-4296 1558.5,-4366 1558.5,-4366 1558.5,-4372 1552.5,-4378 1546.5,-4378"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4342.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Popping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4302.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Popping",
                    tailId: "Jumping"
                }}><GroupWrapper id="03d1e8d95dd46376633beb1fd22529e51ff511fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M909.42,-4042.15C951.91,-4099.38 1031.24,-4194.7 1122,-4247 1189.81,-4286.08 1275.63,-4307.16 1343.16,-4318.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1342.98,-4321.95 1353.41,-4320.1 1344.1,-4315.04 1342.98,-4321.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Wall pinch",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Jumping", "Boosting", "Joystick air roll"],
                    downstreamSkills: ["Kuxir pinch"]
                }}><GroupWrapper id="0cafa4b4135ad0c10019301e85c42bbcf18d737f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2150.5,-4097C2150.5,-4097 1960.5,-4097 1960.5,-4097 1954.5,-4097 1948.5,-4091 1948.5,-4085 1948.5,-4085 1948.5,-4015 1948.5,-4015 1948.5,-4009 1954.5,-4003 1960.5,-4003 1960.5,-4003 2150.5,-4003 2150.5,-4003 2156.5,-4003 2162.5,-4009 2162.5,-4015 2162.5,-4015 2162.5,-4085 2162.5,-4085 2162.5,-4091 2156.5,-4097 2150.5,-4097"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4061.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4021.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Jumping"
                }}><GroupWrapper id="d63045344dd68ad51eb474a6ae10182403dead33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.08,-4010.67C1022.2,-4016.85 1074.54,-4023.33 1122,-4027 1415.21,-4049.66 1761.67,-4051.75 1938.29,-4051.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1938.4,-4054.54 1948.38,-4051 1938.37,-4047.54 1938.4,-4054.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic aerials",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: ["Has in-game tutorial.", {
                        text: "Reddit post by u/Bits_n_Bobs : Sir Timbers",
                        url: "https://www.reddit.com/r/RocketLeague/comments/3vzlxx/indepth_basic_aerial_guide_wgif_illustrations/"
                    }, {
                        text: "SubParButInHD Aerial Tutorial",
                        url: "https://www.youtube.com/watch?v=BtIjlnVh2DE"
                    }, {
                        text: "Rocket League Academy Aerial Tutorial",
                        url: "https://www.youtube.com/watch?v=OFIOZjlpj_w"
                    }],

                    title: "Basic aerials",
                    description: "When the ball is in the air and the player jumps and boosts into it with the purpose to pass, push, or score a goal.",
                    rank: "G",
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
                        d="M1574,-3422C1574,-3422 1338,-3422 1338,-3422 1332,-3422 1326,-3416 1326,-3410 1326,-3410 1326,-3340 1326,-3340 1326,-3334 1332,-3328 1338,-3328 1338,-3328 1574,-3328 1574,-3328 1580,-3328 1586,-3334 1586,-3340 1586,-3340 1586,-3410 1586,-3410 1586,-3416 1580,-3422 1574,-3422"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3386.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Basic Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3346.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic aerials",
                    tailId: "Jumping"
                }}><GroupWrapper id="59d4c18483840653f54eebc6100174318dac059c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M902.73,-3947.81C943.83,-3876.22 1028.45,-3737.95 1122,-3638 1199.28,-3555.44 1303.62,-3477.32 1374.78,-3428.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1377.04,-3430.7 1383.28,-3422.14 1373.07,-3424.94 1377.04,-3430.7"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hoops - Friendship / fusion Kickoff",
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

                    title: "Hoops - Friendship / fusion Kickoff",
                    description: "Hitting the teammate in a way to boost them faster to the ball.",
                    rank: "",
                    upstreamSkills: ["Jumping", "Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4c97e91301b9bb257aceb3aa8119334ea2d99a2f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1778,-2786C1778,-2786 1134,-2786 1134,-2786 1128,-2786 1122,-2780 1122,-2774 1122,-2774 1122,-2704 1122,-2704 1122,-2698 1128,-2692 1134,-2692 1134,-2692 1778,-2692 1778,-2692 1784,-2692 1790,-2698 1790,-2704 1790,-2704 1790,-2774 1790,-2774 1790,-2780 1784,-2786 1778,-2786"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2750.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hoops - Friendship / Fusion Kickoff"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2710.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Friendship / fusion Kickoff",
                    tailId: "Jumping"
                }}><GroupWrapper id="eaab3ac652d99cb29dc1915b52f2791f3e468bf2" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M895.52,-3947.73C937.58,-3841 1038.51,-3572.38 1086,-3338 1103.46,-3251.83 1075.67,-3018.72 1122,-2944 1165.83,-2873.32 1243.96,-2823.34 1313.53,-2790.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1315.25,-2793.5 1322.85,-2786.11 1312.3,-2787.15 1315.25,-2793.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turning",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }],

                    title: "Turning",
                    description: "Players turn by pressing the respective buttons or analog stick assigned in the controls panel. Has in game tutorial.",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powershot + Powerclears", "Redirects", "Basic Demos"]
                }}><GroupWrapper id="b0f78a0f574630800e6d978b85363ff41bd7ad8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M966,-2590C966,-2590 785,-2590 785,-2590 779,-2590 773,-2584 773,-2578 773,-2578 773,-2508 773,-2508 773,-2502 779,-2496 785,-2496 785,-2496 966,-2496 966,-2496 972,-2496 978,-2502 978,-2508 978,-2508 978,-2578 978,-2578 978,-2584 972,-2590 966,-2590"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-2554.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-2514.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Powershot + Powerclears",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Kevpert's Turn & Clears tutorial",
                        url: "https://www.youtube.com/watch?v=czZXq3fJoGE"
                    }, {
                        text: "Squishy Muffinz Powershot",
                        url: "https://www.youtube.com/watch?v=fA0ivgr69Xg"
                    }, {
                        text: "Sir Timbers Powershot and Powerclear tutorial",
                        url: "https://www.youtube.com/watch?v=jOjzJb4r3Zo"
                    }, {
                        text: "Dignitas’s Power shot guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                    }],

                    title: "Powershot + Powerclears",
                    description: "When the ball is rolling towards a player and the player boosts and flips into it resulting, causing a powershot.",
                    rank: "",
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
                        d="M1689,-2487C1689,-2487 1223,-2487 1223,-2487 1217,-2487 1211,-2481 1211,-2475 1211,-2475 1211,-2405 1211,-2405 1211,-2399 1217,-2393 1223,-2393 1223,-2393 1689,-2393 1689,-2393 1695,-2393 1701,-2399 1701,-2405 1701,-2405 1701,-2475 1701,-2475 1701,-2481 1695,-2487 1689,-2487"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2451.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powershot + Powerclears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2411.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Turning"
                }}><GroupWrapper id="65d524634dc012c0ec9b26a6896ba3cfa8d7d463" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.23,-2522.99C1022.38,-2514.45 1074.7,-2504.5 1122,-2496 1147.45,-2491.42 1174.02,-2486.76 1200.57,-2482.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1201.48,-2485.57 1210.74,-2480.43 1200.29,-2478.68 1201.48,-2485.57"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Redirects",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Redirects",
                    description: "Hitting the ball in a way to cause the direction of the ball to change for a pass, clear, or goal.",
                    rank: "",
                    upstreamSkills: ["Turning", "Boosting"],
                    downstreamSkills: ["Rebound shots"]
                }}><GroupWrapper id="fd69be653321b291759b25bacb9d457fe645abae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-2599C1546.5,-2599 1365.5,-2599 1365.5,-2599 1359.5,-2599 1353.5,-2593 1353.5,-2587 1353.5,-2587 1353.5,-2517 1353.5,-2517 1353.5,-2511 1359.5,-2505 1365.5,-2505 1365.5,-2505 1546.5,-2505 1546.5,-2505 1552.5,-2505 1558.5,-2511 1558.5,-2517 1558.5,-2517 1558.5,-2587 1558.5,-2587 1558.5,-2593 1552.5,-2599 1546.5,-2599"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2563.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Redirects"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2523.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Turning"
                }}><GroupWrapper id="86d5ea5067f613df951463cdbd4fa42a98441d9e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-2544.58C1080.49,-2546.17 1237.63,-2548.62 1343.26,-2550.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1343.27,-2553.76 1353.32,-2550.42 1343.38,-2546.76 1343.27,-2553.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Turning", "Boosting"],
                    downstreamSkills: ["Goalie Demos", "Air Demos"]
                }}><GroupWrapper id="7336660793449ed1297223c8aefa547b3bea0a96" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1572.5,-3047C1572.5,-3047 1339.5,-3047 1339.5,-3047 1333.5,-3047 1327.5,-3041 1327.5,-3035 1327.5,-3035 1327.5,-2965 1327.5,-2965 1327.5,-2959 1333.5,-2953 1339.5,-2953 1339.5,-2953 1572.5,-2953 1572.5,-2953 1578.5,-2953 1584.5,-2959 1584.5,-2965 1584.5,-2965 1584.5,-3035 1584.5,-3035 1584.5,-3041 1578.5,-3047 1572.5,-3047"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3011.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Basic Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2971.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Turning"
                }}><GroupWrapper id="04363ac6b640dc5c3d688ce5a59f51e53ce1b738" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M916.01,-2590.08C962.16,-2643.43 1042.38,-2731.25 1122,-2795 1195.8,-2854.08 1287.83,-2909.55 1356.44,-2947.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1355.09,-2951.1 1365.53,-2952.9 1358.49,-2944.98 1355.09,-2951.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Driving",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }],

                    title: "Driving",
                    description: "Using the drive key assigned in the control panel. fHas in game tutorial.",
                    rank: "B",
                    upstreamSkills: [],

                    downstreamSkills: [
                        "Jumping",
                        "Turning",
                        "Braking",
                        "Boosting",
                        "Powershot + Powerclears",
                        "Powerslide Turning",
                        "Crossing",
                        "Wall driving",
                        "Positioning",
                        "Prediction"
                    ]
                }}><GroupWrapper id="ff52a774cad89d125cacf645052cfe567096d753" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M203,-2524C203,-2524 12,-2524 12,-2524 6,-2524 0,-2518 0,-2512 0,-2512 0,-2442 0,-2442 0,-2436 6,-2430 12,-2430 12,-2430 203,-2430 203,-2430 209,-2430 215,-2436 215,-2442 215,-2442 215,-2512 215,-2512 215,-2518 209,-2524 203,-2524"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="107.5"
                        y="-2488.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Driving"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="107.5"
                        y="-2448.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Jumping",
                    tailId: "Driving"
                }}><GroupWrapper id="4acdb597339422b238ab40122e44811df9987004" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M132.26,-2524.1C244.83,-2747.17 724.01,-3696.78 846.1,-3938.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="843,-3940.35 850.63,-3947.7 849.25,-3937.2 843,-3940.35"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="d26ba9c663855ade1d9248c95687355f9190979d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215.19,-2485.47C320.43,-2493.9 485.84,-2507.38 629,-2520 672.82,-2523.86 721.02,-2528.33 763.02,-2532.29"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="762.71,-2535.78 773,-2533.24 763.37,-2528.81 762.71,-2535.78"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Braking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Braking",
                    description: "Slows the car down by letting go of accelerate and pressing reverse.",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="eaa44d00fe236ab417d0738ebd452e912564166a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M530.5,-2656C530.5,-2656 349.5,-2656 349.5,-2656 343.5,-2656 337.5,-2650 337.5,-2644 337.5,-2644 337.5,-2574 337.5,-2574 337.5,-2568 343.5,-2562 349.5,-2562 349.5,-2562 530.5,-2562 530.5,-2562 536.5,-2562 542.5,-2568 542.5,-2574 542.5,-2574 542.5,-2644 542.5,-2644 542.5,-2650 536.5,-2656 530.5,-2656"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-2620.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Braking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-2580.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Braking",
                    tailId: "Driving"
                }}><GroupWrapper id="ebf18b4afe73755cc0d0b934b00523fd5e4f7036" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M198.03,-2524.13C215.39,-2532.55 233.6,-2540.89 251,-2548 275.36,-2557.96 302,-2567.42 327.37,-2575.8"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="326.43,-2579.17 337.02,-2578.96 328.6,-2572.52 326.43,-2579.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boosting",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }, {
                        text: "Rocket Science’s explanation on max speed vs supersonic.",
                        url: "https://www.youtube.com/watch?v=mlWY6x8g5Ps"
                    }],

                    title: "Boosting",
                    description: "Faster than driving, boosting uses boost to increase the speed of the car until it becomes supersonic (maximum speed that any car can keep) .",
                    rank: "",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "50/50’s + Kickoffs",
                        "Powershot + Powerclears",
                        "Redirects",
                        "Chipping",
                        "Tilted drift",
                        "Wall pinch",
                        "Basic Demos",
                        "Hel-jump",
                        "Basic aerials"
                    ]
                }}><GroupWrapper id="537c9a929ccd9e9add13b15ba512c096d2fd52c4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M966,-3329C966,-3329 785,-3329 785,-3329 779,-3329 773,-3323 773,-3317 773,-3317 773,-3247 773,-3247 773,-3241 779,-3235 785,-3235 785,-3235 966,-3235 966,-3235 972,-3235 978,-3241 978,-3247 978,-3247 978,-3317 978,-3317 978,-3323 972,-3329 966,-3329"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-3293.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Boosting"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-3253.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boosting",
                    tailId: "Driving"
                }}><GroupWrapper id="f8161b17441a7def2138c218af3057859b4183f1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215.32,-2510.94C227.28,-2514 239.35,-2516.78 251,-2519 333.85,-2534.78 562.78,-2500.77 629,-2553 684.14,-2596.49 814.41,-3060.68 859.12,-3224.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="855.82,-3226.04 861.82,-3234.78 862.57,-3224.21 855.82,-3226.04"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Driving"
                }}><GroupWrapper id="a95d5e59165072fdf6c0c854a63cde1a2361053e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215,-2474.07C426.32,-2468.27 903.83,-2455.15 1200.78,-2446.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1200.93,-2450.48 1210.83,-2446.71 1200.74,-2443.49 1200.93,-2450.48"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Turning",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Kevpert's Turn & Clears tutorial",
                        url: "https://www.youtube.com/watch?v=czZXq3fJoGE"
                    }, {
                        text: "u/HoraryHellfire2's explination of powerslide turning in comparison.",
                        url: "https://www.reddit.com/r/RocketLeague/comments/53djcs/what_little_things_do_the_pros_do_that_we/d7s7d50/"
                    }],

                    title: "Powerslide Turning",
                    description: "Holding drift while turning will produce a powerslide and allow for sharper turns and faster play speeds.",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powerslide Recovery", "Power Slide Dribble"]
                }}><GroupWrapper id="0fbaf27e68e4e8e34b42a9e74352bce7299da410" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M617,-5966C617,-5966 263,-5966 263,-5966 257,-5966 251,-5960 251,-5954 251,-5954 251,-5884 251,-5884 251,-5878 257,-5872 263,-5872 263,-5872 617,-5872 617,-5872 623,-5872 629,-5878 629,-5884 629,-5884 629,-5954 629,-5954 629,-5960 623,-5966 617,-5966"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-5930.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powerslide Turning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-5890.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="46995ef069361998ccf614c333fdc6e911c332b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M113.02,-2524.02C149.35,-2902.44 393.74,-5447.64 433.53,-5862.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="430.05,-5862.36 434.49,-5871.98 437.01,-5861.69 430.05,-5862.36"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Crossing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Crossing",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="7cd05f58b6adce6d5be96789fd45b25a4834018c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M530.5,-2430C530.5,-2430 349.5,-2430 349.5,-2430 343.5,-2430 337.5,-2424 337.5,-2418 337.5,-2418 337.5,-2348 337.5,-2348 337.5,-2342 343.5,-2336 349.5,-2336 349.5,-2336 530.5,-2336 530.5,-2336 536.5,-2336 542.5,-2342 542.5,-2348 542.5,-2348 542.5,-2418 542.5,-2418 542.5,-2424 536.5,-2430 530.5,-2430"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-2394.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Crossing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-2354.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Crossing",
                    tailId: "Driving"
                }}><GroupWrapper id="a4dd9bcb7c16e49f157714b721c1b3dc3a9b3e1c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215.35,-2446.61C251.27,-2436.39 291.42,-2424.97 327.68,-2414.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="328.64,-2418.03 337.3,-2411.93 326.72,-2411.29 328.64,-2418.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall driving",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Wall driving",
                    description: undefined,
                    rank: "",
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
                        d="M1567.5,-2223C1567.5,-2223 1344.5,-2223 1344.5,-2223 1338.5,-2223 1332.5,-2217 1332.5,-2211 1332.5,-2211 1332.5,-2141 1332.5,-2141 1332.5,-2135 1338.5,-2129 1344.5,-2129 1344.5,-2129 1567.5,-2129 1567.5,-2129 1573.5,-2129 1579.5,-2135 1579.5,-2141 1579.5,-2141 1579.5,-2211 1579.5,-2211 1579.5,-2217 1573.5,-2223 1567.5,-2223"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2187.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Driving"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2147.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall driving",
                    tailId: "Driving"
                }}><GroupWrapper id="15037e985c66a7cbef252e08c95a777ac8f3fce8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M139.69,-2429.74C165.24,-2395.18 204.67,-2350.41 251,-2327 605.56,-2147.83 1091.06,-2150.69 1322.21,-2164.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1322.15,-2168.12 1332.35,-2165.25 1322.58,-2161.14 1322.15,-2168.12"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Positioning",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: ["All tutorials in rotation can also be used for this.", {
                        text: "Ytzi13 Lead offence 3v3 guide",
                        url: "https://www.reddit.com/r/RocketLeague/comments/ab9490/playing_the_first_man_role_a_guide_for_all_skill/?st=JQFHERHK&sh=9ac03a3b"
                    }, {
                        text: "Dignitas’s 1v1 guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12629/becoming-the-best-solo-duel-a-high-level-1v1-guide"
                    }, {
                        text: "Gregan’s positioning tutorial series.",
                        url: "https://www.youtube.com/playlist?list=PLNlAnZLtqpGy9B7I2PUe_JPfjrjawmffP"
                    }],

                    title: "Positioning",
                    description: "Whenever the a player is on the field, positioning is being used. Positioning is where the player puts themselves relative to the ball.",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Shadowing", "Teammate Awareness", "Rotation"]
                }}><GroupWrapper id="a712a04c933abf5a931bcfdc872cedc3542e0268" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M540.5,-1251C540.5,-1251 339.5,-1251 339.5,-1251 333.5,-1251 327.5,-1245 327.5,-1239 327.5,-1239 327.5,-1169 327.5,-1169 327.5,-1163 333.5,-1157 339.5,-1157 339.5,-1157 540.5,-1157 540.5,-1157 546.5,-1157 552.5,-1163 552.5,-1169 552.5,-1169 552.5,-1239 552.5,-1239 552.5,-1245 546.5,-1251 540.5,-1251"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1215.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Positioning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1175.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Positioning",
                    tailId: "Driving"
                }}><GroupWrapper id="6d69af14f92aa38b283d9f38a8f8e55b7da6c9be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M120.75,-2429.8C171.93,-2232.69 368.49,-1475.59 424.2,-1261"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="427.62,-1261.75 426.75,-1251.19 420.85,-1259.99 427.62,-1261.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Prediction",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Rocket Science’s explanation of ball physics.",
                        url: "https://www.youtube.com/watch?v=9uh8-nBlufM"
                    }],

                    title: "Prediction",
                    description: "Being able to predict what an player or opponent will do from repetition and experience.",
                    rank: "",
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
                        d="M1549,-1755C1549,-1755 1363,-1755 1363,-1755 1357,-1755 1351,-1749 1351,-1743 1351,-1743 1351,-1673 1351,-1673 1351,-1667 1357,-1661 1363,-1661 1363,-1661 1549,-1661 1549,-1661 1555,-1661 1561,-1667 1561,-1673 1561,-1673 1561,-1743 1561,-1743 1561,-1749 1555,-1755 1549,-1755"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1719.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1679.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Prediction",
                    tailId: "Driving"
                }}><GroupWrapper id="e6d0ac4250488960d3927971b52afff6bb1c939b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M121.94,-2429.97C141.29,-2370.02 182.42,-2266.65 251,-2204 577.66,-1905.58 1108.57,-1773.55 1340.49,-1727.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1341.49,-1731.29 1350.63,-1725.94 1340.15,-1724.42 1341.49,-1731.29"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double jump aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://youtu.be/0ohM0iPynUI?t=62"
                    }],

                    title: "Double jump aerials",
                    description: "Jumping twice for maximum height, then going for an aerial.",
                    rank: "",
                    upstreamSkills: ["Double Jumping", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="d7a2f6ed1c0ab39bbe8fd25a89d2e285f02074b5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2242,-3647C2242,-3647 1869,-3647 1869,-3647 1863,-3647 1857,-3641 1857,-3635 1857,-3635 1857,-3565 1857,-3565 1857,-3559 1863,-3553 1869,-3553 1869,-3553 2242,-3553 2242,-3553 2248,-3553 2254,-3559 2254,-3565 2254,-3565 2254,-3635 2254,-3635 2254,-3641 2248,-3647 2242,-3647"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3611.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Jump Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3571.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double jump aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="0df125d690097c5707cd4815127d1dcb711300cf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1614.38,-3669.24C1685.44,-3658.06 1770.37,-3644.7 1846.58,-3632.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1847.46,-3636.12 1856.79,-3631.1 1846.37,-3629.2 1847.46,-3636.12"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast aerials",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers fast aerials tutorial.",
                        url: "https://www.youtube.com/watch?v=lkBZg0Ldhls"
                    }, {
                        text: "Iridium’s fast aerial tutorial.",
                        url: "https://www.youtube.com/watch?v=RHVQ_0zbW14"
                    }],

                    title: "Fast aerials",
                    description: "Like a basic aerial but at the start, jump, tilt the car upwards, and jump to gain momentum while boosting the entire time.",
                    rank: "",
                    upstreamSkills: ["Double Jumping", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="f38a452faec31adb27135b563ce6b43880be5c7b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2163,-3535C2163,-3535 1948,-3535 1948,-3535 1942,-3535 1936,-3529 1936,-3523 1936,-3523 1936,-3453 1936,-3453 1936,-3447 1942,-3441 1948,-3441 1948,-3441 2163,-3441 2163,-3441 2169,-3441 2175,-3447 2175,-3453 2175,-3453 2175,-3523 2175,-3523 2175,-3529 2169,-3535 2163,-3535"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3499.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Fast Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3459.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ebed3c96ee622da9af0ebdb96f577f64a5d00b4b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.26,-3646.86C1634.35,-3615 1734.88,-3573.51 1826,-3544 1857.96,-3533.65 1892.96,-3524.17 1925.76,-3516.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1926.98,-3519.38 1935.86,-3513.6 1925.32,-3512.58 1926.98,-3519.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Spring Roll",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "The Spring Roll",
                        url: "https://www.reddit.com/r/RocketLeague/comments/9df4av/someone_come_up_with_a_new_mechanic_and_name_it/e5hemz8/"
                    }, "While turtle dribbling, push the ball up the wall and start air dribbling.", {
                        text: "FLuuMP Turtle AirDribble tutorial.",
                        url: "https://www.youtube.com/watch?v=_pOs0oZMXFU"
                    }],

                    title: "Spring Roll",
                    description: "A move where the player pops the ball up for another touch but, uses the car’s jump to go back down to the ground faster to fake the opponent.",
                    rank: "GC",
                    upstreamSkills: ["Double Jumping", "Doinking", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="76e9558e859ffe4b4d74c25a894bb587785133d0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2707,-3779C2707,-3779 2503,-3779 2503,-3779 2497,-3779 2491,-3773 2491,-3767 2491,-3767 2491,-3697 2491,-3697 2491,-3691 2497,-3685 2503,-3685 2503,-3685 2707,-3685 2707,-3685 2713,-3685 2719,-3691 2719,-3697 2719,-3697 2719,-3767 2719,-3767 2719,-3773 2713,-3779 2707,-3779"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3743.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Spring Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3703.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ad02c4f7b05a024681bb92a2ed2e803bf46c649e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.18,-3741C1650.07,-3765.75 1741.73,-3793.49 1826,-3806 2027.79,-3835.95 2086.46,-3852.87 2285,-3806 2302.41,-3801.89 2304.07,-3793.79 2321,-3788 2372.2,-3770.49 2430.6,-3757.78 2480.99,-3748.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.7,-3752.38 2490.96,-3747.23 2480.51,-3745.48 2481.7,-3752.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "50/50’s + Kickoffs",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s guide to kickoffs",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12642/take-your-rocket-league-gameplay-to-the-next-level-kickoffs"
                    }, {
                        text: "Doomsee's 50/50 tutorial",
                        url: "https://www.youtube.com/watch?v=d5XisgpPNCI"
                    }, {
                        text: "Azure Rl 50/50 tutorial",
                        url: "https://www.youtube.com/watch?v=kjvDwh0zogk"
                    }, {
                        text: "Excel Exports 50/50 tutorial",
                        url: "https://www.youtube.com/watch?v=Df5ZPYqePok"
                    }],

                    title: "50/50’s + Kickoffs",
                    description: "When players flip or jump into the ball at the same time. Advanced versions of this have players observe each other to determine what angle the ball will go after the confrontation. Kickoffs are 50/50’s at the beginning of a match or after a goal has been scored.",
                    rank: "",
                    upstreamSkills: ["Flipping", "Boosting"],
                    downstreamSkills: ["Fast Kickoffs"]
                }}><GroupWrapper id="a2b936491d4b9c3849b428df5f3f16a31cc9d59d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2221.5,-4919C2221.5,-4919 1889.5,-4919 1889.5,-4919 1883.5,-4919 1877.5,-4913 1877.5,-4907 1877.5,-4907 1877.5,-4837 1877.5,-4837 1877.5,-4831 1883.5,-4825 1889.5,-4825 1889.5,-4825 2221.5,-4825 2221.5,-4825 2227.5,-4825 2233.5,-4831 2233.5,-4837 2233.5,-4837 2233.5,-4907 2233.5,-4907 2233.5,-4913 2227.5,-4919 2221.5,-4919"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4883.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"50/50’s + Kickoffs"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4843.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Flipping"
                }}><GroupWrapper id="9629a67191bfe59987557df418272e39594e5e63" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1518.96,-5366.91C1593.36,-5307.3 1717.19,-5197.85 1790,-5078 1817.15,-5033.31 1790.52,-5004.41 1826,-4966 1841.47,-4949.26 1860.36,-4935.41 1880.58,-4923.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1882.52,-4926.92 1889.64,-4919.07 1879.18,-4920.77 1882.52,-4926.92"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wave dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Wave dash",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Zap dash", "Hel-jump"]
                }}><GroupWrapper id="6cb36788737e9a90942aaa184711d31caae1f598" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2155,-5293C2155,-5293 1956,-5293 1956,-5293 1950,-5293 1944,-5287 1944,-5281 1944,-5281 1944,-5211 1944,-5211 1944,-5205 1950,-5199 1956,-5199 1956,-5199 2155,-5199 2155,-5199 2161,-5199 2167,-5205 2167,-5211 2167,-5211 2167,-5281 2167,-5281 2167,-5287 2161,-5293 2155,-5293"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5257.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wave Dash"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5217.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wave dash",
                    tailId: "Flipping"
                }}><GroupWrapper id="dc949969e7dffed44d2cfec04071f3a68f05a9a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.77,-5381.48C1632.63,-5358.28 1735.12,-5326.91 1826,-5302 1860.93,-5292.43 1899.07,-5282.77 1934.01,-5274.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1934.89,-5277.62 1943.78,-5271.85 1933.23,-5270.82 1934.89,-5277.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Diagonal Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Diagonal Flipping",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1e85eff77e89770205d9c74e3c78f5034b966ad0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2217.5,-5629C2217.5,-5629 1893.5,-5629 1893.5,-5629 1887.5,-5629 1881.5,-5623 1881.5,-5617 1881.5,-5617 1881.5,-5547 1881.5,-5547 1881.5,-5541 1887.5,-5535 1893.5,-5535 1893.5,-5535 2217.5,-5535 2217.5,-5535 2223.5,-5535 2229.5,-5541 2229.5,-5547 2229.5,-5547 2229.5,-5617 2229.5,-5617 2229.5,-5623 2223.5,-5629 2217.5,-5629"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5593.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Diagonal Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5553.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Diagonal Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="261c87736cbe53fafb62bf8314c992a171d8018a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.77,-5446.52C1632.63,-5469.72 1735.12,-5501.09 1826,-5526 1840.7,-5530.03 1855.98,-5534.07 1871.34,-5538.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1870.89,-5541.54 1881.44,-5540.64 1872.63,-5534.76 1870.89,-5541.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Speed flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Speed flipping",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Flipping", "Directional air roll"],
                    downstreamSkills: ["Zap dash"]
                }}><GroupWrapper id="a4dfc80ce8e6927ad97338af954e64a2369ec1cd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2193,-5405C2193,-5405 1918,-5405 1918,-5405 1912,-5405 1906,-5399 1906,-5393 1906,-5393 1906,-5323 1906,-5323 1906,-5317 1912,-5311 1918,-5311 1918,-5311 2193,-5311 2193,-5311 2199,-5311 2205,-5317 2205,-5323 2205,-5323 2205,-5393 2205,-5393 2205,-5399 2199,-5405 2193,-5405"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5369.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Speed Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5329.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Speed flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="55939fa0e30c0eb191f3b0497e63c325778de99b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-5404.47C1651.07,-5395.81 1788.83,-5382.9 1895.7,-5372.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1896.32,-5376.34 1905.95,-5371.92 1895.67,-5369.37 1896.32,-5376.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backflip shot",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                    }],

                    title: "Backflip shot",
                    description: "Hitting the ball normally and backflipping after the shot to keep the players position and be able to hit the ball again.",
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="ea54f7ee4b0949603f1aa4df4dd85877d59eafb6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2176.5,-5517C2176.5,-5517 1934.5,-5517 1934.5,-5517 1928.5,-5517 1922.5,-5511 1922.5,-5505 1922.5,-5505 1922.5,-5435 1922.5,-5435 1922.5,-5429 1928.5,-5423 1934.5,-5423 1934.5,-5423 2176.5,-5423 2176.5,-5423 2182.5,-5423 2188.5,-5429 2188.5,-5435 2188.5,-5435 2188.5,-5505 2188.5,-5505 2188.5,-5511 2182.5,-5517 2176.5,-5517"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5481.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backflip Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5441.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backflip shot",
                    tailId: "Flipping"
                }}><GroupWrapper id="6962bee10e7ea6267af2c2e5586d3934452044b8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-5423.53C1655.93,-5432.64 1803.44,-5446.47 1912.3,-5456.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1912.1,-5460.17 1922.38,-5457.62 1912.75,-5453.2 1912.1,-5460.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tilted drift",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: true,

                    notes: [{
                        text: "Tilted Drift tutorial by HelvetiaGaming",
                        url: "https://www.youtube.com/watch?v=y2isfCJfPps"
                    }],

                    title: "Tilted drift",
                    description: "A skill where a player will forward diagonal flip then land on the left or right two wheels whilst proceeding to continuously boost and turn.",
                    rank: "",
                    upstreamSkills: ["Flipping", "Boosting"],
                    downstreamSkills: []
                }}><GroupWrapper id="bc39cc9f4f8933fa4c939aea82d280f199742478" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2155.5,-4695C2155.5,-4695 1955.5,-4695 1955.5,-4695 1949.5,-4695 1943.5,-4689 1943.5,-4683 1943.5,-4683 1943.5,-4613 1943.5,-4613 1943.5,-4607 1949.5,-4601 1955.5,-4601 1955.5,-4601 2155.5,-4601 2155.5,-4601 2161.5,-4601 2167.5,-4607 2167.5,-4613 2167.5,-4613 2167.5,-4683 2167.5,-4683 2167.5,-4689 2161.5,-4695 2155.5,-4695"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4659.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tilted Drift"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4619.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tilted drift",
                    tailId: "Flipping"
                }}><GroupWrapper id="cb124b8d6d0696496124ea3d4424402dfc935d0c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1526.52,-5366.99C1605.57,-5309.22 1731.25,-5203.3 1790,-5078 1825.45,-5002.4 1771.37,-4767.14 1826,-4704 1852.73,-4673.1 1893.45,-4657.8 1933.16,-4650.63"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1933.92,-4654.05 1943.22,-4648.97 1932.78,-4647.14 1933.92,-4654.05"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip canceling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s half-flip guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12628/half-flips-where-when-and-how"
                    }],

                    title: "Flip canceling",
                    description: "During a flip, the player rotates the car in the opposite direction the flip is going to stop the car from turning. Used to gain speed.",
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Half flipping"]
                }}><GroupWrapper id="7b29daf22ac71cf45cefd3252bbdb88fe8895ce6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2187,-5891C2187,-5891 1924,-5891 1924,-5891 1918,-5891 1912,-5885 1912,-5879 1912,-5879 1912,-5809 1912,-5809 1912,-5803 1918,-5797 1924,-5797 1924,-5797 2187,-5797 2187,-5797 2193,-5797 2199,-5803 2199,-5809 2199,-5809 2199,-5879 2199,-5879 2199,-5885 2193,-5891 2187,-5891"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5855.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Canceling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5815.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip canceling",
                    tailId: "Flipping"
                }}><GroupWrapper id="8cb1a3eae957ffe71f4a2235200013a07cb31752" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1489.71,-5461.23C1547.77,-5541.33 1676.86,-5703.36 1826,-5788 1849.33,-5801.24 1875.73,-5811.38 1902.09,-5819.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1901.22,-5822.52 1911.8,-5821.87 1903.13,-5815.78 1901.22,-5822.52"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Flipping", "Hood dribble"],
                    downstreamSkills: ["45 degree flick", "Musty Flick", "Delayed Flicks"]
                }}><GroupWrapper id="19641b3805579dd37624bf66b09257f750974774" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3290.5,-5069C3290.5,-5069 2989.5,-5069 2989.5,-5069 2983.5,-5069 2977.5,-5063 2977.5,-5057 2977.5,-5057 2977.5,-4987 2977.5,-4987 2977.5,-4981 2983.5,-4975 2989.5,-4975 2989.5,-4975 3290.5,-4975 3290.5,-4975 3296.5,-4975 3302.5,-4981 3302.5,-4987 3302.5,-4987 3302.5,-5057 3302.5,-5057 3302.5,-5063 3296.5,-5069 3290.5,-5069"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5033.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Directional Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4993.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Flipping"
                }}><GroupWrapper id="e45baa78fa3c1200e296a306aacaef56a3377c2c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1512.41,-5461.23C1580.85,-5516.16 1703.31,-5603.68 1826,-5638 2022.46,-5692.96 2085.79,-5681.93 2285,-5638 2573.94,-5574.28 2659.41,-5544.65 2889,-5358 2987.47,-5277.95 3067.87,-5150.87 3109.08,-5078.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3112.3,-5079.5 3114.15,-5069.07 3106.2,-5076.08 3112.3,-5079.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="147dbe8bf54f7f867d98ea39b01f66d718271304" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2253,-5779C2253,-5779 1858,-5779 1858,-5779 1852,-5779 1846,-5773 1846,-5767 1846,-5767 1846,-5697 1846,-5697 1846,-5691 1852,-5685 1858,-5685 1858,-5685 2253,-5685 2253,-5685 2259,-5685 2265,-5691 2265,-5697 2265,-5697 2265,-5767 2265,-5767 2265,-5773 2259,-5779 2253,-5779"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5743.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rumble - Spike Flicks"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5703.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - Spike Flicks",
                    tailId: "Flipping"
                }}><GroupWrapper id="16d66adb5bb5e45604b95ecc253ebd736034bcbb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1511.38,-5461.09C1580.22,-5518.44 1704.56,-5614.62 1826,-5671 1833.85,-5674.64 1841.95,-5678.1 1850.21,-5681.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1849.02,-5684.67 1859.61,-5685 1851.54,-5678.13 1849.02,-5684.67"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Boosting"
                }}><GroupWrapper id="5d8996827b436d743ab2e51c0f78da5c2dfeaa6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M896.13,-3329.15C939.44,-3435.64 1042.74,-3703.8 1086,-3939 1099.14,-4010.47 1077.51,-4534.55 1122,-4592 1297.35,-4818.45 1649.07,-4867.8 1866.89,-4875.28"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1867.05,-4878.79 1877.16,-4875.61 1867.27,-4871.79 1867.05,-4878.79"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Boosting"
                }}><GroupWrapper id="51301e2282283ee5735d568c01e581d46214133c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M890.9,-3234.74C942.39,-3065.93 1114.67,-2502.39 1122,-2496 1144.82,-2476.09 1171.99,-2461.94 1200.83,-2452.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1202.24,-2455.25 1210.67,-2448.82 1200.08,-2448.59 1202.24,-2455.25"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Boosting"
                }}><GroupWrapper id="2b101ad152e13d18e42311c10f858ec8a217e3d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M883.02,-3234.98C900.8,-3123.89 960.14,-2842.59 1122,-2683 1182.1,-2623.74 1272.2,-2590.49 1343.53,-2572.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1344.6,-2575.66 1353.46,-2569.86 1342.91,-2568.87 1344.6,-2575.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chipping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chipping",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Boosting"],
                    downstreamSkills: ["Chip shot", "Chip clear", "Chip double touch"]
                }}><GroupWrapper id="cfdbe4fec64d936c3bd931b8c1c724480b83578e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-3216C1546.5,-3216 1365.5,-3216 1365.5,-3216 1359.5,-3216 1353.5,-3210 1353.5,-3204 1353.5,-3204 1353.5,-3134 1353.5,-3134 1353.5,-3128 1359.5,-3122 1365.5,-3122 1365.5,-3122 1546.5,-3122 1546.5,-3122 1552.5,-3122 1558.5,-3128 1558.5,-3134 1558.5,-3134 1558.5,-3204 1558.5,-3204 1558.5,-3210 1552.5,-3216 1546.5,-3216"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3180.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3140.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chipping",
                    tailId: "Boosting"
                }}><GroupWrapper id="811114c1373fd9be16061b5bb25088c16f9c7fb1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-3262.12C1080.49,-3242.15 1237.63,-3211.46 1343.26,-3190.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1344.18,-3194.21 1353.32,-3188.86 1342.84,-3187.34 1344.18,-3194.21"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tilted drift",
                    tailId: "Boosting"
                }}><GroupWrapper id="e773c38c8f5a4939fc2a750117b53518db7eeecf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M891.32,-3329.16C942.28,-3491.08 1107.99,-4015.05 1122,-4027 1350.78,-4222.21 1586.2,-3913.84 1790,-4135 1859.03,-4209.91 1760.02,-4514.38 1826,-4592 1852.52,-4623.2 1893.31,-4638.55 1933.13,-4645.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1932.79,-4649.17 1943.23,-4647.32 1933.92,-4642.26 1932.79,-4649.17"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Boosting"
                }}><GroupWrapper id="174936d386e79231fe49f9d9a99586a031f46c23" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M889.62,-3329.18C932.14,-3480.59 1066.67,-3946.85 1122,-3989 1138.04,-4001.22 1691.89,-4031.27 1938.3,-4044.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1938.2,-4047.57 1948.36,-4044.59 1938.56,-4040.58 1938.2,-4047.57"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Boosting"
                }}><GroupWrapper id="52167b9a65db45a3347dca992a7cc93919727046" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M935.14,-3234.73C983.16,-3197.77 1054.01,-3147.11 1122,-3113 1183.77,-3082.01 1256.02,-3056.33 1317.4,-3037.33"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1318.62,-3040.62 1327.16,-3034.34 1316.57,-3033.92 1318.62,-3040.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hel-jump",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Hel-Jump Tutorial by  HelvetiaGaming",
                        url: "https://www.youtube.com/watch?v=p1KxjeQT5As"
                    }, "A combination of a hel-jump and a wave dash; The hel-dash allows the player to hit max speed in a very short amount of time and boost.", {
                        text: "https://gfycat.com/LiquidBaggyDoe",
                        url: "https://gfycat.com/LiquidBaggyDoe"
                    }],

                    title: "Hel-jump",
                    description: "A form of wave dashing, the hel-jump has the player jump instead of flip when they hit the ground with the use of powerslide and boost to start an aerial that keeps their flip to be used whenever they wanted. Also known as a Wave jump.",
                    rank: "",
                    upstreamSkills: ["Boosting", "Wave dash"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95c68cc3736c6dfaa388c5aadcd341c5b0a21f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-4115C2695.5,-4115 2514.5,-4115 2514.5,-4115 2508.5,-4115 2502.5,-4109 2502.5,-4103 2502.5,-4103 2502.5,-4033 2502.5,-4033 2502.5,-4027 2508.5,-4021 2514.5,-4021 2514.5,-4021 2695.5,-4021 2695.5,-4021 2701.5,-4021 2707.5,-4027 2707.5,-4033 2707.5,-4033 2707.5,-4103 2707.5,-4103 2707.5,-4109 2701.5,-4115 2695.5,-4115"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4079.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hel-jump"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4039.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Boosting"
                }}><GroupWrapper id="e6abb339e33d2c148fdb01ea27b6ee3307a4035c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M877.06,-3329.08C881.43,-3455.74 912.75,-3804.37 1122,-3956 1174.35,-3993.93 2222.33,-3978.12 2285,-3994 2302.34,-3998.39 2304.07,-4006.21 2321,-4012 2376.09,-4030.84 2439.51,-4044.12 2492.33,-4053"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2491.97,-4056.49 2502.41,-4054.66 2493.11,-4049.58 2491.97,-4056.49"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic aerials",
                    tailId: "Boosting"
                }}><GroupWrapper id="7602d96def6adb029b613d4821567cac668c7c8a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-3298.36C1072.01,-3313.43 1211.94,-3335.93 1315.97,-3352.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1315.5,-3356.12 1325.93,-3354.25 1316.61,-3349.21 1315.5,-3356.12"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s guide to kickoffs",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12642/take-your-rocket-league-gameplay-to-the-next-level-kickoffs"
                    }, "Where the player has the nose of the car stable on the ground, the player spins around.", {
                        text: "Popular clip",
                        url: "https://www.reddit.com/r/RocketLeague/comments/7od65p/found_this_in_my_saved_replays_as_calculus_maxima/"
                    }, {
                        text: "u/redbull123",
                        url: "/user/redbull123/"
                    }],

                    title: "Fast Kickoffs",
                    description: "During the kickoff, the player diagonal flips to gain speed.",
                    rank: "",
                    upstreamSkills: ["50/50’s + Kickoffs"],
                    downstreamSkills: ["Wavedash Kickoff"]
                }}><GroupWrapper id="70ae9f10a1ebfc1c3e2894c6b3cf99364f1eab4e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2721.5,-4807C2721.5,-4807 2488.5,-4807 2488.5,-4807 2482.5,-4807 2476.5,-4801 2476.5,-4795 2476.5,-4795 2476.5,-4725 2476.5,-4725 2476.5,-4719 2482.5,-4713 2488.5,-4713 2488.5,-4713 2721.5,-4713 2721.5,-4713 2727.5,-4713 2733.5,-4719 2733.5,-4725 2733.5,-4725 2733.5,-4795 2733.5,-4795 2733.5,-4801 2727.5,-4807 2721.5,-4807"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4771.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Fast Kickoffs"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4731.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Kickoffs",
                    tailId: "50/50’s + Kickoffs"
                }}><GroupWrapper id="f52925957ddb7918578ad02bb3562cee452d58b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2233.57,-4834.17C2262.76,-4828.03 2292.72,-4821.79 2321,-4816 2368.31,-4806.31 2420.13,-4795.98 2466.35,-4786.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2467.3,-4790.24 2476.43,-4784.87 2465.95,-4783.37 2467.3,-4790.24"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5393ce41d9044769cb75e995ed926cb6df79f6b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.04,-2443.95C1734.46,-2454.41 1765.61,-2470.86 1790,-2496 1871.85,-2580.35 1747.31,-2670.69 1826,-2758 1834.93,-2767.91 1845.31,-2776.21 1856.61,-2783.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1855.01,-2786.25 1865.43,-2788.17 1858.48,-2780.17 1855.01,-2786.25"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Possession Prediction",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Possession Prediction",
                    description: "Knowing when a touch on the ball will lead to the possession of the ball going to the other team.",
                    rank: "",
                    upstreamSkills: ["Powershot + Powerclears", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="8b5a1709bd001cb3cd9bee3c80300276e4531ff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2802,-2223C2802,-2223 2408,-2223 2408,-2223 2402,-2223 2396,-2217 2396,-2211 2396,-2211 2396,-2141 2396,-2141 2396,-2135 2402,-2129 2408,-2129 2408,-2129 2802,-2129 2802,-2129 2808,-2129 2814,-2135 2814,-2141 2814,-2141 2814,-2211 2814,-2211 2814,-2217 2808,-2223 2802,-2223"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2187.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Possession Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2147.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="801627f5997fc9b6df68fbbcd96e5454f49ae0d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.01,-2402.66C1907.15,-2368.52 2184.41,-2315.77 2285,-2265 2304.11,-2255.35 2301.84,-2242.56 2321,-2233 2341.41,-2222.82 2363.5,-2214.46 2386.03,-2207.59"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2387.11,-2210.92 2395.71,-2204.74 2385.13,-2204.21 2387.11,-2210.92"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Powershot + Powerclears", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="95db5dbea9d6dd0b9b333735ed54b07d0bd15896" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2210.5,-2973C2210.5,-2973 1900.5,-2973 1900.5,-2973 1894.5,-2973 1888.5,-2967 1888.5,-2961 1888.5,-2961 1888.5,-2891 1888.5,-2891 1888.5,-2885 1894.5,-2879 1900.5,-2879 1900.5,-2879 2210.5,-2879 2210.5,-2879 2216.5,-2879 2222.5,-2885 2222.5,-2891 2222.5,-2891 2222.5,-2961 2222.5,-2961 2222.5,-2967 2216.5,-2973 2210.5,-2973"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2937.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Aerial Powershot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2897.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6e12ddd82ba76fbdfd2f127c4d354e7597f33141" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.11,-2442.83C1734.73,-2453.38 1765.92,-2470.16 1790,-2496 1846.92,-2557.09 1771.37,-2806.86 1826,-2870 1840.37,-2886.61 1858.78,-2898.71 1878.9,-2907.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1877.68,-2910.75 1888.26,-2911.26 1880.31,-2904.26 1877.68,-2910.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air roll shots",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas air rolling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12633/air-rolling-a-rocket-league-guide-on-effective-aerials"
                    }, {
                        text: "Ytzi13 Air roll usage comment",
                        url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                    }],

                    title: "Air roll shots",
                    description: "Tilting the car by using air roll to hit the ball in a way to get more power or slow the ball down.",
                    rank: "",
                    upstreamSkills: ["Powershot + Powerclears", "Bounce Powershots", "Joystick air roll"],
                    downstreamSkills: ["Sideways aerials"]
                }}><GroupWrapper id="8ed889690f1cbd15c45145c524af7e835735526a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2730,-3385C2730,-3385 2480,-3385 2480,-3385 2474,-3385 2468,-3379 2468,-3373 2468,-3373 2468,-3303 2468,-3303 2468,-3297 2474,-3291 2480,-3291 2480,-3291 2730,-3291 2730,-3291 2736,-3291 2742,-3297 2742,-3303 2742,-3303 2742,-3373 2742,-3373 2742,-3379 2736,-3385 2730,-3385"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3349.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Roll Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3309.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6593f4c98a54ef0fe027b6c0cc07a3c8bd7718e5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.04,-2398.26C1914.99,-2367.98 2204.15,-2344.47 2285,-2422 2354.03,-2488.2 2258.76,-3209.39 2321,-3282 2354.61,-3321.22 2407.07,-3337.92 2457.73,-3343.89"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2457.53,-3347.39 2467.83,-3344.95 2458.25,-3340.43 2457.53,-3347.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Guillotine passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Guillotine passing",
                    description: "An advanced form of the backboard pass, the guillotine pass or bevel pass, is where a player aims higher up on the backboard towards the curve between the ceiling and wall to send the ball straight down, like a guillotine’s blade.",
                    rank: "C",
                    upstreamSkills: ["Powershot + Powerclears", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="d38b4a8b07534956531b0f922440a52ab564a50b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2768,-1886C2768,-1886 2442,-1886 2442,-1886 2436,-1886 2430,-1880 2430,-1874 2430,-1874 2430,-1804 2430,-1804 2430,-1798 2436,-1792 2442,-1792 2442,-1792 2768,-1792 2768,-1792 2774,-1792 2780,-1798 2780,-1804 2780,-1804 2780,-1874 2780,-1874 2780,-1880 2774,-1886 2768,-1886"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1850.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Guillotine Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1810.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Guillotine passing",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="7361172893963c864d90140f043f64979e68390a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1534.36,-2392.83C1606.87,-2351.22 1719.72,-2292.97 1826,-2265 1875.45,-2251.99 2248.22,-2267.52 2285,-2232 2339.17,-2179.67 2270.16,-1950.57 2321,-1895 2346.83,-1866.76 2382.46,-1850.39 2419.74,-1841.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2420.78,-1844.67 2429.76,-1839.06 2419.24,-1837.84 2420.78,-1844.67"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Powershot + Powerclears", "Wall driving", "Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="b92bb096f87c33e3f2fe965b18a4ebdd7374756c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.5,-2223C2158.5,-2223 1952.5,-2223 1952.5,-2223 1946.5,-2223 1940.5,-2217 1940.5,-2211 1940.5,-2211 1940.5,-2141 1940.5,-2141 1940.5,-2135 1946.5,-2129 1952.5,-2129 1952.5,-2129 2158.5,-2129 2158.5,-2129 2164.5,-2129 2170.5,-2135 2170.5,-2141 2170.5,-2141 2170.5,-2211 2170.5,-2211 2170.5,-2217 2164.5,-2223 2158.5,-2223"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2187.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2147.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="c9f4387c8905c55860eef274e62c9c20ac39b475" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1530.01,-2392.89C1602.63,-2347.72 1718.46,-2280.19 1826,-2237 1859.03,-2223.73 1895.89,-2212.46 1930.21,-2203.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1931.5,-2206.62 1940.29,-2200.71 1929.73,-2199.85 1931.5,-2206.62"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Bounce Powershots"
                }}><GroupWrapper id="7f690d379036991dd5e1a8228d33fdfc5633cd0d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2245.69,-2838.96C2260.51,-2846.97 2273.97,-2857.13 2285,-2870 2344.82,-2939.77 2259.62,-3213.59 2321,-3282 2355.26,-3320.18 2407.4,-3336.77 2457.64,-3342.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2457.33,-3346.43 2467.66,-3344.04 2458.1,-3339.47 2457.33,-3346.43"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Recovery",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Powerslide Recovery",
                    description: "When landing after an aerial or after being bumped, holding powerslide when landing on the players wheels will allow them to keep their momentum and get back into the game faster.",
                    rank: "",
                    upstreamSkills: ["Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="ccfc412c31f61c5e442aacee30a71f358100b194" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1064,-6041C1064,-6041 687,-6041 687,-6041 681,-6041 675,-6035 675,-6029 675,-6029 675,-5959 675,-5959 675,-5953 681,-5947 687,-5947 687,-5947 1064,-5947 1064,-5947 1070,-5947 1076,-5953 1076,-5959 1076,-5959 1076,-6029 1076,-6029 1076,-6035 1070,-6041 1064,-6041"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-6005.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powerslide Recovery"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-5965.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Recovery",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="8eff5a91b6778636663f84b79a0efabc32d0103b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M629.25,-5951.57C641.03,-5953.61 652.93,-5955.67 664.79,-5957.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="664.3,-5961.19 674.75,-5959.44 665.5,-5954.29 664.3,-5961.19"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Powerslide Turning", "Hood dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9cae66b7d691f1ffdcd0d4bd94e7a9313f8dfad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3321,-5966C3321,-5966 2959,-5966 2959,-5966 2953,-5966 2947,-5960 2947,-5954 2947,-5954 2947,-5884 2947,-5884 2947,-5878 2953,-5872 2959,-5872 2959,-5872 3321,-5872 3321,-5872 3327,-5872 3333,-5878 3333,-5884 3333,-5884 3333,-5954 3333,-5954 3333,-5960 3327,-5966 3321,-5966"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5930.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Power Slide Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5890.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="133cd91cdf62e0d7e8a17dd618fc9ff8ba494556" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M629.29,-5919C832.88,-5919 1166.95,-5919 1455,-5919 1455,-5919 1455,-5919 2056.5,-5919 2363.36,-5919 2719.16,-5919 2936.63,-5919"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2936.88,-5922.5 2946.88,-5919 2936.88,-5915.5 2936.88,-5922.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rebound shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Rebound shots",
                    description: "When the ball hits a wall hard enough to start going towards midfield and the player uses prediction, aerials, and air rolls to score it.",
                    rank: "",
                    upstreamSkills: ["Redirects", "Prediction", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="97cc5b3e3e1b1e8bdeef9ae11de24d6cc3b84c24" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2193,-2525C2193,-2525 1918,-2525 1918,-2525 1912,-2525 1906,-2519 1906,-2513 1906,-2513 1906,-2443 1906,-2443 1906,-2437 1912,-2431 1918,-2431 1918,-2431 2193,-2431 2193,-2431 2199,-2431 2205,-2437 2205,-2443 2205,-2443 2205,-2513 2205,-2513 2205,-2519 2199,-2525 2193,-2525"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2489.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rebound Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2449.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Redirects"
                }}><GroupWrapper id="99fd4fb144afe2c7928adf112338cd2834b8afdd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-2539.4C1651.07,-2527.96 1788.83,-2510.9 1895.7,-2497.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1896.45,-2501.1 1905.95,-2496.4 1895.59,-2494.15 1896.45,-2501.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Calculated clears",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Calculated clears",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="aa723a315326f0bd6f118f2ebaedd4881971ef35" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2766.5,-878C2766.5,-878 2443.5,-878 2443.5,-878 2437.5,-878 2431.5,-872 2431.5,-866 2431.5,-866 2431.5,-796 2431.5,-796 2431.5,-790 2437.5,-784 2443.5,-784 2443.5,-784 2766.5,-784 2766.5,-784 2772.5,-784 2778.5,-790 2778.5,-796 2778.5,-796 2778.5,-866 2778.5,-866 2778.5,-872 2772.5,-878 2766.5,-878"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-842.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Calculated Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-802.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Close touch",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Close touch",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="0b6542643f9c3a44e2125b308a83d87c63b2d905" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2715,-766C2715,-766 2495,-766 2495,-766 2489,-766 2483,-760 2483,-754 2483,-754 2483,-684 2483,-684 2483,-678 2489,-672 2495,-672 2495,-672 2715,-672 2715,-672 2721,-672 2727,-678 2727,-684 2727,-684 2727,-754 2727,-754 2727,-760 2721,-766 2715,-766"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-730.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Close Touch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-690.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Chip shot",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip shot",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: ["Bait shot"]
                }}><GroupWrapper id="f8a692e57cdcc862c809b8714bf64ead67150191" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-2749C2146,-2749 1965,-2749 1965,-2749 1959,-2749 1953,-2743 1953,-2737 1953,-2737 1953,-2667 1953,-2667 1953,-2661 1959,-2655 1965,-2655 1965,-2655 2146,-2655 2146,-2655 2152,-2655 2158,-2661 2158,-2667 2158,-2667 2158,-2737 2158,-2737 2158,-2743 2152,-2749 2146,-2749"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2713.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2673.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chip shot",
                    tailId: "Chipping"
                }}><GroupWrapper id="b486ec05df0922059b44271fe2183d05eac44458" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.66,-3162.51C1634.44,-3151.94 1734.11,-3124.84 1790,-3056 1874.09,-2952.43 1737.5,-2857.83 1826,-2758 1855.16,-2725.11 1900.19,-2709.97 1942.59,-2703.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.3,-2706.92 1952.72,-2702.08 1942.34,-2699.98 1943.3,-2706.92"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chip clear",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip clear",
                    description: undefined,
                    rank: "S",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="4febe2ab31211febf0993449e272883091cc5535" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2152.5,-3197C2152.5,-3197 1958.5,-3197 1958.5,-3197 1952.5,-3197 1946.5,-3191 1946.5,-3185 1946.5,-3185 1946.5,-3115 1946.5,-3115 1946.5,-3109 1952.5,-3103 1958.5,-3103 1958.5,-3103 2152.5,-3103 2152.5,-3103 2158.5,-3103 2164.5,-3109 2164.5,-3115 2164.5,-3115 2164.5,-3185 2164.5,-3185 2164.5,-3191 2158.5,-3197 2152.5,-3197"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3161.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Clear"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3121.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chip clear",
                    tailId: "Chipping"
                }}><GroupWrapper id="c8ea805a484303a752c76afbd499bb15238c0a98" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-3165.77C1663.28,-3162.44 1826.03,-3157.27 1936.28,-3153.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1936.57,-3157.25 1946.45,-3153.44 1936.34,-3150.26 1936.57,-3157.25"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chip double touch",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip double touch",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="d9f80c7b8af52c78663c3ebe0cd03801e27c8c56" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228,-3309C2228,-3309 1883,-3309 1883,-3309 1877,-3309 1871,-3303 1871,-3297 1871,-3297 1871,-3227 1871,-3227 1871,-3221 1877,-3215 1883,-3215 1883,-3215 2228,-3215 2228,-3215 2234,-3215 2240,-3221 2240,-3227 2240,-3227 2240,-3297 2240,-3297 2240,-3303 2234,-3309 2228,-3309"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3273.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Double Touch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3233.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chip double touch",
                    tailId: "Chipping"
                }}><GroupWrapper id="552fb8bcb071e65f02cf90a5f6158df52091b1c4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-3184.83C1641.31,-3197.69 1760.21,-3216.19 1860.87,-3231.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1860.44,-3235.34 1870.86,-3233.42 1861.52,-3228.42 1860.44,-3235.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bait shot",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Bait shot",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Chip shot"],
                    downstreamSkills: []
                }}><GroupWrapper id="33ba745cb739ba6f8d59c66c7402863b9a44a761" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-3273C2695.5,-3273 2514.5,-3273 2514.5,-3273 2508.5,-3273 2502.5,-3267 2502.5,-3261 2502.5,-3261 2502.5,-3191 2502.5,-3191 2502.5,-3185 2508.5,-3179 2514.5,-3179 2514.5,-3179 2695.5,-3179 2695.5,-3179 2701.5,-3179 2707.5,-3185 2707.5,-3191 2707.5,-3191 2707.5,-3261 2707.5,-3261 2707.5,-3267 2701.5,-3273 2695.5,-3273"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3237.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bait Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3197.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bait shot",
                    tailId: "Chip shot"
                }}><GroupWrapper id="275dfb9bfde115526b3fa04a90c9048508b80a7b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.22,-2701.55C2203.71,-2706.97 2253.96,-2721.8 2285,-2758 2344.82,-2827.77 2259.62,-3101.59 2321,-3170 2363.21,-3217.05 2432.58,-3231.32 2492.07,-3233.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.19,-3237.2 2502.29,-3233.99 2492.39,-3230.2 2492.19,-3237.2"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Zap dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Zap dash",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Wave dash", "Speed flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="07d5091b56cc1a310bf61efd2a9f4bd39c2a4adf" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-5349C2695.5,-5349 2514.5,-5349 2514.5,-5349 2508.5,-5349 2502.5,-5343 2502.5,-5337 2502.5,-5337 2502.5,-5267 2502.5,-5267 2502.5,-5261 2508.5,-5255 2514.5,-5255 2514.5,-5255 2695.5,-5255 2695.5,-5255 2701.5,-5255 2707.5,-5261 2707.5,-5267 2707.5,-5267 2707.5,-5337 2707.5,-5337 2707.5,-5343 2701.5,-5349 2695.5,-5349"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5313.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Zap Dash"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5273.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Zap dash",
                    tailId: "Wave dash"
                }}><GroupWrapper id="bdeea73adb652fca8b2394c9e5599e9194668a58" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2167.29,-5257.33C2261.81,-5267 2397.07,-5280.83 2491.94,-5290.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2491.84,-5294.05 2502.15,-5291.58 2492.56,-5287.08 2491.84,-5294.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Wave dash"
                }}><GroupWrapper id="97ff0192c8fbde6c225ada95c170cd558c6511fa" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2167.05,-5246.16C2210.5,-5240.12 2256.68,-5224.88 2285,-5190 2359.71,-5098.01 2244.24,-4214.29 2321,-4124 2362.17,-4075.57 2432.07,-4061.4 2492.1,-4059.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.49,-4062.91 2502.41,-4059.19 2492.33,-4055.91 2492.49,-4062.91"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Leveling out",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Leveling out",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Wall driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="6b3d365b50e70756bdc414d32fafc2220ef76880" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2171.5,-1999C2171.5,-1999 1939.5,-1999 1939.5,-1999 1933.5,-1999 1927.5,-1993 1927.5,-1987 1927.5,-1987 1927.5,-1917 1927.5,-1917 1927.5,-1911 1933.5,-1905 1939.5,-1905 1939.5,-1905 2171.5,-1905 2171.5,-1905 2177.5,-1905 2183.5,-1911 2183.5,-1917 2183.5,-1917 2183.5,-1987 2183.5,-1987 2183.5,-1993 2177.5,-1999 2171.5,-1999"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1963.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Leveling Out"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1923.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Leveling out",
                    tailId: "Wall driving"
                }}><GroupWrapper id="763b994b6a045868362a41da8a85f8060c11ef86" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1547.93,-2128.82C1621.44,-2092.09 1728.4,-2041.84 1826,-2008 1855.16,-1997.89 1887.02,-1988.87 1917.44,-1981.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1918.41,-1984.54 1927.26,-1978.72 1916.71,-1977.75 1918.41,-1984.54"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Wall driving"
                }}><GroupWrapper id="f9c0ec896be088d2f058793787b28edea2c8310d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.72,-2176C1682.09,-2176 1827.34,-2176 1930.17,-2176"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1930.29,-2179.5 1940.29,-2176 1930.29,-2172.5 1930.29,-2179.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall catch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s dribbling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                    }],

                    title: "Wall catch",
                    description: "Stopping or slowing the ball on the wall by dribbling.",
                    rank: "",
                    upstreamSkills: ["Wall driving", "Catching"],
                    downstreamSkills: []
                }}><GroupWrapper id="7ab8dbca628402320020496ca2e50eb5a9962b06" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2702.5,-2110C2702.5,-2110 2507.5,-2110 2507.5,-2110 2501.5,-2110 2495.5,-2104 2495.5,-2098 2495.5,-2098 2495.5,-2028 2495.5,-2028 2495.5,-2022 2501.5,-2016 2507.5,-2016 2507.5,-2016 2702.5,-2016 2702.5,-2016 2708.5,-2016 2714.5,-2022 2714.5,-2028 2714.5,-2028 2714.5,-2098 2714.5,-2098 2714.5,-2104 2708.5,-2110 2702.5,-2110"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2074.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Catch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2034.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall catch",
                    tailId: "Wall driving"
                }}><GroupWrapper id="bddf6a1f226f3235ec64ef15485c811e8406d053" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1498.98,-2128.82C1562.11,-2061.84 1688.8,-1942.16 1826,-1896 2019.35,-1830.95 2119.99,-1776.05 2285,-1896 2326.95,-1926.5 2282.22,-1972.56 2321,-2007 2365.42,-2046.46 2429.44,-2061.37 2485.36,-2066.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2485.11,-2069.51 2495.34,-2066.74 2485.62,-2062.52 2485.11,-2069.51"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doomsee dish",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Doomsee dish",
                    description: "When a player push dribbles the ball into the opponent's corner then pops (Hitting the ball in a way where it allows the player to hit it again) it away from the wall to hit it in a way to attempt a shot on goal.",
                    rank: "",
                    upstreamSkills: ["Wall driving", "Game Awareness", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="e1b011f80eecc4d250648c956021f50aeb0878ae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2734.5,-2448C2734.5,-2448 2475.5,-2448 2475.5,-2448 2469.5,-2448 2463.5,-2442 2463.5,-2436 2463.5,-2436 2463.5,-2366 2463.5,-2366 2463.5,-2360 2469.5,-2354 2475.5,-2354 2475.5,-2354 2734.5,-2354 2734.5,-2354 2740.5,-2354 2746.5,-2360 2746.5,-2366 2746.5,-2366 2746.5,-2436 2746.5,-2436 2746.5,-2442 2740.5,-2448 2734.5,-2448"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2412.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Doomsee Dish"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2372.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Wall driving"
                }}><GroupWrapper id="88c81116498b22aca21d7c81489a6a2173751b51" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.53,-2208.08C1651.12,-2226.28 1743.37,-2248.78 1826,-2266 2042.84,-2311.2 2295.89,-2353.13 2453.05,-2377.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2452.84,-2381.41 2463.27,-2379.51 2453.93,-2374.49 2452.84,-2381.41"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Ceiling shots",
                    description: "Having the ball near or bounce off or around the ceiling for a shot on goal.",
                    rank: "",
                    upstreamSkills: ["Wall driving", "Game Awareness", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="17cc0c6cbc3f34d99fbd108905d9e1c36913221b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2726,-2336C2726,-2336 2484,-2336 2484,-2336 2478,-2336 2472,-2330 2472,-2324 2472,-2324 2472,-2254 2472,-2254 2472,-2248 2478,-2242 2484,-2242 2484,-2242 2726,-2242 2726,-2242 2732,-2242 2738,-2248 2738,-2254 2738,-2254 2738,-2324 2738,-2324 2738,-2330 2732,-2336 2726,-2336"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2300.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ceiling Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2260.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Wall driving"
                }}><GroupWrapper id="91e177a3f75b827e865d124e0fc673b66f860d0f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.68,-2197.06C1651.33,-2208.74 1743.58,-2222.74 1826,-2232 2047.41,-2256.87 2305.54,-2273.32 2461.76,-2281.89"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2461.73,-2285.4 2471.91,-2282.45 2462.11,-2278.41 2461.73,-2285.4"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling shuffle",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Mondo’s ceiling shuffle tutorial.",
                        url: "https://www.youtube.com/watch?v=bnNrwTKuh3c"
                    }],

                    title: "Ceiling shuffle",
                    description: "Having the car stay on the ceiling by turning in a way that keeps enough friction that it doesn’t fall.",
                    rank: "SSL",
                    upstreamSkills: ["Wall driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="45e3dafb9b0a08bbd8690727d4bf6066b874978e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2189.5,-2111C2189.5,-2111 1921.5,-2111 1921.5,-2111 1915.5,-2111 1909.5,-2105 1909.5,-2099 1909.5,-2099 1909.5,-2029 1909.5,-2029 1909.5,-2023 1915.5,-2017 1921.5,-2017 1921.5,-2017 2189.5,-2017 2189.5,-2017 2195.5,-2017 2201.5,-2023 2201.5,-2029 2201.5,-2029 2201.5,-2099 2201.5,-2099 2201.5,-2105 2195.5,-2111 2189.5,-2111"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2075.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ceiling Shuffle"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2035.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling shuffle",
                    tailId: "Wall driving"
                }}><GroupWrapper id="5d909e64e00333b3088c0a686449d7c5750e065f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.72,-2153C1672.26,-2135.65 1799.84,-2111.74 1899.44,-2093.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1900.11,-2096.5 1909.3,-2091.22 1898.82,-2089.62 1900.11,-2096.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Push dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers Dribbling Tutorial.",
                        url: "https://www.youtube.com/watch?v=eBmgRPOmh98"
                    }],

                    title: "Push dribbling",
                    description: "Having the ball on the ground and pushing it with the front of the players car.",
                    rank: "",
                    upstreamSkills: ["Ball camera control"],
                    downstreamSkills: ["Hood dribble", "Bounce dribbling", "Turtle Dribbling"]
                }}><GroupWrapper id="1f89633229d14b505f218fdea712129e5d18d1dd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2191.5,-4321C2191.5,-4321 1919.5,-4321 1919.5,-4321 1913.5,-4321 1907.5,-4315 1907.5,-4309 1907.5,-4309 1907.5,-4239 1907.5,-4239 1907.5,-4233 1913.5,-4227 1919.5,-4227 1919.5,-4227 2191.5,-4227 2191.5,-4227 2197.5,-4227 2203.5,-4233 2203.5,-4239 2203.5,-4239 2203.5,-4309 2203.5,-4309 2203.5,-4315 2197.5,-4321 2191.5,-4321"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4285.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Push Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4245.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Push dribbling",
                    tailId: "Ball camera control"
                }}><GroupWrapper id="f67d097a22f449d738d7f4193bff7081f66268ba" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1654.71,-4218.46C1733.58,-4229.42 1823.09,-4241.85 1897.39,-4252.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1896.92,-4255.64 1907.3,-4253.55 1897.88,-4248.71 1896.92,-4255.64"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtling",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: true,
                    notes: [],
                    title: "Turtling",
                    description: "After a jump, turning the car upside down so that it lands on the hood of the car is turtling. Players can score a goal while doing this and get the turtle shot award.",
                    rank: "",
                    upstreamSkills: ["Joystick air roll"],
                    downstreamSkills: ["Turtle Dribbling", "Turtle Flick"]
                }}><GroupWrapper id="f6ef1ec4e3cdd633da3819f1cb20f1feee3902c0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-3947C2146,-3947 1965,-3947 1965,-3947 1959,-3947 1953,-3941 1953,-3935 1953,-3935 1953,-3865 1953,-3865 1953,-3859 1959,-3853 1965,-3853 1965,-3853 2146,-3853 2146,-3853 2152,-3853 2158,-3859 2158,-3865 2158,-3865 2158,-3935 2158,-3935 2158,-3941 2152,-3947 2146,-3947"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3911.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3871.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtling",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="e2b88e6fb7f4839535804f4b80bd508434b1b885" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.21,-3900C1716.52,-3900 1849.54,-3900 1942.41,-3900"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.68,-3903.5 1952.68,-3900 1942.68,-3896.5 1942.68,-3903.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="74a606d5ec07a25bc04d3678938c76caff60933d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.21,-3939.21C1714.96,-3964.76 1845.53,-3997.54 1938.17,-4020.8"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1937.59,-4024.26 1948.14,-4023.3 1939.3,-4017.47 1937.59,-4024.26"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="92882808bdf167d4f112fe558aecff84b429732d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1608.93,-3852.89C1669.82,-3828.86 1737.77,-3795.02 1790,-3750 1812.41,-3730.68 1800.64,-3709.24 1826,-3694 1913.73,-3641.29 2206.48,-3721.65 2285,-3656 2332.64,-3616.17 2284.48,-3571.22 2321,-3521 2362.32,-3464.18 2427.14,-3420.4 2484.32,-3389.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2486.2,-3392.9 2493.43,-3385.15 2482.95,-3386.7 2486.2,-3392.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backwards aerials",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Backwards aerials",
                    description: "Hitting the ball in an aerial but, with the car being upside-down.",
                    rank: "",
                    upstreamSkills: ["Joystick air roll", "Basic aerials"],
                    downstreamSkills: ["Tornado spin"]
                }}><GroupWrapper id="dea8a431dbfc07fac1a133f50b3af766ad88409c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2225,-3797C2225,-3797 1886,-3797 1886,-3797 1880,-3797 1874,-3791 1874,-3785 1874,-3785 1874,-3715 1874,-3715 1874,-3709 1880,-3703 1886,-3703 1886,-3703 2225,-3703 2225,-3703 2231,-3703 2237,-3709 2237,-3715 2237,-3715 2237,-3785 2237,-3785 2237,-3791 2231,-3797 2225,-3797"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3761.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backwards Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3721.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backwards aerials",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="0b0d9c0a52762c08b1de328ec2b54a92242fcc60" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.21,-3860.79C1689.96,-3841.52 1783.11,-3818.13 1864.01,-3797.82"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1864.96,-3801.19 1873.81,-3795.36 1863.26,-3794.4 1864.96,-3801.19"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Speed flipping",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="2118c598e1936c0f53e31153b466368cabb9ab14" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1505.15,-5069.1C1571.73,-5131.6 1698.23,-5241.11 1826,-5302 1847.87,-5312.42 1871.88,-5321.02 1895.86,-5328.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1895.18,-5331.53 1905.76,-5330.92 1897.11,-5324.8 1895.18,-5331.53"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    }, "Hitting the ball against the floor or wall of the arena in a way that “pinches” the ball in a direction.", {
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                    }, {
                        text: "Rocket League Academy pinch shot tutorial.",
                        url: "https://www.youtube.com/watch?v=47wUzrUmNHQ"
                    }],

                    title: "Stalling",
                    description: "Using the air roll left button to cancel a flip.",
                    rank: "",
                    upstreamSkills: ["Directional air roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9f7b99a1949e67ad3915822fb4c785629eab00c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-5069C2146,-5069 1965,-5069 1965,-5069 1959,-5069 1953,-5063 1953,-5057 1953,-5057 1953,-4987 1953,-4987 1953,-4981 1959,-4975 1965,-4975 1965,-4975 2146,-4975 2146,-4975 2152,-4975 2158,-4981 2158,-4987 2158,-4987 2158,-5057 2158,-5057 2158,-5063 2152,-5069 2146,-5069"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5033.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Stalling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4993.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Stalling",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="6c6cb72f92935a8705a3f0424613374a52fa09fd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.78,-5022C1741.04,-5022 1858.43,-5022 1942.67,-5022"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.77,-5025.5 1952.77,-5022 1942.77,-5018.5 1942.77,-5025.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bunny hopping",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Shippotv’s bunny hop tutorial.",
                        url: "https://www.youtube.com/watch?v=p2PkJ3OyjXU"
                    }],

                    title: "Bunny hopping",
                    description: "An advanced version of wave dashing but, when landing holding air roll when flipping allowing for wave dashing in faster succession.",
                    rank: "",
                    upstreamSkills: ["Directional air roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="da8643db0fba88c2799215c0b1b595c0b8e3c51a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2197.5,-5181C2197.5,-5181 1913.5,-5181 1913.5,-5181 1907.5,-5181 1901.5,-5175 1901.5,-5169 1901.5,-5169 1901.5,-5099 1901.5,-5099 1901.5,-5093 1907.5,-5087 1913.5,-5087 1913.5,-5087 2197.5,-5087 2197.5,-5087 2203.5,-5087 2209.5,-5093 2209.5,-5099 2209.5,-5099 2209.5,-5169 2209.5,-5169 2209.5,-5175 2203.5,-5181 2197.5,-5181"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5145.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bunny Hopping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5105.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bunny hopping",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="5c24ee50eadb8367b58a63ebd7aba3aeba9829fe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.78,-5056.82C1722.28,-5071.73 1814.3,-5088.98 1891.16,-5103.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1890.95,-5106.9 1901.42,-5105.31 1892.24,-5100.02 1890.95,-5106.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tornado spin",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Tornado spin",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Directional air roll", "Backwards aerials", "Sideways aerials"],
                    downstreamSkills: ["Tornado Flick / Spin", "Breezi Flick"]
                }}><GroupWrapper id="494f28b9703c3cb93e33db4ff93b223fb4e23e00" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3668.5,-3423C3668.5,-3423 3426.5,-3423 3426.5,-3423 3420.5,-3423 3414.5,-3417 3414.5,-3411 3414.5,-3411 3414.5,-3341 3414.5,-3341 3414.5,-3335 3420.5,-3329 3426.5,-3329 3426.5,-3329 3668.5,-3329 3668.5,-3329 3674.5,-3329 3680.5,-3335 3680.5,-3341 3680.5,-3341 3680.5,-3411 3680.5,-3411 3680.5,-3417 3674.5,-3423 3668.5,-3423"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-3387.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tornado Spin"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-3347.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="78aa13f7936aab916925ecbebe2ff683e64c6d1d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.75,-4989.15C1701.21,-4980.07 1766.13,-4971.27 1826,-4966 1910.64,-4958.56 3292.12,-4985.15 3355,-4928 3404.36,-4883.14 3382.9,-4696.21 3391,-4630 3447.51,-4168.31 3517.08,-3611.19 3539.31,-3433.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3542.82,-3433.61 3540.59,-3423.25 3535.87,-3432.74 3542.82,-3433.61"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip resets",
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

                    title: "Flip resets",
                    description: "Hitting anything with the bottom of the car on all of the wheels at once to reset the flip timer on the car. Mainly used for ceiling shots, flip resets can also be used with dribbling and redirects.",
                    rank: "",
                    upstreamSkills: ["Flip window"],
                    downstreamSkills: []
                }}><GroupWrapper id="0fe3247bc2c9e35723c70886c2da1c9b57cf642b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2156,-4807C2156,-4807 1955,-4807 1955,-4807 1949,-4807 1943,-4801 1943,-4795 1943,-4795 1943,-4725 1943,-4725 1943,-4719 1949,-4713 1955,-4713 1955,-4713 2156,-4713 2156,-4713 2162,-4713 2168,-4719 2168,-4725 2168,-4725 2168,-4795 2168,-4795 2168,-4801 2162,-4807 2156,-4807"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4771.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Resets"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4731.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip resets",
                    tailId: "Flip window"
                }}><GroupWrapper id="3afc56c662b85082767d2e1dfb1268c22473e11f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1547.93,-4583.18C1621.44,-4619.91 1728.4,-4670.16 1826,-4704 1860.22,-4715.86 1898.14,-4726.23 1933.1,-4734.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1932.34,-4738.12 1942.88,-4737.05 1933.97,-4731.32 1932.34,-4738.12"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Flip window"],
                    downstreamSkills: []
                }}><GroupWrapper id="17075a55ee3dc99408922e99aa3b9d8397b11618" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2241,-4583C2241,-4583 1870,-4583 1870,-4583 1864,-4583 1858,-4577 1858,-4571 1858,-4571 1858,-4501 1858,-4501 1858,-4495 1864,-4489 1870,-4489 1870,-4489 2241,-4489 2241,-4489 2247,-4489 2253,-4495 2253,-4501 2253,-4501 2253,-4571 2253,-4571 2253,-4577 2247,-4583 2241,-4583"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4547.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rumble - UFO Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4507.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - UFO Shots",
                    tailId: "Flip window"
                }}><GroupWrapper id="0250975e69ab579c1a04a079b5a1a0e21c674911" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1581.53,-4536C1658.42,-4536 1758.99,-4536 1847.61,-4536"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1847.8,-4539.5 1857.8,-4536 1847.8,-4532.5 1847.8,-4539.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Zap dash",
                    tailId: "Speed flipping"
                }}><GroupWrapper id="d76756184096fb581ac06959e244cb32f1f993a4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2205.02,-5342.81C2295.55,-5333.55 2409.37,-5321.91 2492.25,-5313.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.61,-5316.91 2502.2,-5312.41 2491.9,-5309.95 2492.61,-5316.91"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: ["Spring Roll"]
                }}><GroupWrapper id="22b7d554e91104658d1fd7dd53c5509ac0553f92" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-4209C2146,-4209 1965,-4209 1965,-4209 1959,-4209 1953,-4203 1953,-4197 1953,-4197 1953,-4127 1953,-4127 1953,-4121 1959,-4115 1965,-4115 1965,-4115 2146,-4115 2146,-4115 2152,-4115 2158,-4121 2158,-4127 2158,-4127 2158,-4197 2158,-4197 2158,-4203 2152,-4209 2146,-4209"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4173.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Doinking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4133.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Doinking"
                }}><GroupWrapper id="f74ec4708b4af8a62b07acaf86411af898938406" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.1,-4162.06C2203.42,-4156.53 2253.57,-4141.72 2285,-4106 2378.96,-3999.22 2224.66,-3892.64 2321,-3788 2361,-3744.55 2424.2,-3729.25 2480.73,-3725.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.05,-3728.87 2490.84,-3724.8 2480.65,-3721.88 2481.05,-3728.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kuxir pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Helvetiagaming's kuxir pinch tutorial.",
                        url: "https://www.youtube.com/watch?v=aYuTibfTZ4M"
                    }],

                    title: "Kuxir pinch",
                    description: "Pinching the ball against the wall to make a shot on goal.",
                    rank: "",
                    upstreamSkills: ["Wall pinch"],
                    downstreamSkills: ["Hoops - Basket Pinch"]
                }}><GroupWrapper id="19f714137c3551fd679698d1528df94f691d1694" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2710,-4339C2710,-4339 2500,-4339 2500,-4339 2494,-4339 2488,-4333 2488,-4327 2488,-4327 2488,-4257 2488,-4257 2488,-4251 2494,-4245 2500,-4245 2500,-4245 2710,-4245 2710,-4245 2716,-4245 2722,-4251 2722,-4257 2722,-4257 2722,-4327 2722,-4327 2722,-4333 2716,-4339 2710,-4339"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4303.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Kuxir Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4263.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Kuxir pinch"],
                    downstreamSkills: []
                }}><GroupWrapper id="9d18007d3de438d638a68348f5957c2bde716b8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3333.5,-4339C3333.5,-4339 2946.5,-4339 2946.5,-4339 2940.5,-4339 2934.5,-4333 2934.5,-4327 2934.5,-4327 2934.5,-4257 2934.5,-4257 2934.5,-4251 2940.5,-4245 2946.5,-4245 2946.5,-4245 3333.5,-4245 3333.5,-4245 3339.5,-4245 3345.5,-4251 3345.5,-4257 3345.5,-4257 3345.5,-4327 3345.5,-4327 3345.5,-4333 3339.5,-4339 3333.5,-4339"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4303.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hoops - Basket Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4263.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Basket Pinch",
                    tailId: "Kuxir pinch"
                }}><GroupWrapper id="e2579cb88734ffd2d7fb450753917b52053100b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2722.31,-4292C2781.43,-4292 2855.19,-4292 2924.15,-4292"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2924.29,-4295.5 2934.29,-4292 2924.29,-4288.5 2924.29,-4295.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Turtle Dribbling",
                    description: "A type of push dribble, where the player is turtling while dribbling.",
                    rank: "",
                    upstreamSkills: ["Turtling", "Push dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="0a0ec5499fd29060e4849605f069cc89d07aebab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2751.5,-4003C2751.5,-4003 2458.5,-4003 2458.5,-4003 2452.5,-4003 2446.5,-3997 2446.5,-3991 2446.5,-3991 2446.5,-3921 2446.5,-3921 2446.5,-3915 2452.5,-3909 2458.5,-3909 2458.5,-3909 2751.5,-3909 2751.5,-3909 2757.5,-3909 2763.5,-3915 2763.5,-3921 2763.5,-3921 2763.5,-3991 2763.5,-3991 2763.5,-3997 2757.5,-4003 2751.5,-4003"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3967.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3927.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Turtling"
                }}><GroupWrapper id="c9e95ffab6a02abd861459b79c033ee19ec33712" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.2,-3910.4C2236.14,-3918.37 2345.38,-3929.55 2436.22,-3938.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2436.05,-3942.34 2446.35,-3939.88 2436.76,-3935.38 2436.05,-3942.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Turtling"],
                    downstreamSkills: []
                }}><GroupWrapper id="d694e122c43be2d97de647a2a32990e547b54583" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2710,-3891C2710,-3891 2500,-3891 2500,-3891 2494,-3891 2488,-3885 2488,-3879 2488,-3879 2488,-3809 2488,-3809 2488,-3803 2494,-3797 2500,-3797 2500,-3797 2710,-3797 2710,-3797 2716,-3797 2722,-3803 2722,-3809 2722,-3809 2722,-3879 2722,-3879 2722,-3885 2716,-3891 2710,-3891"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3855.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3815.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Flick",
                    tailId: "Turtling"
                }}><GroupWrapper id="af34872fb0c9c299694b3c45d92970eb48888303" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.2,-3889.6C2248.4,-3880.37 2380.51,-3866.86 2477.5,-3856.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2478.07,-3860.4 2487.66,-3855.9 2477.36,-3853.43 2478.07,-3860.4"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Fast Kickoffs"],
                    downstreamSkills: []
                }}><GroupWrapper id="46cec1e55d05a6e20e991106ff55c5e0d10bbe29" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3300.5,-4807C3300.5,-4807 2979.5,-4807 2979.5,-4807 2973.5,-4807 2967.5,-4801 2967.5,-4795 2967.5,-4795 2967.5,-4725 2967.5,-4725 2967.5,-4719 2973.5,-4713 2979.5,-4713 2979.5,-4713 3300.5,-4713 3300.5,-4713 3306.5,-4713 3312.5,-4719 3312.5,-4725 3312.5,-4725 3312.5,-4795 3312.5,-4795 3312.5,-4801 3306.5,-4807 3300.5,-4807"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4771.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wavedash Kickoff"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4731.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wavedash Kickoff",
                    tailId: "Fast Kickoffs"
                }}><GroupWrapper id="67d9afd180d6e1f10cc6a76e7f00728105982e64" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2733.67,-4760C2800.51,-4760 2883.52,-4760 2956.98,-4760"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2957.28,-4763.5 2967.28,-4760 2957.28,-4756.5 2957.28,-4763.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Half flipping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Kronovi half flip tutorial.",
                        url: "https://www.youtube.com/watch?v=9920AGZg620"
                    }, {
                        text: "Dignitas’s half-flip guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12628/half-flips-where-when-and-how"
                    }, {
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                    }],

                    title: "Half flipping",
                    description: "Diagonal backflipping then flicking up on the analog stick or “W” on keyboard when the car is parallel to the floor to invert the direction of the car. This move allows the player to constantly boost throughout.",
                    rank: "",
                    upstreamSkills: ["Flip canceling"],
                    downstreamSkills: ["Forward half flipping"]
                }}><GroupWrapper id="6e456ff83a6fb39702fb4818a12508833212f04e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2724.5,-5873C2724.5,-5873 2485.5,-5873 2485.5,-5873 2479.5,-5873 2473.5,-5867 2473.5,-5861 2473.5,-5861 2473.5,-5791 2473.5,-5791 2473.5,-5785 2479.5,-5779 2485.5,-5779 2485.5,-5779 2724.5,-5779 2724.5,-5779 2730.5,-5779 2736.5,-5785 2736.5,-5791 2736.5,-5791 2736.5,-5861 2736.5,-5861 2736.5,-5867 2730.5,-5873 2724.5,-5873"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5837.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Half Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5797.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Half flipping",
                    tailId: "Flip canceling"
                }}><GroupWrapper id="27e3db83e2cb3f4ddec06f20804f6b0c40463e73" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2199.28,-5839.31C2280.55,-5836.63 2381.99,-5833.3 2462.97,-5830.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2463.37,-5834.13 2473.25,-5830.3 2463.14,-5827.13 2463.37,-5834.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doinking",
                    tailId: "Popping"
                }}><GroupWrapper id="2c4d9f9f18fcf706152e3f4ba6b7590de8a75010" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.58,-4317.05C1626.67,-4304.95 1716.9,-4283.45 1790,-4247 1808.39,-4237.83 1807.58,-4227.11 1826,-4218 1862.13,-4200.13 1904.36,-4187.72 1942.62,-4179.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.73,-4182.55 1952.77,-4177.02 1942.26,-4175.71 1943.73,-4182.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double touches",
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

                    title: "Double touches",
                    description: "Usually after a pop (Hitting the ball in a way where it allows the player to hit it again,) a double touch is where the player hits the ball off the wall to pass to themselves.",
                    rank: "",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="f0e48d8570476a93f9304a0346a5f0cbf9687edc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2199.5,-4433C2199.5,-4433 1911.5,-4433 1911.5,-4433 1905.5,-4433 1899.5,-4427 1899.5,-4421 1899.5,-4421 1899.5,-4351 1899.5,-4351 1899.5,-4345 1905.5,-4339 1911.5,-4339 1911.5,-4339 2199.5,-4339 2199.5,-4339 2205.5,-4339 2211.5,-4345 2211.5,-4351 2211.5,-4351 2211.5,-4421 2211.5,-4421 2211.5,-4427 2205.5,-4433 2199.5,-4433"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4397.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Touches"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4357.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double touches",
                    tailId: "Popping"
                }}><GroupWrapper id="d490c51b781f4314627ff622454f363a65369b60" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-4340.36C1649.22,-4348.69 1783.31,-4361.04 1889.23,-4370.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1889.11,-4374.29 1899.39,-4371.72 1889.75,-4367.32 1889.11,-4374.29"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "45 degree flick",
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

                    title: "45 degree flick",
                    description: "Usually during a hood dribble, the player pops (Hitting the ball in a way where it allows the player to hit it again) the ball then angles their car to hit the",
                    rank: "",
                    upstreamSkills: ["Popping", "Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="a44c3fda54c2848638e74852c4edfad6b48b6a7b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3692,-4733C3692,-4733 3403,-4733 3403,-4733 3397,-4733 3391,-4727 3391,-4721 3391,-4721 3391,-4651 3391,-4651 3391,-4645 3397,-4639 3403,-4639 3403,-4639 3692,-4639 3692,-4639 3698,-4639 3704,-4645 3704,-4651 3704,-4651 3704,-4721 3704,-4721 3704,-4727 3698,-4733 3692,-4733"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-4697.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"45 Degree Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-4657.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "45 degree flick",
                    tailId: "Popping"
                }}><GroupWrapper id="89aab463b2aa42e628b16805c3e43a3f78983a9d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.56,-4367.84C1631.89,-4392.88 1733.82,-4424.52 1826,-4442 2027.11,-4480.14 2081.83,-4455.04 2285,-4480 2679.84,-4528.51 3140.29,-4610.09 3380.85,-4654.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3380.25,-4658.09 3390.72,-4656.48 3381.53,-4651.21 3380.25,-4658.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Team pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Team pinch",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="762c743dd4e9d3683cda58f1199d93c5a7edce1d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561,-1063C1561,-1063 1351,-1063 1351,-1063 1345,-1063 1339,-1057 1339,-1051 1339,-1051 1339,-981 1339,-981 1339,-975 1345,-969 1351,-969 1351,-969 1561,-969 1561,-969 1567,-969 1573,-975 1573,-981 1573,-981 1573,-1051 1573,-1051 1573,-1057 1567,-1063 1561,-1063"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1027.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Team Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-987.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kuxir pinch",
                    tailId: "Wall pinch"
                }}><GroupWrapper id="238c61ab422a7413770f10cb5d2481a371395195" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2162.65,-4053.24C2205.61,-4059.83 2252.61,-4074.57 2285,-4106 2328.02,-4147.76 2277.05,-4195.22 2321,-4236 2362.82,-4274.8 2423.46,-4290.16 2477.88,-4295.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2477.71,-4298.76 2487.97,-4296.09 2478.29,-4291.78 2477.71,-4298.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Awareness",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Tutorial by Rocket League Academy",
                        url: "https://www.youtube.com/watch?v=pn0d3BFbbf4"
                    }, {
                        text: "Reddit Post by u/dondochaka",
                        url: "https://www.reddit.com/r/RocketLeague/comments/8dyxgj/psa_awareness_is_just_as_more_important_than/"
                    }],

                    title: "Game Awareness",
                    description: "Game awareness is keeping track of everything on the field. From if you are being boost starved (when an opponent is taking your goal side boost) to where players are on the field, and if you can win a challenge or not.",
                    rank: "",
                    upstreamSkills: ["Teammate Awareness", "Rotation", "Game Speed", "Prediction"],

                    downstreamSkills: [
                        "Calculated clears",
                        "Close touch",
                        "Shadowing",
                        "Opponent Boost Management",
                        "Possession Prediction",
                        "Playstyle Reading",
                        "Kickoff prediction",
                        "Opponent prediction",
                        "Advanced boost management",
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
                        d="M2212,-1213C2212,-1213 1899,-1213 1899,-1213 1893,-1213 1887,-1207 1887,-1201 1887,-1201 1887,-1131 1887,-1131 1887,-1125 1893,-1119 1899,-1119 1899,-1119 2212,-1119 2212,-1119 2218,-1119 2224,-1125 2224,-1131 2224,-1131 2224,-1201 2224,-1201 2224,-1207 2218,-1213 2212,-1213"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1177.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Game Awareness"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1137.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Calculated clears",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="8f193039778234c96be295d7a8587507e0fd901d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2121,-1118.83C2170.48,-1080.25 2238.03,-1022.08 2285,-960 2306.82,-931.15 2292.29,-909.01 2321,-887 2349.98,-864.79 2385.4,-850.69 2421.24,-841.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2422.41,-845.2 2431.36,-839.53 2420.83,-838.38 2422.41,-845.2"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Close touch",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="c9d469d69e27a959dc9175675d57953ea3fa865d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2130.14,-1118.91C2181.68,-1081.98 2247.73,-1025.9 2285,-960 2326.23,-887.09 2261.86,-834.32 2321,-775 2360.36,-735.51 2419,-719.78 2472.72,-714.61"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2473.01,-718.09 2482.68,-713.76 2472.42,-711.12 2473.01,-718.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Game Awareness", "Positioning"],
                    downstreamSkills: []
                }}><GroupWrapper id="e53555343e30299d84ed9ce47681c9d59614d7fc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2706,-1774C2706,-1774 2504,-1774 2504,-1774 2498,-1774 2492,-1768 2492,-1762 2492,-1762 2492,-1692 2492,-1692 2492,-1686 2498,-1680 2504,-1680 2504,-1680 2706,-1680 2706,-1680 2712,-1680 2718,-1686 2718,-1692 2718,-1692 2718,-1762 2718,-1762 2718,-1768 2712,-1774 2706,-1774"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1738.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Shadowing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1698.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="21204dd13f3ebc8562e7c30347a6ed2beea4a3b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.04,-1184.67C2247.4,-1194.13 2268.89,-1207.69 2285,-1227 2348.42,-1303 2255.12,-1597.11 2321,-1671 2360.62,-1715.43 2424.46,-1730.68 2481.48,-1734.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.51,-1737.77 2491.67,-1734.78 2481.87,-1730.78 2481.51,-1737.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Opponent Boost Management",
                    description: "Mostly used in one verses one games and an advanced version of self boost management; It is the practice of knowing how much boost the opponent currently has at any moment.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="706e36a274b1cefd87f6a0b56902596027196f36" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2877,-654C2877,-654 2333,-654 2333,-654 2327,-654 2321,-648 2321,-642 2321,-642 2321,-572 2321,-572 2321,-566 2327,-560 2333,-560 2333,-560 2877,-560 2877,-560 2883,-560 2889,-566 2889,-572 2889,-572 2889,-642 2889,-642 2889,-648 2883,-654 2877,-654"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-618.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Opponent Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-578.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="86d86f548fb4ae64e6c33c63d7d1a638f3be6a08" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2132.67,-1118.91C2184.74,-1082.34 2250.36,-1026.72 2285,-960 2315.63,-901 2275.78,-711.73 2321,-663 2321.54,-662.41 2322.09,-661.83 2322.64,-661.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2325.31,-663.55 2330.04,-654.07 2320.43,-658.53 2325.31,-663.55"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="3f2bf2ce818de0032db4a4a2cab7c52c512cd922" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.14,-1208.14C2247.95,-1221.07 2269.55,-1237.96 2285,-1260 2339.82,-1338.23 2258.95,-2046.37 2321,-2119 2338.54,-2139.53 2361.22,-2153.94 2386.12,-2163.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2385.17,-2167.28 2395.76,-2167.51 2387.62,-2160.73 2385.17,-2167.28"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Playstyle Reading",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Playstyle Reading",
                    description: "Being able to watch a player and understand their weaknesses and play against them.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6e557670f4bc0f5c3a2d75244514eca81de801ad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2766.5,-542C2766.5,-542 2443.5,-542 2443.5,-542 2437.5,-542 2431.5,-536 2431.5,-530 2431.5,-530 2431.5,-460 2431.5,-460 2431.5,-454 2437.5,-448 2443.5,-448 2443.5,-448 2766.5,-448 2766.5,-448 2772.5,-448 2778.5,-454 2778.5,-460 2778.5,-460 2778.5,-530 2778.5,-530 2778.5,-536 2772.5,-542 2766.5,-542"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-506.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Playstyle Reading"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-466.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Playstyle Reading",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="20995368ade62436142b3311fab09e973cf901ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2133.9,-1118.86C2186.19,-1082.45 2251.58,-1027.04 2285,-960 2325.71,-878.34 2260.04,-618.89 2321,-551 2346.95,-522.09 2383.16,-505.56 2421.03,-496.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2422.2,-499.89 2431.21,-494.32 2420.69,-493.05 2422.2,-499.89"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kickoff prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Kickoff prediction",
                    description: "Reading the opponent in a 50/50 but during kickoff.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="f739d0f6e6e90379c4c56d3ccfe6c0f612094445" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2767.5,-430C2767.5,-430 2442.5,-430 2442.5,-430 2436.5,-430 2430.5,-424 2430.5,-418 2430.5,-418 2430.5,-348 2430.5,-348 2430.5,-342 2436.5,-336 2442.5,-336 2442.5,-336 2767.5,-336 2767.5,-336 2773.5,-336 2779.5,-342 2779.5,-348 2779.5,-348 2779.5,-418 2779.5,-418 2779.5,-424 2773.5,-430 2767.5,-430"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-394.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Kickoff Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-354.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kickoff prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="e8f6624f6272b0e403d7efe20e8240e98780eabf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2134.57,-1118.85C2187,-1082.54 2252.27,-1027.23 2285,-960 2335.8,-855.65 2244.28,-526.08 2321,-439 2346.61,-409.94 2382.57,-393.32 2420.29,-384.29"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2421.44,-387.62 2430.44,-382.04 2419.92,-380.78 2421.44,-387.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Opponent prediction",
                    description: "Understanding what the opponent will do from experience and responding beforehand.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b358190da5082ad2e952824b0c66563b8bf3b812" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2793.5,-318C2793.5,-318 2416.5,-318 2416.5,-318 2410.5,-318 2404.5,-312 2404.5,-306 2404.5,-306 2404.5,-236 2404.5,-236 2404.5,-230 2410.5,-224 2416.5,-224 2416.5,-224 2793.5,-224 2793.5,-224 2799.5,-224 2805.5,-230 2805.5,-236 2805.5,-236 2805.5,-306 2805.5,-306 2805.5,-312 2799.5,-318 2793.5,-318"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-282.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Opponent Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-242.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="4f5def919719b5a5d7e006c1d5bcc03154641b15" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2134.82,-1118.98C2187.37,-1082.72 2252.68,-1027.43 2285,-960 2315.45,-896.47 2274.75,-380.14 2321,-327 2340.64,-304.43 2366.53,-289.34 2394.68,-279.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2395.89,-282.76 2404.31,-276.33 2393.72,-276.11 2395.89,-282.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Advanced boost management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Advanced boost management",
                    description: undefined,
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c48605009e0d6fa3d6e8ef11ea81b306dfbba4b0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2877,-206C2877,-206 2333,-206 2333,-206 2327,-206 2321,-200 2321,-194 2321,-194 2321,-124 2321,-124 2321,-118 2327,-112 2333,-112 2333,-112 2877,-112 2877,-112 2883,-112 2889,-118 2889,-124 2889,-124 2889,-194 2889,-194 2889,-200 2883,-206 2877,-206"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-170.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Advanced Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-130.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Advanced boost management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="ce04c9ddc20cd3a0fa968676ec9db25579a4d186" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2135.28,-1118.87C2187.87,-1082.64 2253.02,-1027.45 2285,-960 2320.5,-885.12 2266.86,-277.75 2321,-215 2321.42,-214.51 2321.85,-214.03 2322.27,-213.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2325.07,-215.69 2329.45,-206.04 2320.01,-210.85 2325.07,-215.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boost Stealing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Boost Stealing",
                    description: "Taking large boost or dollars (another name for large boost) at the opponents goal side.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4dc40bb7caf9fed2ed66bb13f46fbb1df2387ff2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2736.5,-94C2736.5,-94 2473.5,-94 2473.5,-94 2467.5,-94 2461.5,-88 2461.5,-82 2461.5,-82 2461.5,-12 2461.5,-12 2461.5,-6 2467.5,0 2473.5,0 2473.5,0 2736.5,0 2736.5,0 2742.5,0 2748.5,-6 2748.5,-12 2748.5,-12 2748.5,-82 2748.5,-82 2748.5,-88 2742.5,-94 2736.5,-94"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-58.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Boost Stealing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-18.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boost Stealing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cb3916ed6895d30b621b55760369746d38aca7bf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2135.41,-1118.93C2188.06,-1082.74 2253.24,-1027.55 2285,-960 2325.56,-873.75 2258.97,-175.36 2321,-103 2353.17,-65.47 2402.61,-48.55 2451.21,-41.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2451.73,-45.4 2461.23,-40.71 2450.88,-38.45 2451.73,-45.4"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Clear Prevention",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Clear Prevention",
                    description: "Being able to predict where the ball will be cleared and try to keep the ball in the opponent's side.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="5ea77ad958d862ae971aa72ce8101208cc8fd5b6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2758,-1662C2758,-1662 2452,-1662 2452,-1662 2446,-1662 2440,-1656 2440,-1650 2440,-1650 2440,-1580 2440,-1580 2440,-1574 2446,-1568 2452,-1568 2452,-1568 2758,-1568 2758,-1568 2764,-1568 2770,-1574 2770,-1580 2770,-1580 2770,-1650 2770,-1650 2770,-1656 2764,-1662 2758,-1662"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1626.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Clear Prevention"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1586.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Clear Prevention",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b4b3e97ec498cd1c679051ecdd4af42abf11f05b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.16,-1185.28C2247.36,-1194.68 2268.76,-1208.07 2285,-1227 2381.63,-1339.66 2220.73,-1449.57 2321,-1559 2349.19,-1589.77 2389.01,-1606.44 2429.9,-1614.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2429.27,-1618.38 2439.75,-1616.82 2430.59,-1611.5 2429.27,-1618.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cherry picking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Cherry picking",
                    description: "Usually during infield passes, the player angles a powershot during an aerial for a shot on goal.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b18dcf1bf8d0f5cecb3079a28bfad5b15164a811" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2741,-1550C2741,-1550 2469,-1550 2469,-1550 2463,-1550 2457,-1544 2457,-1538 2457,-1538 2457,-1468 2457,-1468 2457,-1462 2463,-1456 2469,-1456 2469,-1456 2741,-1456 2741,-1456 2747,-1456 2753,-1462 2753,-1468 2753,-1468 2753,-1538 2753,-1538 2753,-1544 2747,-1550 2741,-1550"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1514.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Cherry Picking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1474.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cherry picking",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="6ed1c637384cc9a334843c2a35aeb18256a48035" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.14,-1186.41C2247.12,-1195.69 2268.46,-1208.74 2285,-1227 2351.52,-1300.43 2252.11,-1375.79 2321,-1447 2353.69,-1480.79 2400.45,-1497.33 2446.57,-1504.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2446.3,-1508.22 2456.71,-1506.21 2447.32,-1501.3 2446.3,-1508.22"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Corner pass",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Corner pass",
                    description: "Hitting or rolling the ball into the opponent's corner with the purpose to get the ball in front of the goal for a pass.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="51a5e5c46fb1d44a5bf47841bef257507504eff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2715,-1438C2715,-1438 2495,-1438 2495,-1438 2489,-1438 2483,-1432 2483,-1426 2483,-1426 2483,-1356 2483,-1356 2483,-1350 2489,-1344 2495,-1344 2495,-1344 2715,-1344 2715,-1344 2721,-1344 2727,-1350 2727,-1356 2727,-1356 2727,-1426 2727,-1426 2727,-1432 2721,-1438 2715,-1438"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1402.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Corner Pass"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1362.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Corner pass",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="461158952042e2b2d3d40833ee16ebb46418a4d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224,-1189.74C2246.44,-1198.63 2267.66,-1210.68 2285,-1227 2321.85,-1261.67 2283.03,-1301.55 2321,-1335 2362.22,-1371.31 2420.07,-1386.79 2472.73,-1392.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2472.54,-1396.12 2482.84,-1393.63 2473.24,-1389.15 2472.54,-1396.12"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot passing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Dignitas’s Power shot guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                    }],

                    title: "Powershot passing",
                    description: "Clearing from the players side of the field to an teammate in midfield (between the players goal and the opponents goal) or near the opponents goal.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="04c45cc997fa47189f5c85cf56f1bfcad9a0654f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2775.5,-1326C2775.5,-1326 2434.5,-1326 2434.5,-1326 2428.5,-1326 2422.5,-1320 2422.5,-1314 2422.5,-1314 2422.5,-1244 2422.5,-1244 2422.5,-1238 2428.5,-1232 2434.5,-1232 2434.5,-1232 2775.5,-1232 2775.5,-1232 2781.5,-1232 2787.5,-1238 2787.5,-1244 2787.5,-1244 2787.5,-1314 2787.5,-1314 2787.5,-1320 2781.5,-1326 2775.5,-1326"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1290.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powershot Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1250.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="73177d9443084b5fe018c1d95df1c3f588c7d818" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.32,-1202.61C2256.39,-1209.48 2289.72,-1216.53 2321,-1223 2350.54,-1229.11 2381.85,-1235.44 2412.45,-1241.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2411.87,-1245.01 2422.36,-1243.53 2413.24,-1238.14 2411.87,-1245.01"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backboard passing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Backboard passing",
                    description: "Hitting the ball against the wall above the opponent’s goal with the intent for a pass.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="7c745c1619ce496adb98ad777a43ffab482afad4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2778.5,-1214C2778.5,-1214 2431.5,-1214 2431.5,-1214 2425.5,-1214 2419.5,-1208 2419.5,-1202 2419.5,-1202 2419.5,-1132 2419.5,-1132 2419.5,-1126 2425.5,-1120 2431.5,-1120 2431.5,-1120 2778.5,-1120 2778.5,-1120 2784.5,-1120 2790.5,-1126 2790.5,-1132 2790.5,-1132 2790.5,-1202 2790.5,-1202 2790.5,-1208 2784.5,-1214 2778.5,-1214"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1178.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backboard Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1138.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backboard passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="9bbc79b2c3b8d3750a50d19d48dcdbbc70c3991b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.12,-1166.31C2282.64,-1166.41 2348.82,-1166.53 2409.35,-1166.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2409.4,-1170.14 2419.41,-1166.66 2409.41,-1163.14 2409.4,-1170.14"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Back-passing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Back-passing",
                    description: "Hitting the ball towards an teammate closer to goal.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6dbb66d80f6a9020c7a2bd3cd6e334226b358b0d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2725,-1102C2725,-1102 2485,-1102 2485,-1102 2479,-1102 2473,-1096 2473,-1090 2473,-1090 2473,-1020 2473,-1020 2473,-1014 2479,-1008 2485,-1008 2485,-1008 2725,-1008 2725,-1008 2731,-1008 2737,-1014 2737,-1020 2737,-1020 2737,-1090 2737,-1090 2737,-1096 2731,-1102 2725,-1102"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1066.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Back-passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1026.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Back-passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="d13f3701214bb777840e3fb34cd86a1f8bd83764" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224,-1130.91C2256.18,-1124.25 2289.63,-1117.37 2321,-1111 2367.19,-1101.63 2417.65,-1091.58 2463.02,-1082.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2463.78,-1086.04 2472.91,-1080.67 2462.43,-1079.17 2463.78,-1086.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Infield passing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Infield passing",
                    description: "Hitting the ball towards an teammate in midfield (between the players goal and the opponents goal.)",
                    rank: "D",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="19ffb85246b85d1c44fbe34397993326cba4856e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2738,-990C2738,-990 2472,-990 2472,-990 2466,-990 2460,-984 2460,-978 2460,-978 2460,-908 2460,-908 2460,-902 2466,-896 2472,-896 2472,-896 2738,-896 2738,-896 2744,-896 2750,-902 2750,-908 2750,-908 2750,-978 2750,-978 2750,-984 2744,-990 2738,-990"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-954.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Infield Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-914.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▽ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Infield passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="45961b3c10fe38e8bdc7b6a52f83abd5a8896dd1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2116.58,-1118.95C2168.04,-1080.96 2245.58,-1029.06 2321,-999 2361.57,-982.83 2407.34,-971.18 2450.06,-962.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2450.82,-966.26 2459.99,-960.95 2449.51,-959.38 2450.82,-966.26"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Guillotine passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b005fdaa002b8f52350e95e56a2474fa71b071f6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.2,-1208.81C2247.85,-1221.65 2269.38,-1238.34 2285,-1260 2353.13,-1354.5 2244,-1695.58 2321,-1783 2346.45,-1811.9 2382.14,-1828.49 2419.62,-1837.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2419.18,-1841.04 2429.7,-1839.81 2420.71,-1834.21 2419.18,-1841.04"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="ce96d7f23d91250787935e64e821ff1ea5fe14e0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.04,-1207.5C2248.03,-1220.51 2269.71,-1237.59 2285,-1260 2351.82,-1357.95 2279.57,-3282.9 2321,-3394 2364.91,-3511.73 2468.89,-3617.46 2537.83,-3678.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2535.81,-3681.05 2545.64,-3684.99 2540.41,-3675.78 2535.81,-3681.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cdd8d95c5408a6d51155d7141ff7f6c1b55bd653" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.02,-1207.87C2247.92,-1220.83 2269.59,-1237.8 2285,-1260 2353.79,-1359.09 2242.9,-2253.08 2321,-2345 2353.46,-2383.21 2403.81,-2400.1 2453.09,-2406.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2452.92,-2410 2463.26,-2407.68 2453.72,-2403.05 2452.92,-2410"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="aa8fbdc7897fcfac22ecf32c76380b4325889b5b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.23,-1208.08C2248.03,-1221.01 2269.61,-1237.92 2285,-1260 2346.8,-1348.66 2251,-2149.66 2321,-2232 2355.38,-2272.45 2409.76,-2289.18 2461.71,-2294.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2461.42,-2298.39 2471.71,-2295.87 2462.1,-2291.42 2461.42,-2298.39"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Positioning"
                }}><GroupWrapper id="26d39c2706f7dff1eab4875355a404b12dd1f07a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M552.58,-1214.22C588.45,-1217.17 628.38,-1220.1 665,-1222 709.95,-1224.33 2252.17,-1229.2 2285,-1260 2351.87,-1322.73 2259.76,-1602.77 2321,-1671 2360.76,-1715.31 2424.61,-1730.54 2481.61,-1734.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.62,-1737.66 2491.79,-1734.68 2481.99,-1730.66 2481.62,-1737.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Teammate Awareness",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Jammicus’s awareness + teamplay tutorial.",
                        url: "https://www.youtube.com/watch?v=zvQFR_3s-0k"
                    }],

                    title: "Teammate Awareness",
                    description: "Being  able to watch and react to a teammate/s location on the field.",
                    rank: "",
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
                        d="M1074,-1213C1074,-1213 677,-1213 677,-1213 671,-1213 665,-1207 665,-1201 665,-1201 665,-1131 665,-1131 665,-1125 671,-1119 677,-1119 677,-1119 1074,-1119 1074,-1119 1080,-1119 1086,-1125 1086,-1131 1086,-1131 1086,-1201 1086,-1201 1086,-1207 1080,-1213 1074,-1213"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-1177.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Teammate Awareness"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-1137.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Teammate Awareness",
                    tailId: "Positioning"
                }}><GroupWrapper id="a9a17bcbe95848ce2fbe64466fe7579b0df9f2dd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M552.64,-1194.21C584.05,-1191.46 619.35,-1188.37 654.76,-1185.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="655.09,-1188.75 664.75,-1184.39 654.48,-1181.77 655.09,-1188.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rotation",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "SunlessKhan’s tutorial video.",
                        url: "https://www.youtube.com/watch?v=THcMLWOEc_o&vl=en"
                    }, {
                        text: "Graph by u/lmfao__schwarz.",
                        url: "https://www.reddit.com/r/RocketLeague/comments/5stuiu/an_infographic_of_more_correct_positioning_and/"
                    }, {
                        text: "Allstar IV’s 3 v 3 rotation tutorial.",
                        url: "https://www.youtube.com/watch?v=YQvlIwJZePE"
                    }, {
                        text: "Allstar IV’s 2 v 2 rotation tutorial.",
                        url: "https://www.youtube.com/watch?v=vHiTUOKDqfE"
                    }, {
                        text: "Dignitas’s 1v1 guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12629/becoming-the-best-solo-duel-a-high-level-1v1-guide"
                    }],

                    title: "Rotation",
                    description: "Rotation is the art of combining Positioning and Teammate Awareness which allows for faster game speed, teamwork, and passing plays.",
                    rank: "",
                    upstreamSkills: ["Positioning", "Teammate Awareness"],
                    downstreamSkills: ["Game Awareness", "Self Boost Management"]
                }}><GroupWrapper id="96df7e6ae52ce92ca621526e553a7673744a55f2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-951C1546.5,-951 1365.5,-951 1365.5,-951 1359.5,-951 1353.5,-945 1353.5,-939 1353.5,-939 1353.5,-869 1353.5,-869 1353.5,-863 1359.5,-857 1365.5,-857 1365.5,-857 1546.5,-857 1546.5,-857 1552.5,-857 1558.5,-863 1558.5,-869 1558.5,-869 1558.5,-939 1558.5,-939 1558.5,-945 1552.5,-951 1546.5,-951"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-915.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rotation"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-875.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Positioning"
                }}><GroupWrapper id="a427c282c94acc51433e7494a2c9cbe0a942c74c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M548.25,-1156.93C585.02,-1141.35 626.57,-1124.34 665,-1110 865.28,-1035.25 914.45,-1011.2 1122,-960 1194.8,-942.04 1277.98,-928.05 1343,-918.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1343.88,-921.95 1353.27,-917.05 1342.88,-915.02 1343.88,-921.95"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Team pinch",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="ba3e3f3aec20599a233ce03099dfe7218b1137d6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M985.55,-1118.9C1027.58,-1102.17 1076.43,-1084.42 1122,-1072 1189.38,-1053.63 1266.16,-1040.23 1329,-1031.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1329.55,-1034.61 1338.96,-1029.73 1328.57,-1027.68 1329.55,-1034.61"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="6fa49c5829505d35fa1ab40353a79027f811101a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1086.04,-1182.39C1098.2,-1183.02 1110.26,-1183.57 1122,-1184 1418.69,-1194.86 1493.28,-1194.08 1790,-1184 1817.98,-1183.05 1847.6,-1181.53 1876.49,-1179.78"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1876.92,-1183.26 1886.68,-1179.14 1876.48,-1176.27 1876.92,-1183.26"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="e28ebf8d1f01dc0e418be90fdb1bf793bea2d8fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953.03,-1118.75C994.98,-1090.73 1046.36,-1052.78 1086,-1012 1105.59,-991.84 1098.27,-975.07 1122,-960 1187.54,-918.36 1274.4,-904.82 1342.98,-901.45"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1343.55,-904.93 1353.39,-901.01 1343.25,-897.93 1343.55,-904.93"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hoops - Friendship / fusion Kickoff",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="ea4238ca45b3842e8fbae81d40e6b537dc4c4aae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M883.2,-1213.15C917.81,-1455.51 1076.44,-2551.92 1122,-2608 1150.65,-2643.26 1190.11,-2669.07 1231.86,-2687.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1230.52,-2691.18 1241.08,-2691.99 1233.33,-2684.77 1230.52,-2691.18"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Rotation"
                }}><GroupWrapper id="2179051b6b220f67738b5881612b5c4bd33724ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.68,-908.13C1626.61,-913.96 1716.61,-927.74 1790,-960 1872.36,-996.2 1951.69,-1063.78 2001.62,-1111.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1999.45,-1114.43 2009.07,-1118.87 2004.32,-1109.4 1999.45,-1114.43"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Self Boost Management",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Self Boost Management",
                    description: "Keeping track of how much boost the player has while picking up small pennies (smaller boost pads in the field.)",
                    rank: "",
                    upstreamSkills: ["Rotation"],
                    downstreamSkills: []
                }}><GroupWrapper id="e6eb7a78d9abbbc4245ab4f3ab258b6f827e13ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2273,-951C2273,-951 1838,-951 1838,-951 1832,-951 1826,-945 1826,-939 1826,-939 1826,-869 1826,-869 1826,-863 1832,-857 1838,-857 1838,-857 2273,-857 2273,-857 2279,-857 2285,-863 2285,-869 2285,-869 2285,-939 2285,-939 2285,-945 2279,-951 2273,-951"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-915.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Self Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-875.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Self Boost Management",
                    tailId: "Rotation"
                }}><GroupWrapper id="73746e89f85b52d1f9d9a4f84871bea6859d5c75" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-904C1629.26,-904 1726.29,-904 1815.81,-904"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1815.85,-907.5 1825.85,-904 1815.85,-900.5 1815.85,-907.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Speed",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "FLuuMP’s game speed tutorial.",
                        url: "https://www.youtube.com/watch?v=wCuL8ILJye0"
                    }, {
                        text: "Amustycow’s game speed tutorial.",
                        url: "https://www.youtube.com/watch?v=IUvJvlv9r4o"
                    }],

                    title: "Game Speed",
                    description: "The general speed that each player is constantly going.",
                    rank: "",
                    upstreamSkills: [],
                    downstreamSkills: ["Game Awareness"]
                }}><GroupWrapper id="c47f3d4df7d8556cd1bf2b526a12ce140a896a94" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1570.5,-1175C1570.5,-1175 1341.5,-1175 1341.5,-1175 1335.5,-1175 1329.5,-1169 1329.5,-1163 1329.5,-1163 1329.5,-1093 1329.5,-1093 1329.5,-1087 1335.5,-1081 1341.5,-1081 1341.5,-1081 1570.5,-1081 1570.5,-1081 1576.5,-1081 1582.5,-1087 1582.5,-1093 1582.5,-1093 1582.5,-1163 1582.5,-1163 1582.5,-1169 1576.5,-1175 1570.5,-1175"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1139.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Game Speed"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1099.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Game Speed"
                }}><GroupWrapper id="630e285f11754702182280c9673f6d7525052569" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1582.62,-1135.99C1667.91,-1141.41 1781.94,-1148.67 1876.55,-1154.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1876.61,-1158.19 1886.81,-1155.34 1877.05,-1151.21 1876.61,-1158.19"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Prediction"
                }}><GroupWrapper id="2fbce5d5cb08c9e3b5b28c5b2e122d00c7b59e01" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1484.62,-1660.95C1539.27,-1571.49 1669.55,-1375.52 1826,-1260 1848.46,-1243.42 1874.26,-1229.19 1900.26,-1217.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1901.79,-1220.35 1909.46,-1213.05 1898.91,-1213.97 1901.79,-1220.35"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Pre-Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Pre-Jumping",
                    description: "Jumping in expectation of an opponents shot, clear, or save.",
                    rank: "",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Dunking"]
                }}><GroupWrapper id="31b1c68d0c763bd78d74aa80fa015f89ca816635" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2168.5,-1363C2168.5,-1363 1942.5,-1363 1942.5,-1363 1936.5,-1363 1930.5,-1357 1930.5,-1351 1930.5,-1351 1930.5,-1281 1930.5,-1281 1930.5,-1275 1936.5,-1269 1942.5,-1269 1942.5,-1269 2168.5,-1269 2168.5,-1269 2174.5,-1269 2180.5,-1275 2180.5,-1281 2180.5,-1281 2180.5,-1351 2180.5,-1351 2180.5,-1357 2174.5,-1363 2168.5,-1363"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1327.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Pre-Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1287.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Pre-Jumping",
                    tailId: "Prediction"
                }}><GroupWrapper id="d4e13a0daae87bc7082db04fd54cc27db9a4a959" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1495.01,-1660.7C1556.58,-1587.36 1685.49,-1446.85 1826,-1372 1854.99,-1356.55 1888.32,-1345.29 1920.4,-1337.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1921.44,-1340.44 1930.31,-1334.65 1919.77,-1333.65 1921.44,-1340.44"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cutting",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Cutting",
                    description: "When an opponent is dribbling (keeping the ball close to oneself), the player comes at an angle to the dribble and forces it out of the opponent's possession.",
                    rank: "",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="750fe6eb4a39e4f1fd5ae30f1e7e0384a489c056" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-1475C2146,-1475 1965,-1475 1965,-1475 1959,-1475 1953,-1469 1953,-1463 1953,-1463 1953,-1393 1953,-1393 1953,-1387 1959,-1381 1965,-1381 1965,-1381 2146,-1381 2146,-1381 2152,-1381 2158,-1387 2158,-1393 2158,-1393 2158,-1463 2158,-1463 2158,-1469 2152,-1475 2146,-1475"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1439.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Cutting"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1399.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cutting",
                    tailId: "Prediction"
                }}><GroupWrapper id="7a0bd30db6e0621af48c9cc65ab6295c941fb508" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1520.75,-1660.93C1591.86,-1610.48 1711.94,-1531.28 1826,-1484 1862.89,-1468.71 1904.92,-1456.93 1942.8,-1448.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1943.86,-1451.56 1952.85,-1445.95 1942.32,-1444.73 1943.86,-1451.56"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Faking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Faking",
                    description: "Being able to predict a opponent's movements and stop yours in reaction to that prediction.",
                    rank: "",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="cb7144819d80f8b5b3a7e0d5f75f4e1a9642b668" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-1699C2146,-1699 1965,-1699 1965,-1699 1959,-1699 1953,-1693 1953,-1687 1953,-1687 1953,-1617 1953,-1617 1953,-1611 1959,-1605 1965,-1605 1965,-1605 2146,-1605 2146,-1605 2152,-1605 2158,-1611 2158,-1617 2158,-1617 2158,-1687 2158,-1687 2158,-1693 2152,-1699 2146,-1699"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1663.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Faking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1623.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Faking",
                    tailId: "Prediction"
                }}><GroupWrapper id="9cb42e435c1a2484a1d90b27ada123b31d29ed07" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.08,-1698.25C1667.75,-1688.25 1833.07,-1672.75 1942.53,-1662.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.98,-1665.97 1952.61,-1661.55 1942.33,-1659 1942.98,-1665.97"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="69add1126959a35c36aa060f4a758a5e3ff23617" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-1587C2146,-1587 1965,-1587 1965,-1587 1959,-1587 1953,-1581 1953,-1575 1953,-1575 1953,-1505 1953,-1505 1953,-1499 1959,-1493 1965,-1493 1965,-1493 2146,-1493 2146,-1493 2152,-1493 2158,-1499 2158,-1505 2158,-1505 2158,-1575 2158,-1575 2158,-1581 2152,-1587 2146,-1587"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1551.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Softblock"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1511.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Softblock",
                    tailId: "Prediction"
                }}><GroupWrapper id="6653f1c7ab683566a092a4bb4dd44dbc5b5e38d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.14,-1674.74C1634.81,-1651.61 1736.09,-1620.64 1826,-1596 1863.97,-1585.59 1905.74,-1575.08 1943.06,-1566.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1944.06,-1569.39 1952.96,-1563.63 1942.42,-1562.58 1944.06,-1569.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Catching",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Catching",
                    description: "Stopping and slowing the ball with a dribble when it hits the ground after being in the air.",
                    rank: "",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Wall catch"]
                }}><GroupWrapper id="2b9bcf7bbecd708379dfee8a9b9b2044a98476b3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-1811C2146,-1811 1965,-1811 1965,-1811 1959,-1811 1953,-1805 1953,-1799 1953,-1799 1953,-1729 1953,-1729 1953,-1723 1959,-1717 1965,-1717 1965,-1717 2146,-1717 2146,-1717 2152,-1717 2158,-1723 2158,-1729 2158,-1729 2158,-1799 2158,-1799 2158,-1805 2152,-1811 2146,-1811"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1775.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Catching"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1735.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Catching",
                    tailId: "Prediction"
                }}><GroupWrapper id="02d351bfa707895de9cc91d3f16b92318244efa6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.08,-1717.75C1667.75,-1727.75 1833.07,-1743.25 1942.53,-1753.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.33,-1757 1952.61,-1754.45 1942.98,-1750.03 1942.33,-1757"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Prediction"
                }}><GroupWrapper id="9edddb9f9f4947781b86746b9f875bc69a1e8cbc" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1505.03,-1755.06C1576.43,-1827.43 1710.65,-1973.14 1790,-2120 1814.85,-2166 1799.58,-2186.88 1826,-2232 1869.71,-2306.64 1939.51,-2377.4 1990.48,-2423.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1988.4,-2426.54 1998.18,-2430.64 1993.09,-2421.34 1988.4,-2426.54"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce dribbling",
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

                    title: "Bounce dribbling",
                    description: "Popping (Hitting the ball in a way where it allows the player to hit it again)  the ball multiple times in a row.",
                    rank: "",
                    upstreamSkills: ["Prediction", "Push dribbling"],
                    downstreamSkills: ["Bounce to air dribble", "Tornado Flick / Spin", "Breezi Flick"]
                }}><GroupWrapper id="cb5f223c0110f96fa41789e4d7d0a30e93b35cd5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2764,-3161C2764,-3161 2446,-3161 2446,-3161 2440,-3161 2434,-3155 2434,-3149 2434,-3149 2434,-3079 2434,-3079 2434,-3073 2440,-3067 2446,-3067 2446,-3067 2764,-3067 2764,-3067 2770,-3067 2776,-3073 2776,-3079 2776,-3079 2776,-3149 2776,-3149 2776,-3155 2770,-3161 2764,-3161"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3125.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3085.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce dribbling",
                    tailId: "Prediction"
                }}><GroupWrapper id="18ffd6d5c0815ba52b742a26c23bb8e84655a92f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.39,-1743.67C1634.74,-1767.75 1735.54,-1798.88 1826,-1820 1926.68,-1843.51 2215.64,-1819.33 2285,-1896 2326.9,-1942.32 2306.43,-2396.26 2321,-2457 2377.14,-2691.05 2510.47,-2947.26 2571.94,-3057.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2569.03,-3059.9 2576.95,-3066.93 2575.14,-3056.49 2569.03,-3059.9"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Prediction"
                }}><GroupWrapper id="6bc6bf6f6cd4304d059809f4565e825bab3d5f13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1485.44,-1755.27C1540.06,-1841.79 1668.32,-2025.4 1826,-2120 1857.45,-2138.87 1894.96,-2151.39 1930.4,-2159.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1929.81,-2163.15 1940.34,-2161.93 1931.35,-2156.32 1929.81,-2163.15"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Dunking",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Dunking",
                    description: "Jumping before an opponent's pop (Hitting the ball in a way where it allows the player to hit it again) to get the ball over their head and in the players possession.",
                    rank: "",
                    upstreamSkills: ["Pre-Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1ce809bfee8fa8ad999a8fad944514ab2a193edd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-1998C2695.5,-1998 2514.5,-1998 2514.5,-1998 2508.5,-1998 2502.5,-1992 2502.5,-1986 2502.5,-1986 2502.5,-1916 2502.5,-1916 2502.5,-1910 2508.5,-1904 2514.5,-1904 2514.5,-1904 2695.5,-1904 2695.5,-1904 2701.5,-1904 2707.5,-1910 2707.5,-1916 2707.5,-1916 2707.5,-1986 2707.5,-1986 2707.5,-1992 2701.5,-1998 2695.5,-1998"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1962.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Dunking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1922.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Dunking",
                    tailId: "Pre-Jumping"
                }}><GroupWrapper id="624eb4431d3a01fbcda01962bb9606910f24d20b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2180.73,-1318.67C2219.7,-1325.99 2259.23,-1341.37 2285,-1372 2360.01,-1461.13 2244,-1807.58 2321,-1895 2362.85,-1942.52 2432.4,-1956.76 2492.07,-1959"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.23,-1962.51 2502.32,-1959.28 2492.42,-1955.51 2492.23,-1962.51"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Goalie Demos",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,

                    notes: [{
                        text: "Rocket Sledge’s Goalie Demos tutorial.",
                        url: "https://www.youtube.com/watch?v=qQGh0bvug7o"
                    }, {
                        text: "Ytzi13 Air roll usage comment",
                        url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                    }],

                    title: "Goalie Demos",
                    description: "Demoing (demolishing and / or bumping)  a goalie while the opponent is in a defencive position.",
                    rank: "",
                    upstreamSkills: ["Basic Demos"],
                    downstreamSkills: []
                }}><GroupWrapper id="4a28cafe911bf4ae8e044789441ae3d4cd2c6576" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2180.5,-2637C2180.5,-2637 1930.5,-2637 1930.5,-2637 1924.5,-2637 1918.5,-2631 1918.5,-2625 1918.5,-2625 1918.5,-2555 1918.5,-2555 1918.5,-2549 1924.5,-2543 1930.5,-2543 1930.5,-2543 2180.5,-2543 2180.5,-2543 2186.5,-2543 2192.5,-2549 2192.5,-2555 2192.5,-2555 2192.5,-2625 2192.5,-2625 2192.5,-2631 2186.5,-2637 2180.5,-2637"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2601.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Goalie Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2561.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Goalie Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="02e51b4e5b1f27760f2c22fdbe3eba01bfd80e33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.46,-2952.96C1651.12,-2919.36 1737.55,-2867.24 1790,-2795 1830.03,-2739.87 1777.91,-2694.25 1826,-2646 1848.25,-2623.68 1877.84,-2609.73 1908.32,-2601.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1909.46,-2604.45 1918.25,-2598.52 1907.68,-2597.68 1909.46,-2604.45"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Amustycow’s air demo tutorial.",
                        url: "https://www.youtube.com/watch?v=XIG84V6ERCA"
                    }],

                    title: "Air Demos",
                    description: "Demo’s (demolishing and / or bumping) an opponent during their aerial or in the air.",
                    rank: "",
                    upstreamSkills: ["Basic Demos", "Basic aerials"],
                    downstreamSkills: ["Air Dribble to Demo"]
                }}><GroupWrapper id="bad725340e6b5269093a4ee7bb2589b16cb4b07c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2150,-3085C2150,-3085 1961,-3085 1961,-3085 1955,-3085 1949,-3079 1949,-3073 1949,-3073 1949,-3003 1949,-3003 1949,-2997 1955,-2991 1961,-2991 1961,-2991 2150,-2991 2150,-2991 2156,-2991 2162,-2997 2162,-3003 2162,-3003 2162,-3073 2162,-3073 2162,-3079 2156,-3085 2150,-3085"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3049.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3009.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="fe6b2b43b66db6b558febc32a7bfbac1bfff3165" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1584.81,-3008.13C1689.82,-3014.81 1837.28,-3024.19 1938.83,-3030.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1938.61,-3034.14 1948.81,-3031.28 1939.06,-3027.15 1938.61,-3034.14"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Dribble to Demo",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Amustycow’s air demo tutorial.",
                        url: "https://www.youtube.com/watch?v=XIG84V6ERCA"
                    }],

                    title: "Air Dribble to Demo",
                    description: "Usually a one verses one move, after an air dribble, the player goes towards the opponent to demolish or bump.",
                    rank: "",
                    upstreamSkills: ["Air Demos", "Air dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="cc0f8509ac5d9e08c6be164a987b56555f0b2005" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3325.5,-3896C3325.5,-3896 2954.5,-3896 2954.5,-3896 2948.5,-3896 2942.5,-3890 2942.5,-3884 2942.5,-3884 2942.5,-3814 2942.5,-3814 2942.5,-3808 2948.5,-3802 2954.5,-3802 2954.5,-3802 3325.5,-3802 3325.5,-3802 3331.5,-3802 3337.5,-3808 3337.5,-3814 3337.5,-3814 3337.5,-3884 3337.5,-3884 3337.5,-3890 3331.5,-3896 3325.5,-3896"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3860.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Dribble To Demo"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3820.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble to Demo",
                    tailId: "Air Demos"
                }}><GroupWrapper id="c4e39ecafc958bef406000ddc9296e8f93d2a1c0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2162.09,-3038.56C2206.29,-3044.49 2254.4,-3059.45 2285,-3094 2374.05,-3194.52 2243.55,-3284.29 2321,-3394 2483.54,-3624.25 2646.26,-3532.77 2889,-3676 2951.52,-3712.89 3019.03,-3760.08 3068.11,-3795.85"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3066.31,-3798.87 3076.44,-3801.94 3070.44,-3793.22 3066.31,-3798.87"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall catch",
                    tailId: "Catching"
                }}><GroupWrapper id="04255f1ce01cff07d202d051c087cf16444e85ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.14,-1767.67C2202.91,-1774.59 2252.58,-1790.38 2285,-1825 2341.36,-1885.19 2262.7,-1948.69 2321,-2007 2363.51,-2049.51 2428.38,-2064.47 2485.29,-2068.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2485.27,-2071.87 2495.45,-2068.95 2485.67,-2064.88 2485.27,-2071.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Forward half flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Forward half flipping",
                    description: "A back flip that is canceled when parallel with the ground. Then air roll to have the wheels hit the ground.",
                    rank: "",
                    upstreamSkills: ["Half flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="d4e2f4dd965ce87f034484e11bc002c0f51b4cad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3343,-5854C3343,-5854 2937,-5854 2937,-5854 2931,-5854 2925,-5848 2925,-5842 2925,-5842 2925,-5772 2925,-5772 2925,-5766 2931,-5760 2937,-5760 2937,-5760 3343,-5760 3343,-5760 3349,-5760 3355,-5766 3355,-5772 3355,-5772 3355,-5842 3355,-5842 3355,-5848 3349,-5854 3343,-5854"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5818.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Forward Half Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5778.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Forward half flipping",
                    tailId: "Half flipping"
                }}><GroupWrapper id="3c4a0763becb7b270f1521194a57cb81990b7454" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2736.73,-5821.34C2790.38,-5819.43 2854.04,-5817.16 2914.71,-5815"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2914.94,-5818.49 2924.81,-5814.64 2914.69,-5811.49 2914.94,-5818.49"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="78bdf96a28ae2d5fa30ddb36fa10c0123ef2e9d0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.4,-3376.34C1656.16,-3369.97 1738.29,-3349.83 1790,-3295 1852.27,-3228.98 1763.88,-3160.17 1826,-3094 1854.99,-3063.12 1897.99,-3048.07 1938.89,-3041.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1939.61,-3044.52 1948.95,-3039.52 1938.53,-3037.6 1939.61,-3044.52"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="3800ea18673cc16cddd3c4d4de11234809ab25f8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.07,-3377.7C1656.62,-3371.9 1739.64,-3351.87 1790,-3295 1882.83,-3190.17 1733.41,-3087.04 1826,-2982 1840.46,-2965.59 1858.87,-2953.6 1878.95,-2944.89"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1880.32,-2948.11 1888.28,-2941.12 1877.69,-2941.62 1880.32,-2948.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Double jump aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="d64a14ba6ae8d0a80c29e380c9eb93b01b9c3493" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1547.14,-3422.12C1620.66,-3459.11 1728.01,-3509.9 1826,-3544 1832.9,-3546.4 1839.94,-3548.74 1847.08,-3551.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1846.29,-3554.43 1856.88,-3554.07 1848.38,-3547.75 1846.29,-3554.43"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Fast aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="1d02213e3107a4ebb7aa91ceae7b22268523e48d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.28,-3399.45C1686.82,-3418.46 1825.62,-3444.71 1925.97,-3463.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1925.39,-3467.14 1935.86,-3465.56 1926.69,-3460.27 1925.39,-3467.14"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backwards aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="3f235ad3a8524a6801f94ccb9b6dfc7ff26adcb7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1509.51,-3422.09C1578.39,-3482.14 1704.8,-3586.51 1826,-3656 1853.45,-3671.74 1884.06,-3686.21 1913.72,-3698.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1912.73,-3702.22 1923.31,-3702.88 1915.45,-3695.77 1912.73,-3702.22"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Sideways aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Sideways aerials",
                    description: "Hitting the ball in an aerial but, having either side of the car towards the floor.",
                    rank: "",
                    upstreamSkills: ["Basic aerials", "Air roll shots"],
                    downstreamSkills: ["Tornado spin"]
                }}><GroupWrapper id="bcfeb56f9d582050fe5b94a3c8328133136aba87" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3294.5,-3423C3294.5,-3423 2985.5,-3423 2985.5,-3423 2979.5,-3423 2973.5,-3417 2973.5,-3411 2973.5,-3411 2973.5,-3341 2973.5,-3341 2973.5,-3335 2979.5,-3329 2985.5,-3329 2985.5,-3329 3294.5,-3329 3294.5,-3329 3300.5,-3329 3306.5,-3335 3306.5,-3341 3306.5,-3341 3306.5,-3411 3306.5,-3411 3306.5,-3417 3300.5,-3423 3294.5,-3423"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3387.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Sideways Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3347.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Sideways aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="8130ae266add859e91df1269174e8fe3d4b4c4d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.39,-3380.98C1837.58,-3391.64 2408.83,-3411.26 2889,-3394 2912.98,-3393.14 2938.24,-3391.81 2963.1,-3390.26"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2963.59,-3393.74 2973.35,-3389.61 2963.15,-3386.75 2963.59,-3393.74"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="fadc556dadbe15d619d890597983a84f224b8ef4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.2,-3351.09C1658.65,-3330.51 1743.56,-3292.91 1790,-3225 1876.8,-3098.08 1727.97,-2652.47 1826,-2534 1844.11,-2512.11 1869.24,-2497.99 1896.25,-2489.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1897.35,-2492.34 1905.87,-2486.06 1895.29,-2485.65 1897.35,-2492.34"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="47c1377f4d0f354dfba0026f47c5378ce578cd6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.26,-3380.3C1806.26,-3388.01 2234.7,-3396.82 2285,-3351 2333.5,-3306.83 2303.85,-3121.32 2321,-3058 2383.92,-2825.68 2513.76,-2568.58 2573.14,-2457.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2576.34,-2458.8 2577.98,-2448.33 2570.17,-2455.49 2576.34,-2458.8"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="b75a8be85276490a8b8bcd8b6b43bf46d55153a4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.26,-3366.65C1818.35,-3351.58 2281.99,-3321.1 2285,-3318 2360.27,-3240.3 2250.79,-2427.31 2321,-2345 2355.43,-2304.64 2409.82,-2288.09 2461.75,-2282.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2462.13,-2286.04 2471.76,-2281.62 2461.47,-2279.07 2462.13,-2286.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air dribbling",
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

                    title: "Air dribbling",
                    description: "Keeping the ball close to the car in the air while pushing it towards a push or goal.",
                    rank: "",
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
                        d="M2723.5,-4227C2723.5,-4227 2486.5,-4227 2486.5,-4227 2480.5,-4227 2474.5,-4221 2474.5,-4215 2474.5,-4215 2474.5,-4145 2474.5,-4145 2474.5,-4139 2480.5,-4133 2486.5,-4133 2486.5,-4133 2723.5,-4133 2723.5,-4133 2729.5,-4133 2735.5,-4139 2735.5,-4145 2735.5,-4145 2735.5,-4215 2735.5,-4215 2735.5,-4221 2729.5,-4227 2723.5,-4227"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4191.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4151.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble to Demo",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="d8c849e07c4e21b64676bde51be8b8feb662d45c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2735.65,-4171.8C2786.04,-4164.27 2842.67,-4150.17 2889,-4124 2983.57,-4070.58 3061.86,-3968.51 3104.4,-3904.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3107.56,-3906.42 3110.16,-3896.15 3101.72,-3902.56 3107.56,-3906.42"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "hood to air dribble",
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

                    title: "hood to air dribble",
                    description: "Popping (Hitting the ball in a way where it allows the player to hit it again) the ball while hood dribbling then air dribbling it with the purpose of a goal.",
                    rank: "",
                    upstreamSkills: ["Air dribbling", "Hood dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="ba2dc3a69ab1146a34f6909c21e4ef807b14ad37" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3322,-4919C3322,-4919 2958,-4919 2958,-4919 2952,-4919 2946,-4913 2946,-4907 2946,-4907 2946,-4837 2946,-4837 2946,-4831 2952,-4825 2958,-4825 2958,-4825 3322,-4825 3322,-4825 3328,-4825 3334,-4831 3334,-4837 3334,-4837 3334,-4907 3334,-4907 3334,-4913 3328,-4919 3322,-4919"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4883.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hood To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4843.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "hood to air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="5f703ff28fee8e5da5396bf9a480519af4baa336" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2735.56,-4172.88C2790.91,-4177.15 2851.32,-4192.93 2889,-4236 2974.03,-4333.2 2842.96,-4716.27 2925,-4816 2928.91,-4820.75 2933.16,-4825.12 2937.71,-4829.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2935.66,-4832 2945.62,-4835.61 2940.09,-4826.58 2935.66,-4832"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce to air dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }],

                    title: "Bounce to air dribble",
                    description: "Starting an air dribble after popping the ball up in a bounce dribble.",
                    rank: "",
                    upstreamSkills: ["Air dribbling", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="9354bfe67d752a0f523ec603919747179ff365a8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3340.5,-3293C3340.5,-3293 2939.5,-3293 2939.5,-3293 2933.5,-3293 2927.5,-3287 2927.5,-3281 2927.5,-3281 2927.5,-3211 2927.5,-3211 2927.5,-3205 2933.5,-3199 2939.5,-3199 2939.5,-3199 3340.5,-3199 3340.5,-3199 3346.5,-3199 3352.5,-3205 3352.5,-3211 3352.5,-3211 3352.5,-3281 3352.5,-3281 3352.5,-3287 3346.5,-3293 3340.5,-3293"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3257.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3217.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce to air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="f7894eef5cb5acdf00b84d9ae060eea6ede5864a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2735.54,-4187.44C2791.06,-4183.28 2851.62,-4167.49 2889,-4124 2947.3,-4056.19 2871.5,-3391.66 2925,-3320 2930.61,-3312.48 2937.04,-3305.72 2944.08,-3299.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2946.35,-3302.31 2951.95,-3293.31 2941.96,-3296.86 2946.35,-3302.31"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Air dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers AirDribble Tutorial.",
                        url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                    }],

                    title: "Wall Air dribble",
                    description: "Rolling the ball up the wall then popping it then jumping from the wall to push it mid-air into goal or onto the backboard to set up a backboard pass.",
                    rank: "",
                    upstreamSkills: ["Air dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="c2a8946dd0dab510c518dda78067266ecd466515" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3285,-4227C3285,-4227 2995,-4227 2995,-4227 2989,-4227 2983,-4221 2983,-4215 2983,-4215 2983,-4145 2983,-4145 2983,-4139 2989,-4133 2995,-4133 2995,-4133 3285,-4133 3285,-4133 3291,-4133 3297,-4139 3297,-4145 3297,-4145 3297,-4215 3297,-4215 3297,-4221 3291,-4227 3285,-4227"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4191.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4151.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="a17f4812c0305752a343e9c54e2f545defb256e8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2735.7,-4180C2806.92,-4180 2896.03,-4180 2972.35,-4180"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2972.55,-4183.5 2982.55,-4180 2972.55,-4176.5 2972.55,-4183.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Sideways aerials",
                    tailId: "Air roll shots"
                }}><GroupWrapper id="cb221c554e41d3109ed5343d97cec2c4a70220c6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2742.22,-3347.71C2809.39,-3352.5 2891.19,-3358.33 2963.03,-3363.45"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2962.88,-3366.95 2973.1,-3364.17 2963.38,-3359.97 2962.88,-3366.95"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Backwards aerials"
                }}><GroupWrapper id="b946e51387a79af9781dccec86a3a3f0a40dac57" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2237.15,-3703.32C2253.38,-3698.66 2269.52,-3693.85 2285,-3689 2301.23,-3683.91 2304.69,-3680.85 2321,-3676 2773.58,-3541.37 2898.46,-3552.53 3355,-3432 3371.1,-3427.75 3387.9,-3423.12 3404.58,-3418.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3405.72,-3421.72 3414.38,-3415.62 3403.8,-3414.99 3405.72,-3421.72"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Sideways aerials"
                }}><GroupWrapper id="b152fdb4137fa7058fa0ee1360879b1ffe8fd749" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3306.52,-3376C3338.92,-3376 3372.65,-3376 3404.22,-3376"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3404.39,-3379.5 3414.39,-3376 3404.39,-3372.5 3404.39,-3379.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Tornado spin", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="58c831a400d054a656225db6965364b2dbd9ba76" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4243,-3203C4243,-3203 3877,-3203 3877,-3203 3871,-3203 3865,-3197 3865,-3191 3865,-3191 3865,-3121 3865,-3121 3865,-3115 3871,-3109 3877,-3109 3877,-3109 4243,-3109 4243,-3109 4249,-3109 4255,-3115 4255,-3121 4255,-3121 4255,-3191 4255,-3191 4255,-3197 4249,-3203 4243,-3203"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3167.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tornado Flick / Spin"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3127.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Tornado spin"
                }}><GroupWrapper id="730633388a8ffa5dbcb6e4b8a8c1d335830d5742" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3608.59,-3328.8C3644.96,-3302.07 3693.22,-3269.74 3740,-3248 3776.14,-3231.21 3816.03,-3216.77 3855,-3204.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3856.36,-3207.9 3864.89,-3201.62 3854.3,-3201.2 3856.36,-3207.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Tornado spin", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="78c633192e33640847f65ab13614156fc4721a49" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4167.5,-3351C4167.5,-3351 3952.5,-3351 3952.5,-3351 3946.5,-3351 3940.5,-3345 3940.5,-3339 3940.5,-3339 3940.5,-3269 3940.5,-3269 3940.5,-3263 3946.5,-3257 3952.5,-3257 3952.5,-3257 4167.5,-3257 4167.5,-3257 4173.5,-3257 4179.5,-3263 4179.5,-3269 4179.5,-3269 4179.5,-3339 4179.5,-3339 4179.5,-3345 4173.5,-3351 4167.5,-3351"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3315.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Breezi Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3275.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Tornado spin"
                }}><GroupWrapper id="ded1f8273b2b83fa63d22a2814ea4316f9d7ae35" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3680.63,-3357.36C3757.53,-3346.52 3854.04,-3332.91 3930.35,-3322.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3931.08,-3325.58 3940.5,-3320.71 3930.11,-3318.64 3931.08,-3325.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hood dribble",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Sir Timbers Dribbling Tutorial.",
                        url: "https://www.youtube.com/watch?v=eBmgRPOmh98"
                    }],

                    title: "Hood dribble",
                    description: "Being able to keep the ball on the top of the players car. Normally just called dribbling.",
                    rank: "P",
                    upstreamSkills: ["Push dribbling"],
                    downstreamSkills: ["hood to air dribble", "Power Slide Dribble", "Directional Flick"]
                }}><GroupWrapper id="4c61f86edb9a6722edee939ef919a0f3f51681a3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2727,-4919C2727,-4919 2483,-4919 2483,-4919 2477,-4919 2471,-4913 2471,-4907 2471,-4907 2471,-4837 2471,-4837 2471,-4831 2477,-4825 2483,-4825 2483,-4825 2727,-4825 2727,-4825 2733,-4825 2739,-4831 2739,-4837 2739,-4837 2739,-4907 2739,-4907 2739,-4913 2733,-4919 2727,-4919"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4883.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hood Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4843.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hood dribble",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="171d3393df4e87a5d37dd9ade1883b19d3b3fb41" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.56,-4282.05C2234.61,-4290.7 2264.22,-4305.44 2285,-4330 2354.95,-4412.68 2249.21,-4734.92 2321,-4816 2355.71,-4855.2 2409.25,-4871.72 2460.47,-4877.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2460.37,-4881.06 2470.68,-4878.58 2461.08,-4874.1 2460.37,-4881.06"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce dribbling",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="ea33b285cc29ef5dd53146a0ce166e8907d90c3b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.67,-4266.7C2234.91,-4258.05 2264.59,-4243.12 2285,-4218 2358.48,-4127.58 2245.51,-3258.75 2321,-3170 2347.03,-3139.4 2384.52,-3122.48 2423.75,-3113.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2424.67,-3117.05 2433.75,-3111.6 2423.25,-3110.2 2424.67,-3117.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="bc8ee86d653fdb76f81d6e04a8e0036198d849d0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.62,-4263.93C2234.1,-4255.29 2263.45,-4241.05 2285,-4218 2348.47,-4150.1 2256.02,-4078.45 2321,-4012 2351.38,-3980.94 2393.66,-3964.5 2436.29,-3956.33"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2437.02,-3959.76 2446.25,-3954.57 2435.8,-3952.87 2437.02,-3959.76"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "hood to air dribble",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="c76613cf8ab5ade59c84cf6fb9e193af47351fa0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2739.12,-4872C2798.51,-4872 2869.81,-4872 2935.65,-4872"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2935.75,-4875.5 2945.75,-4872 2935.75,-4868.5 2935.75,-4875.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="d299a91979286074dcc1ba023402956113417ab6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2656.84,-4919.07C2723.94,-4984.82 2839.38,-5111.34 2889,-5246 2912.74,-5310.44 2881.47,-5809.89 2925,-5863 2929.23,-5868.17 2933.88,-5872.89 2938.86,-5877.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2936.96,-5880.16 2946.96,-5883.65 2941.32,-5874.68 2936.96,-5880.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="b2539993659fa6ad68fb4efe04bff79dc2bdeb2d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2739.12,-4909.46C2808.18,-4928.9 2893.32,-4952.86 2967.28,-4973.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2966.59,-4977.12 2977.17,-4976.46 2968.49,-4970.38 2966.59,-4977.12"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce to air dribble",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="edc991954571e41ad4b6e92aafb66f09c388dbd9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2776.09,-3144.8C2813.44,-3152.35 2852.68,-3160.91 2889,-3170 2919.71,-3177.69 2952.25,-3186.83 2983.35,-3196.06"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2982.36,-3199.42 2992.95,-3198.93 2984.37,-3192.71 2982.36,-3199.42"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="007ee0c3010fd2f75044a149df90bd0965f401ba" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2776.24,-3118.92C3044.89,-3126.69 3566.23,-3141.76 3854.68,-3150.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3854.74,-3153.6 3864.84,-3150.39 3854.95,-3146.6 3854.74,-3153.6"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="9aba1c670dc9d53349ceb3a3ebd3384003960793" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2776.24,-3130.09C2961.88,-3147.84 3246.96,-3175.78 3355,-3190 3556.7,-3216.54 3789.49,-3255.97 3930.38,-3280.82"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3929.9,-3284.29 3940.36,-3282.58 3931.12,-3277.39 3929.9,-3284.29"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "45 degree flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="20b84fca4ce8c7c8a278f764abbffe62cba90175" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3302.61,-4989.1C3321.18,-4981.58 3339.12,-4972.34 3355,-4961 3356.35,-4960.04 3452.43,-4821.64 3507.97,-4741.58"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3511.05,-4743.28 3513.87,-4733.07 3505.3,-4739.29 3511.05,-4743.28"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="2f919bdec851e293a32953373f2fe7249af39cab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3653.5,-5013C3653.5,-5013 3441.5,-5013 3441.5,-5013 3435.5,-5013 3429.5,-5007 3429.5,-5001 3429.5,-5001 3429.5,-4931 3429.5,-4931 3429.5,-4925 3435.5,-4919 3441.5,-4919 3441.5,-4919 3653.5,-4919 3653.5,-4919 3659.5,-4919 3665.5,-4925 3665.5,-4931 3665.5,-4931 3665.5,-5001 3665.5,-5001 3665.5,-5007 3659.5,-5013 3653.5,-5013"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-4977.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Musty Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-4937.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Musty Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="702449faeb3b2b4420f8ef7f458b5c724ca44ad8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3302.72,-4999.67C3341.36,-4994.33 3382.07,-4988.71 3418.92,-4983.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3419.78,-4987.03 3429.21,-4982.2 3418.82,-4980.1 3419.78,-4987.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: ["Mognus Flick (180 backflip flick)"]
                }}><GroupWrapper id="f98ade5cba23fdc5ba98b6019d8a6c89885d1eca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3680,-5125C3680,-5125 3415,-5125 3415,-5125 3409,-5125 3403,-5119 3403,-5113 3403,-5113 3403,-5043 3403,-5043 3403,-5037 3409,-5031 3415,-5031 3415,-5031 3680,-5031 3680,-5031 3686,-5031 3692,-5037 3692,-5043 3692,-5043 3692,-5113 3692,-5113 3692,-5119 3686,-5125 3680,-5125"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5089.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Delayed Flicks"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5049.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Delayed Flicks",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="09a925621b6b66c33763adab53b0f6fb39fff733" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3302.72,-5044.33C3332.47,-5048.44 3363.44,-5052.72 3392.94,-5056.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3392.5,-5060.27 3402.89,-5058.17 3393.46,-5053.33 3392.5,-5060.27"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Mognus Flick (180 backflip flick)",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,

                    notes: [{
                        text: "Jonniboi_i's mognus flick only 1v1 video.",
                        url: "https://www.youtube.com/watch?v=QXUo6bARX1Y"
                    }],

                    title: "Mognus Flick (180 backflip flick)",
                    description: "After popping the ball into the air with a hood dribble. The player spins around (180) then backflips into the ball, causing power and some delay to the ball. Also known as the 180 backflip flick.",
                    rank: "",
                    upstreamSkills: ["Delayed Flicks"],
                    downstreamSkills: []
                }}><GroupWrapper id="8acee1c4e2c55e829ffa2d1fb40445ac3bd2b84a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4368,-5125C4368,-5125 3752,-5125 3752,-5125 3746,-5125 3740,-5119 3740,-5113 3740,-5113 3740,-5043 3740,-5043 3740,-5037 3746,-5031 3752,-5031 3752,-5031 4368,-5031 4368,-5031 4374,-5031 4380,-5037 4380,-5043 4380,-5043 4380,-5113 4380,-5113 4380,-5119 4374,-5125 4368,-5125"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-5089.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Mognus Flick (180 Backflip Flick)"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-5049.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Mognus Flick (180 backflip flick)",
                    tailId: "Delayed Flicks"
                }}><GroupWrapper id="019b72d3cf8cd5ad78f9a6ddae510156779c3fb5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3692.06,-5078C3704.16,-5078 3716.68,-5078 3729.47,-5078"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3729.78,-5081.5 3739.78,-5078 3729.78,-5074.5 3729.78,-5081.5"></PolygonWrapper></GroupWrapper></Prerequisite></GroupWrapper></></SvgWrapper>)})