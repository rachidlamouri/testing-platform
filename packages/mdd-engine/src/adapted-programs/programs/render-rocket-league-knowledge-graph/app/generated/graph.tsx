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
    viewBox="0.00 0.00 4388.00 6243.00"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}><><GroupWrapper
            id="1adafe6db7788063f4117ab4c77b6c55bc78bcab"
            className="graph"
            transform="scale(1 1) rotate(0) translate(4 6239)"><PolygonWrapper
                fill="white"
                stroke="transparent"
                points="-4,4 -4,-6239 4384,-6239 4384,4 -4,4"></PolygonWrapper><Skill
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
                    rank: "",
                    upstreamSkills: ["Directional Flick", "Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="e47736dcd47611794872bd38789deff62ebce546" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3692,-5132C3692,-5132 3403,-5132 3403,-5132 3397,-5132 3391,-5126 3391,-5120 3391,-5120 3391,-5050 3391,-5050 3391,-5044 3397,-5038 3403,-5038 3403,-5038 3692,-5038 3692,-5038 3698,-5038 3704,-5044 3704,-5050 3704,-5050 3704,-5120 3704,-5120 3704,-5126 3698,-5132 3692,-5132"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5096.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"45 Degree Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5056.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "50/50’s + Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "50/50’s + Kickoffs",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Boosting", "Flipping"],
                    downstreamSkills: ["Fast Kickoffs"]
                }}><GroupWrapper id="a2b936491d4b9c3849b428df5f3f16a31cc9d59d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2221.5,-4067C2221.5,-4067 1889.5,-4067 1889.5,-4067 1883.5,-4067 1877.5,-4061 1877.5,-4055 1877.5,-4055 1877.5,-3985 1877.5,-3985 1877.5,-3979 1883.5,-3973 1889.5,-3973 1889.5,-3973 2221.5,-3973 2221.5,-3973 2227.5,-3973 2233.5,-3979 2233.5,-3985 2233.5,-3985 2233.5,-4055 2233.5,-4055 2233.5,-4061 2227.5,-4067 2221.5,-4067"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4031.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"50/50’s + Kickoffs"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3991.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["50/50’s + Kickoffs"],
                    downstreamSkills: ["Wavedash Kickoff"]
                }}><GroupWrapper id="70ae9f10a1ebfc1c3e2894c6b3cf99364f1eab4e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2721.5,-4179C2721.5,-4179 2488.5,-4179 2488.5,-4179 2482.5,-4179 2476.5,-4173 2476.5,-4167 2476.5,-4167 2476.5,-4097 2476.5,-4097 2476.5,-4091 2482.5,-4085 2488.5,-4085 2488.5,-4085 2721.5,-4085 2721.5,-4085 2727.5,-4085 2733.5,-4091 2733.5,-4097 2733.5,-4097 2733.5,-4167 2733.5,-4167 2733.5,-4173 2727.5,-4179 2721.5,-4179"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4143.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Fast Kickoffs"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4103.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Kickoffs",
                    tailId: "50/50’s + Kickoffs"
                }}><GroupWrapper id="f52925957ddb7918578ad02bb3562cee452d58b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2233.57,-4057.83C2262.76,-4063.97 2292.72,-4070.21 2321,-4076 2368.31,-4085.69 2420.13,-4096.02 2466.35,-4105.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2465.95,-4108.63 2476.43,-4107.13 2467.3,-4101.76 2465.95,-4108.63"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Advanced Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Advanced Boost Management",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c00c916c12a3d30e74a119e77adba795315da1bd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2877,-1662C2877,-1662 2333,-1662 2333,-1662 2327,-1662 2321,-1656 2321,-1650 2321,-1650 2321,-1580 2321,-1580 2321,-1574 2327,-1568 2333,-1568 2333,-1568 2877,-1568 2877,-1568 2883,-1568 2889,-1574 2889,-1580 2889,-1580 2889,-1650 2889,-1650 2889,-1656 2883,-1662 2877,-1662"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1626.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Advanced Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1586.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    upstreamSkills: ["Basic Aerials", "Powershot + Powerclears"],
                    downstreamSkills: []
                }}><GroupWrapper id="95db5dbea9d6dd0b9b333735ed54b07d0bd15896" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2210.5,-2681C2210.5,-2681 1900.5,-2681 1900.5,-2681 1894.5,-2681 1888.5,-2675 1888.5,-2669 1888.5,-2669 1888.5,-2599 1888.5,-2599 1888.5,-2593 1894.5,-2587 1900.5,-2587 1900.5,-2587 2210.5,-2587 2210.5,-2587 2216.5,-2587 2222.5,-2593 2222.5,-2599 2222.5,-2599 2222.5,-2669 2222.5,-2669 2222.5,-2675 2216.5,-2681 2210.5,-2681"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2645.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Aerial Powershot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2605.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    upstreamSkills: ["Basic Aerials", "Basic Demos"],
                    downstreamSkills: ["Air Dribble To Demo"]
                }}><GroupWrapper id="bad725340e6b5269093a4ee7bb2589b16cb4b07c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2150,-3431C2150,-3431 1961,-3431 1961,-3431 1955,-3431 1949,-3425 1949,-3419 1949,-3419 1949,-3349 1949,-3349 1949,-3343 1955,-3337 1961,-3337 1961,-3337 2150,-3337 2150,-3337 2156,-3337 2162,-3343 2162,-3349 2162,-3349 2162,-3419 2162,-3419 2162,-3425 2156,-3431 2150,-3431"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3395.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3355.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Air Demos", "Air Dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="187aafb17bf227ad9d2dd1cf1af5d38371b38744" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2790.5,-4067C2790.5,-4067 2419.5,-4067 2419.5,-4067 2413.5,-4067 2407.5,-4061 2407.5,-4055 2407.5,-4055 2407.5,-3985 2407.5,-3985 2407.5,-3979 2413.5,-3973 2419.5,-3973 2419.5,-3973 2790.5,-3973 2790.5,-3973 2796.5,-3973 2802.5,-3979 2802.5,-3985 2802.5,-3985 2802.5,-4055 2802.5,-4055 2802.5,-4061 2796.5,-4067 2790.5,-4067"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4031.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Dribble To Demo"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3991.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble To Demo",
                    tailId: "Air Demos"
                }}><GroupWrapper id="d7451a5a80d38661ede2d0beaf7275c0b1cbd171" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2162.04,-3383.73C2206.64,-3389.44 2255.09,-3404.45 2285,-3440 2360.15,-3529.31 2243.86,-3876.41 2321,-3964 2341.46,-3987.23 2368.54,-4002.51 2397.85,-4012.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2396.84,-4015.68 2407.43,-4015.32 2398.93,-4008.99 2396.84,-4015.68"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
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
                        d="M2174,-5561C2174,-5561 1937,-5561 1937,-5561 1931,-5561 1925,-5555 1925,-5549 1925,-5549 1925,-5479 1925,-5479 1925,-5473 1931,-5467 1937,-5467 1937,-5467 2174,-5467 2174,-5467 2180,-5467 2186,-5473 2186,-5479 2186,-5479 2186,-5549 2186,-5549 2186,-5555 2180,-5561 2174,-5561"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5525.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5485.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble To Demo",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="1abbb4783592395d2aeaf2f5ca8e35941ebbc06e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2186.26,-5511.02C2223.7,-5503.39 2260.91,-5487.9 2285,-5458 2381.38,-5338.39 2221.96,-4193.41 2321,-4076 2341.11,-4052.16 2368.17,-4036.61 2397.62,-4026.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2398.76,-4030.03 2407.26,-4023.7 2396.67,-4023.35 2398.76,-4030.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Air Dribbling", "Bounce Dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="1c8376a21cd95f20baa72447a2e903f8348fb452" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3340.5,-4049C3340.5,-4049 2939.5,-4049 2939.5,-4049 2933.5,-4049 2927.5,-4043 2927.5,-4037 2927.5,-4037 2927.5,-3967 2927.5,-3967 2927.5,-3961 2933.5,-3955 2939.5,-3955 2939.5,-3955 3340.5,-3955 3340.5,-3955 3346.5,-3955 3352.5,-3961 3352.5,-3967 3352.5,-3967 3352.5,-4037 3352.5,-4037 3352.5,-4043 3346.5,-4049 3340.5,-4049"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4013.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3973.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce To Air Dribble",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="1946a357ccbc69a503a232bb715a4c3b06de043f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2186.21,-5502.64C2221.17,-5494.42 2257.01,-5480.72 2285,-5458 2313.71,-5434.7 2290.38,-5403.73 2321,-5383 2425.76,-5312.09 2801.28,-5436.15 2889,-5345 2986.81,-5243.36 2841.54,-4189.72 2925,-4076 2930.55,-4068.44 2936.93,-4061.64 2943.93,-4055.53"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2946.2,-4058.19 2951.76,-4049.17 2941.79,-4052.76 2946.2,-4058.19"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Air Dribbling", "Hood Dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="6b6d13d5189cfa7b2822f546767c75b25aee3d36" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3322,-5655C3322,-5655 2958,-5655 2958,-5655 2952,-5655 2946,-5649 2946,-5643 2946,-5643 2946,-5573 2946,-5573 2946,-5567 2952,-5561 2958,-5561 2958,-5561 3322,-5561 3322,-5561 3328,-5561 3334,-5567 3334,-5573 3334,-5573 3334,-5643 3334,-5643 3334,-5649 3328,-5655 3322,-5655"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5619.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hood To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5579.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hood To Air Dribble",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="822fcd78d0eb6607ec2dc310088a1317ff3c2456" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2186.2,-5519.72C2350.2,-5527.68 2641.09,-5544.21 2889,-5571 2904.12,-5572.63 2919.73,-5574.5 2935.41,-5576.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2935.36,-5580.04 2945.73,-5577.86 2936.26,-5573.1 2935.36,-5580.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Air Dribbling"],
                    downstreamSkills: ["Turtle To Air Dribble"]
                }}><GroupWrapper id="643a8cb6d2e8b16fbbd4e84b7f44b5df97ece1ab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2750,-5486C2750,-5486 2460,-5486 2460,-5486 2454,-5486 2448,-5480 2448,-5474 2448,-5474 2448,-5404 2448,-5404 2448,-5398 2454,-5392 2460,-5392 2460,-5392 2750,-5392 2750,-5392 2756,-5392 2762,-5398 2762,-5404 2762,-5404 2762,-5474 2762,-5474 2762,-5480 2756,-5486 2750,-5486"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5450.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5410.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Air Dribble",
                    tailId: "Air Dribbling"
                }}><GroupWrapper id="3b1061f5e4eaf19fa0107f5fc042efc16e96aba2" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2186.25,-5496.23C2261.46,-5485.92 2356.93,-5472.85 2437.62,-5461.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2438.45,-5465.21 2447.89,-5460.39 2437.5,-5458.28 2438.45,-5465.21"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Roll Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Air Roll Shots",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Bounce Powershots", "Joystick Air Roll", "Powershot + Powerclears"],
                    downstreamSkills: ["Sideways Aerials"]
                }}><GroupWrapper id="84ed59c1560e13f68a09cd57afb61f327ad64967" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2730,-3149C2730,-3149 2480,-3149 2480,-3149 2474,-3149 2468,-3143 2468,-3137 2468,-3137 2468,-3067 2468,-3067 2468,-3061 2474,-3055 2480,-3055 2480,-3055 2730,-3055 2730,-3055 2736,-3055 2742,-3061 2742,-3067 2742,-3067 2742,-3137 2742,-3137 2742,-3143 2736,-3149 2730,-3149"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3113.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Air Roll Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3073.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Sideways Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Sideways Aerials",
                    description: "Hitting the ball in an aerial but, having either side of the car towards the floor.",
                    rank: "",
                    upstreamSkills: ["Air Roll Shots", "Basic Aerials"],
                    downstreamSkills: ["Tornado Spin"]
                }}><GroupWrapper id="6beecc4e8a0017138e31c6bb7dfb3967c2140f4f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3294.5,-3356C3294.5,-3356 2985.5,-3356 2985.5,-3356 2979.5,-3356 2973.5,-3350 2973.5,-3344 2973.5,-3344 2973.5,-3274 2973.5,-3274 2973.5,-3268 2979.5,-3262 2985.5,-3262 2985.5,-3262 3294.5,-3262 3294.5,-3262 3300.5,-3262 3306.5,-3268 3306.5,-3274 3306.5,-3274 3306.5,-3344 3306.5,-3344 3306.5,-3350 3300.5,-3356 3294.5,-3356"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3320.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Sideways Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-3280.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Sideways Aerials",
                    tailId: "Air Roll Shots"
                }}><GroupWrapper id="1ff6b88ba63f652fe7e8da519aef55fa3099f7b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2727.28,-3149.1C2811.07,-3181.64 2922.44,-3224.9 3008.22,-3258.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3007.17,-3261.56 3017.76,-3261.91 3009.71,-3255.03 3007.17,-3261.56"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Back-passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Back-passing",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6dbb66d80f6a9020c7a2bd3cd6e334226b358b0d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2725,-430C2725,-430 2485,-430 2485,-430 2479,-430 2473,-424 2473,-418 2473,-418 2473,-348 2473,-348 2473,-342 2479,-336 2485,-336 2485,-336 2725,-336 2725,-336 2731,-336 2737,-342 2737,-348 2737,-348 2737,-418 2737,-418 2737,-424 2731,-430 2725,-430"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-394.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Back-passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-354.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Backboard Passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Backboard Passing",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="33247406f4a055ecdd1ae7eb766c2d0d0f4fc0aa" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2778.5,-318C2778.5,-318 2431.5,-318 2431.5,-318 2425.5,-318 2419.5,-312 2419.5,-306 2419.5,-306 2419.5,-236 2419.5,-236 2419.5,-230 2425.5,-224 2431.5,-224 2431.5,-224 2778.5,-224 2778.5,-224 2784.5,-224 2790.5,-230 2790.5,-236 2790.5,-236 2790.5,-306 2790.5,-306 2790.5,-312 2784.5,-318 2778.5,-318"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-282.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backboard Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-242.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="258b0df51d6275c2d60a16f25ed64d34b5790e44" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2176.5,-5113C2176.5,-5113 1934.5,-5113 1934.5,-5113 1928.5,-5113 1922.5,-5107 1922.5,-5101 1922.5,-5101 1922.5,-5031 1922.5,-5031 1922.5,-5025 1928.5,-5019 1934.5,-5019 1934.5,-5019 2176.5,-5019 2176.5,-5019 2182.5,-5019 2188.5,-5025 2188.5,-5031 2188.5,-5031 2188.5,-5101 2188.5,-5101 2188.5,-5107 2182.5,-5113 2176.5,-5113"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5077.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backflip Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5037.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Backwards Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Backwards Aerials",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Joystick Air Roll"],
                    downstreamSkills: ["Tornado Spin"]
                }}><GroupWrapper id="1d5cb6bec87cf278ec89f5e049d00dccc1b13b67" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2225,-3955C2225,-3955 1886,-3955 1886,-3955 1880,-3955 1874,-3949 1874,-3943 1874,-3943 1874,-3873 1874,-3873 1874,-3867 1880,-3861 1886,-3861 1886,-3861 2225,-3861 2225,-3861 2231,-3861 2237,-3867 2237,-3873 2237,-3873 2237,-3943 2237,-3943 2237,-3949 2231,-3955 2225,-3955"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3919.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Backwards Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3879.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Tornado Spin",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Tornado Spin",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Backwards Aerials", "Directional Air Roll", "Sideways Aerials"],
                    downstreamSkills: ["Breezi Flick", "Tornado Flick / Spin"]
                }}><GroupWrapper id="02d12fafde64ffa29df2a16b1f344dadedf75b51" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3668.5,-3881C3668.5,-3881 3426.5,-3881 3426.5,-3881 3420.5,-3881 3414.5,-3875 3414.5,-3869 3414.5,-3869 3414.5,-3799 3414.5,-3799 3414.5,-3793 3420.5,-3787 3426.5,-3787 3426.5,-3787 3668.5,-3787 3668.5,-3787 3674.5,-3787 3680.5,-3793 3680.5,-3799 3680.5,-3799 3680.5,-3869 3680.5,-3869 3680.5,-3875 3674.5,-3881 3668.5,-3881"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-3845.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tornado Spin"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-3805.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Spin",
                    tailId: "Backwards Aerials"
                }}><GroupWrapper id="78e94d5c8dde456372dc943f3548f3a6c54f885b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2209.07,-3860.98C2236.46,-3847.83 2263.19,-3831.38 2285,-3811 2310.85,-3786.84 2290.85,-3758.52 2321,-3740 2428.56,-3673.94 2763.1,-3731.05 2889,-3740 3067.52,-3752.7 3271.25,-3784.55 3404.01,-3807.66"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3403.78,-3811.18 3414.24,-3809.45 3404.99,-3804.28 3403.78,-3811.18"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bait Shot",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Bait Shot",
                    description: "Intentionally missing the goal to draw out a defender",
                    rank: "",
                    upstreamSkills: ["Chip Shot"],
                    downstreamSkills: []
                }}><GroupWrapper id="cfbccfe158286b2fb673b38ab0ba96b7576e0056" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-2905C2695.5,-2905 2514.5,-2905 2514.5,-2905 2508.5,-2905 2502.5,-2899 2502.5,-2893 2502.5,-2893 2502.5,-2823 2502.5,-2823 2502.5,-2817 2508.5,-2811 2514.5,-2811 2514.5,-2811 2695.5,-2811 2695.5,-2811 2701.5,-2811 2707.5,-2817 2707.5,-2823 2707.5,-2823 2707.5,-2893 2707.5,-2893 2707.5,-2899 2701.5,-2905 2695.5,-2905"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2869.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bait Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2829.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Ball Camera Control",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Ball Camera Control",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Push Dribbling"]
                }}><GroupWrapper id="322c8b04c579d0cc6dedbe23975a2015fdeb60f0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.5,-5281C1642.5,-5281 1269.5,-5281 1269.5,-5281 1263.5,-5281 1257.5,-5275 1257.5,-5269 1257.5,-5269 1257.5,-5199 1257.5,-5199 1257.5,-5193 1263.5,-5187 1269.5,-5187 1269.5,-5187 1642.5,-5187 1642.5,-5187 1648.5,-5187 1654.5,-5193 1654.5,-5199 1654.5,-5199 1654.5,-5269 1654.5,-5269 1654.5,-5275 1648.5,-5281 1642.5,-5281"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5245.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ball Camera Control"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5205.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Ball Camera Control"],
                    downstreamSkills: ["Bounce Dribbling", "Hood Dribble", "Turtle Dribbling"]
                }}><GroupWrapper id="b57d7ec77eee426ded15ef7177bb6151aefdc7fb" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2191.5,-5449C2191.5,-5449 1919.5,-5449 1919.5,-5449 1913.5,-5449 1907.5,-5443 1907.5,-5437 1907.5,-5437 1907.5,-5367 1907.5,-5367 1907.5,-5361 1913.5,-5355 1919.5,-5355 1919.5,-5355 2191.5,-5355 2191.5,-5355 2197.5,-5355 2203.5,-5361 2203.5,-5367 2203.5,-5367 2203.5,-5437 2203.5,-5437 2203.5,-5443 2197.5,-5449 2191.5,-5449"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5413.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Push Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5373.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Push Dribbling",
                    tailId: "Ball Camera Control"
                }}><GroupWrapper id="ef295fff3dd4f94939b774bdb4c47d74fbdefb17" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1605.49,-5281.08C1672.59,-5301.84 1753.04,-5326 1826,-5346 1849.02,-5352.31 1873.44,-5358.66 1897.42,-5364.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1896.76,-5368.14 1907.31,-5367.18 1898.46,-5361.35 1896.76,-5368.14"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Basic Aerials",
                    description: "",
                    rank: "G",
                    upstreamSkills: ["Boosting", "Jumping"],

                    downstreamSkills: [
                        "Aerial Powershot",
                        "Air Demos",
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
                        d="M1574,-3356C1574,-3356 1338,-3356 1338,-3356 1332,-3356 1326,-3350 1326,-3344 1326,-3344 1326,-3274 1326,-3274 1326,-3268 1332,-3262 1338,-3262 1338,-3262 1574,-3262 1574,-3262 1580,-3262 1586,-3268 1586,-3274 1586,-3274 1586,-3344 1586,-3344 1586,-3350 1580,-3356 1574,-3356"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3320.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Basic Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3280.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ △ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="287831003c277b664bdf49cfc54182da5fb3768e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1515.89,-3261.83C1592.83,-3196.57 1725.33,-3070.95 1790,-2932 1835.88,-2833.41 1752.75,-2770.37 1826,-2690 1840.61,-2673.97 1859,-2662.17 1878.96,-2653.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1880.27,-2656.8 1888.24,-2649.81 1877.66,-2650.31 1880.27,-2656.8"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="daff5de28c58903ce4621da9b79b223fc6157acc" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.28,-3325.23C1691.22,-3338.4 1837.84,-3356.8 1938.92,-3369.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1938.5,-3372.97 1948.86,-3370.74 1939.37,-3366.02 1938.5,-3372.97"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backwards Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="fadcecb82f16a202686abd99d4f56b2bab8735e6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1497.82,-3356.29C1562.27,-3431.64 1690.48,-3584.41 1790,-3721 1807.2,-3744.61 1804.77,-3755.93 1826,-3776 1859.5,-3807.68 1901.97,-3834.85 1941.19,-3856.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1939.56,-3859.26 1950.02,-3860.9 1942.86,-3853.09 1939.56,-3859.26"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Ceiling Shots",
                    description: "Having the ball near or bounce off or around the ceiling for a shot on goal.",
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Game Awareness", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="5fb00f6fecfb6a5691d87a1013c31a8b75ec6a9e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2726,-2334C2726,-2334 2484,-2334 2484,-2334 2478,-2334 2472,-2328 2472,-2322 2472,-2322 2472,-2252 2472,-2252 2472,-2246 2478,-2240 2484,-2240 2484,-2240 2726,-2240 2726,-2240 2732,-2240 2738,-2246 2738,-2252 2738,-2252 2738,-2322 2738,-2322 2738,-2328 2732,-2334 2726,-2334"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2298.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ceiling Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2258.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling Shots",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="d19e57deecbdf35b8a361a5fd4c2db5654838836" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.35,-3287.19C1657.13,-3275.27 1746.39,-3260.28 1826,-3247 1927.98,-3229.99 2216.43,-3248.38 2285,-3171 2346.07,-3102.08 2261.01,-2412.87 2321,-2343 2355.56,-2302.75 2409.97,-2286.22 2461.89,-2280.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2462.26,-2284.15 2471.89,-2279.73 2461.6,-2277.18 2462.26,-2284.15"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Game Awareness", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="461408ec2f18b326815f701571e15472f940020d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2734.5,-2222C2734.5,-2222 2475.5,-2222 2475.5,-2222 2469.5,-2222 2463.5,-2216 2463.5,-2210 2463.5,-2210 2463.5,-2140 2463.5,-2140 2463.5,-2134 2469.5,-2128 2475.5,-2128 2475.5,-2128 2734.5,-2128 2734.5,-2128 2740.5,-2128 2746.5,-2134 2746.5,-2140 2746.5,-2140 2746.5,-2210 2746.5,-2210 2746.5,-2216 2740.5,-2222 2734.5,-2222"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2186.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Doomsee Dish"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2146.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doomsee Dish",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="454fb2283054e6850285e44e560dd9390c331d21" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.79,-3261.91C1631.59,-3230.49 1732.78,-3191.34 1826,-3171 1875.96,-3160.1 2249.43,-3174.73 2285,-3138 2355.16,-3065.55 2255.45,-2307.65 2321,-2231 2353.59,-2192.9 2403.96,-2176.03 2453.23,-2169.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2453.86,-2173.07 2463.39,-2168.44 2453.05,-2166.12 2453.86,-2173.07"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Double Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="00bc34dd4e490f922e9a45ffbb6d5dd5e68792a1" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2242,-3655C2242,-3655 1869,-3655 1869,-3655 1863,-3655 1857,-3649 1857,-3643 1857,-3643 1857,-3573 1857,-3573 1857,-3567 1863,-3561 1869,-3561 1869,-3561 2242,-3561 2242,-3561 2248,-3561 2254,-3567 2254,-3573 2254,-3573 2254,-3643 2254,-3643 2254,-3649 2248,-3655 2242,-3655"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3619.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Jump Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3579.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jump Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="64ba9ec3a4634a153bf17595fc1a60d3298b9589" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1514.72,-3356.16C1584.43,-3410.87 1707.18,-3500.17 1826,-3552 1832.82,-3554.98 1839.83,-3557.81 1846.96,-3560.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1846.16,-3563.95 1856.76,-3564.11 1848.58,-3557.38 1846.16,-3563.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast Aerials",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Fast Aerials",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Double Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="19c79969ec65a637f01ae084a9cf18b354b05cbe" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2163,-3767C2163,-3767 1948,-3767 1948,-3767 1942,-3767 1936,-3761 1936,-3755 1936,-3755 1936,-3685 1936,-3685 1936,-3679 1942,-3673 1948,-3673 1948,-3673 2163,-3673 2163,-3673 2169,-3673 2175,-3679 2175,-3685 2175,-3685 2175,-3755 2175,-3755 2175,-3761 2169,-3767 2163,-3767"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3731.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Fast Aerials"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3691.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="c9179e3dd062b0ca5eac0d36583af8241da81b8f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1492.19,-3356.23C1551.99,-3432.99 1681.15,-3584.26 1826,-3664 1856.53,-3680.81 1892.09,-3692.63 1925.94,-3700.93"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1925.38,-3704.39 1935.91,-3703.28 1926.98,-3697.58 1925.38,-3704.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Leveling Out",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Leveling Out",
                    description: "Orienting the car so it's facing the direction of travel while in the air to maintain speed when landing",
                    rank: "",
                    upstreamSkills: ["Basic Aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="8d8c6887f0db17eef270e9780fd52005a3861986" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2171.5,-3543C2171.5,-3543 1939.5,-3543 1939.5,-3543 1933.5,-3543 1927.5,-3537 1927.5,-3531 1927.5,-3531 1927.5,-3461 1927.5,-3461 1927.5,-3455 1933.5,-3449 1939.5,-3449 1939.5,-3449 2171.5,-3449 2171.5,-3449 2177.5,-3449 2183.5,-3455 2183.5,-3461 2183.5,-3461 2183.5,-3531 2183.5,-3531 2183.5,-3537 2177.5,-3543 2171.5,-3543"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3507.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Leveling Out"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3467.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Leveling Out",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="04d73664f45a28dd4d6969647f835278b3764637" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1579.82,-3356.1C1651.11,-3382.56 1742.96,-3415.15 1826,-3440 1855.39,-3448.8 1887.21,-3457.25 1917.5,-3464.81"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1916.73,-3468.22 1927.28,-3467.23 1918.41,-3461.43 1916.73,-3468.22"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c4a6dda7d9ec580fa318836908b3733aea6757c8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-2446C2695.5,-2446 2514.5,-2446 2514.5,-2446 2508.5,-2446 2502.5,-2440 2502.5,-2434 2502.5,-2434 2502.5,-2364 2502.5,-2364 2502.5,-2358 2508.5,-2352 2514.5,-2352 2514.5,-2352 2695.5,-2352 2695.5,-2352 2701.5,-2352 2707.5,-2358 2707.5,-2364 2707.5,-2364 2707.5,-2434 2707.5,-2434 2707.5,-2440 2701.5,-2446 2695.5,-2446"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2410.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Pinching"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2370.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Pinching",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="e5001144648ca9343ece52750feb74ffc4c8fcc5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.29,-3303.78C1813.09,-3293.99 2261.05,-3271.66 2285,-3247 2346.37,-3183.8 2263.55,-2521.78 2321,-2455 2362.38,-2406.91 2432.09,-2392.69 2491.98,-2390.61"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.35,-2394.1 2502.26,-2390.37 2492.18,-2387.11 2492.35,-2394.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rebound Shots",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Rebound Shots",
                    description: "When the ball hits a wall hard enough to start going towards midfield and the player uses prediction, aerials, and air rolls to score it.",
                    rank: "",
                    upstreamSkills: ["Basic Aerials", "Prediction", "Redirects"],
                    downstreamSkills: []
                }}><GroupWrapper id="0fda196e33daaacda27b72bbc119f9b6b6b6fc86" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2193,-2457C2193,-2457 1918,-2457 1918,-2457 1912,-2457 1906,-2451 1906,-2445 1906,-2445 1906,-2375 1906,-2375 1906,-2369 1912,-2363 1918,-2363 1918,-2363 2193,-2363 2193,-2363 2199,-2363 2205,-2369 2205,-2375 2205,-2375 2205,-2445 2205,-2445 2205,-2451 2199,-2457 2193,-2457"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2421.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rebound Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2381.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rebound Shots",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="d41faa5989b81adbbae98fcbdfe09a47ccbe4d96" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1518.03,-3261.93C1596.7,-3197.24 1730.44,-3072.74 1790,-2932 1830.48,-2836.35 1758.79,-2545.19 1826,-2466 1844.26,-2444.48 1869.32,-2430.5 1896.16,-2421.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1897.21,-2424.89 1905.73,-2418.6 1895.14,-2418.21 1897.21,-2424.89"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Sideways Aerials",
                    tailId: "Basic Aerials"
                }}><GroupWrapper id="495972fb20a3e4ad6b3a8f864d23f4aed96cd9c8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1586.19,-3309C1884.91,-3309 2623.74,-3309 2963.25,-3309"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2963.42,-3312.5 2973.42,-3309 2963.42,-3305.5 2963.42,-3312.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Boosting", "Turning"],
                    downstreamSkills: ["Air Demos", "Goalie Demos"]
                }}><GroupWrapper id="7336660793449ed1297223c8aefa547b3bea0a96" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1572.5,-2774C1572.5,-2774 1339.5,-2774 1339.5,-2774 1333.5,-2774 1327.5,-2768 1327.5,-2762 1327.5,-2762 1327.5,-2692 1327.5,-2692 1327.5,-2686 1333.5,-2680 1339.5,-2680 1339.5,-2680 1572.5,-2680 1572.5,-2680 1578.5,-2680 1584.5,-2686 1584.5,-2692 1584.5,-2692 1584.5,-2762 1584.5,-2762 1584.5,-2768 1578.5,-2774 1572.5,-2774"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2738.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Basic Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2698.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="fe6b2b43b66db6b558febc32a7bfbac1bfff3165" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1584.89,-2729.49C1655.95,-2737.99 1739.88,-2761.17 1790,-2820 1836.12,-2874.14 1796.31,-3073.37 1826,-3138 1861.72,-3215.75 1931.59,-3285.21 1984.72,-3330.33"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1982.52,-3333.06 1992.43,-3336.81 1987.02,-3327.7 1982.52,-3333.06"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Goalie Demos",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Goalie Demos",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Basic Demos"],
                    downstreamSkills: []
                }}><GroupWrapper id="4a28cafe911bf4ae8e044789441ae3d4cd2c6576" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2180.5,-2569C2180.5,-2569 1930.5,-2569 1930.5,-2569 1924.5,-2569 1918.5,-2563 1918.5,-2557 1918.5,-2557 1918.5,-2487 1918.5,-2487 1918.5,-2481 1924.5,-2475 1930.5,-2475 1930.5,-2475 2180.5,-2475 2180.5,-2475 2186.5,-2475 2192.5,-2481 2192.5,-2487 2192.5,-2487 2192.5,-2557 2192.5,-2557 2192.5,-2563 2186.5,-2569 2180.5,-2569"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2533.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Goalie Demos"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2493.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Goalie Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="02e51b4e5b1f27760f2c22fdbe3eba01bfd80e33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1584.63,-2699.32C1649.41,-2681.6 1727.41,-2654.4 1790,-2615 1809.42,-2602.78 1806.09,-2589.39 1826,-2578 1851.24,-2563.56 1880.12,-2552.82 1908.66,-2544.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1909.57,-2548.21 1918.31,-2542.23 1907.75,-2541.46 1909.57,-2548.21"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boost Stealing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Boost Stealing",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4dc40bb7caf9fed2ed66bb13f46fbb1df2387ff2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2736.5,-1774C2736.5,-1774 2473.5,-1774 2473.5,-1774 2467.5,-1774 2461.5,-1768 2461.5,-1762 2461.5,-1762 2461.5,-1692 2461.5,-1692 2461.5,-1686 2467.5,-1680 2473.5,-1680 2473.5,-1680 2736.5,-1680 2736.5,-1680 2742.5,-1680 2748.5,-1686 2748.5,-1692 2748.5,-1692 2748.5,-1762 2748.5,-1762 2748.5,-1768 2742.5,-1774 2736.5,-1774"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1738.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Boost Stealing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1698.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Boosting",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Boosting",
                    description: "",
                    rank: "",
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
                        d="M966,-3083C966,-3083 785,-3083 785,-3083 779,-3083 773,-3077 773,-3071 773,-3071 773,-3001 773,-3001 773,-2995 779,-2989 785,-2989 785,-2989 966,-2989 966,-2989 972,-2989 978,-2995 978,-3001 978,-3001 978,-3071 978,-3071 978,-3077 972,-3083 966,-3083"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-3047.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Boosting"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-3007.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Boosting"
                }}><GroupWrapper id="5d8996827b436d743ab2e51c0f78da5c2dfeaa6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M875.58,-3083.21C875.64,-3221.49 895.9,-3628.64 1122,-3833 1325.98,-4017.37 1659.15,-4041.01 1867.14,-4035.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1867.37,-4038.5 1877.25,-4034.69 1867.15,-4031.5 1867.37,-4038.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Aerials",
                    tailId: "Boosting"
                }}><GroupWrapper id="eeb9b3883eda0b9f600725e9f7bcfba970e4f247" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M932.22,-3083.2C979.95,-3121.63 1051.9,-3174.9 1122,-3209 1183.06,-3238.7 1254.75,-3261.61 1315.94,-3277.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1315.1,-3281.36 1325.67,-3280.53 1316.89,-3274.59 1315.1,-3281.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Boosting"
                }}><GroupWrapper id="52167b9a65db45a3347dca992a7cc93919727046" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M917.95,-2988.66C963.37,-2939.62 1040.66,-2864.12 1122,-2820 1182.35,-2787.27 1255.25,-2765.22 1317.44,-2750.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1318.34,-2754.23 1327.32,-2748.6 1316.79,-2747.4 1318.34,-2754.23"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Chipping",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chipping",
                    description: "Driving into a grounded ball without jumping",
                    rank: "",
                    upstreamSkills: ["Boosting"],
                    downstreamSkills: ["Chip Clear", "Chip Double Touch", "Chip Shot"]
                }}><GroupWrapper id="cfdbe4fec64d936c3bd931b8c1c724480b83578e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-2923C1546.5,-2923 1365.5,-2923 1365.5,-2923 1359.5,-2923 1353.5,-2917 1353.5,-2911 1353.5,-2911 1353.5,-2841 1353.5,-2841 1353.5,-2835 1359.5,-2829 1365.5,-2829 1365.5,-2829 1546.5,-2829 1546.5,-2829 1552.5,-2829 1558.5,-2835 1558.5,-2841 1558.5,-2841 1558.5,-2911 1558.5,-2911 1558.5,-2917 1552.5,-2923 1546.5,-2923"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2887.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2847.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Chipping",
                    tailId: "Boosting"
                }}><GroupWrapper id="811114c1373fd9be16061b5bb25088c16f9c7fb1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-3007.86C1080.6,-2979.55 1237.95,-2936.03 1343.58,-2906.82"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1344.62,-2910.16 1353.32,-2904.12 1342.75,-2903.41 1344.62,-2910.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Boosting", "Wave Dash"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95c68cc3736c6dfaa388c5aadcd341c5b0a21f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-3955C2695.5,-3955 2514.5,-3955 2514.5,-3955 2508.5,-3955 2502.5,-3949 2502.5,-3943 2502.5,-3943 2502.5,-3873 2502.5,-3873 2502.5,-3867 2508.5,-3861 2514.5,-3861 2514.5,-3861 2695.5,-3861 2695.5,-3861 2701.5,-3861 2707.5,-3867 2707.5,-3873 2707.5,-3873 2707.5,-3943 2707.5,-3943 2707.5,-3949 2701.5,-3955 2695.5,-3955"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3919.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hel-jump"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3879.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Boosting"
                }}><GroupWrapper id="e6abb339e33d2c148fdb01ea27b6ee3307a4035c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.05,-3041.64C1271.75,-3060.22 2112.23,-3130.02 2285,-3328 2361.74,-3415.94 2243.86,-3764.41 2321,-3852 2362.85,-3899.52 2432.39,-3913.76 2492.07,-3916.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.23,-3919.51 2502.32,-3916.28 2492.41,-3912.51 2492.23,-3919.51"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot + Powerclears",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powershot + Powerclears",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Boosting", "Driving", "Turning"],

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
                        d="M1689,-2382C1689,-2382 1223,-2382 1223,-2382 1217,-2382 1211,-2376 1211,-2370 1211,-2370 1211,-2300 1211,-2300 1211,-2294 1217,-2288 1223,-2288 1223,-2288 1689,-2288 1689,-2288 1695,-2288 1701,-2294 1701,-2300 1701,-2300 1701,-2370 1701,-2370 1701,-2376 1695,-2382 1689,-2382"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2346.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powershot + Powerclears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2306.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Boosting"
                }}><GroupWrapper id="51301e2282283ee5735d568c01e581d46214133c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M901.84,-2988.98C945.41,-2906.3 1034.8,-2728.49 1086,-2569 1110.67,-2492.15 1064,-2447.12 1122,-2391 1144.33,-2369.39 1171.7,-2354.33 1201.05,-2344.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1202.26,-2347.32 1210.65,-2340.85 1200.06,-2340.67 1202.26,-2347.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Redirects",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Redirects",
                    description: "Hitting the ball in a way to cause the direction of the ball to change for a pass, clear, or goal.",
                    rank: "",
                    upstreamSkills: ["Boosting", "Turning"],
                    downstreamSkills: ["Rebound Shots"]
                }}><GroupWrapper id="fd69be653321b291759b25bacb9d457fe645abae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-2606C1546.5,-2606 1365.5,-2606 1365.5,-2606 1359.5,-2606 1353.5,-2600 1353.5,-2594 1353.5,-2594 1353.5,-2524 1353.5,-2524 1353.5,-2518 1359.5,-2512 1365.5,-2512 1365.5,-2512 1546.5,-2512 1546.5,-2512 1552.5,-2512 1558.5,-2518 1558.5,-2524 1558.5,-2524 1558.5,-2594 1558.5,-2594 1558.5,-2600 1552.5,-2606 1546.5,-2606"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2570.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Redirects"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2530.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Boosting"
                }}><GroupWrapper id="2b101ad152e13d18e42311c10f858ec8a217e3d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M895.92,-2989C930.21,-2911.62 1008.75,-2757.37 1122,-2671 1186.6,-2621.73 1274.13,-2593.41 1343.23,-2577.58"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1344.29,-2580.93 1353.29,-2575.33 1342.77,-2574.1 1344.29,-2580.93"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Boosting", "Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="ce7e31b531e33bd7e1161f92d917606f73f53240" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2155.5,-4665C2155.5,-4665 1955.5,-4665 1955.5,-4665 1949.5,-4665 1943.5,-4659 1943.5,-4653 1943.5,-4653 1943.5,-4583 1943.5,-4583 1943.5,-4577 1949.5,-4571 1955.5,-4571 1955.5,-4571 2155.5,-4571 2155.5,-4571 2161.5,-4571 2167.5,-4577 2167.5,-4583 2167.5,-4583 2167.5,-4653 2167.5,-4653 2167.5,-4659 2161.5,-4665 2155.5,-4665"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4629.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tilted Drift"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4589.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tilted Drift",
                    tailId: "Boosting"
                }}><GroupWrapper id="7b29687ce703539726ae960c3790644fd28c6dfb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M886.93,-3083.03C920.19,-3234.44 1025.13,-3723.15 1086,-4132 1097.06,-4206.28 1070.32,-4413.52 1122,-4468 1332.85,-4690.28 1732.66,-4668 1933.28,-4639.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1933.87,-4643.19 1943.27,-4638.3 1932.87,-4636.26 1933.87,-4643.19"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Wall Pinch",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Boosting", "Joystick Air Roll", "Jumping"],
                    downstreamSkills: ["Kuxir Pinch"]
                }}><GroupWrapper id="3122bd50e6d8511d07e4f71ea0d07038f0df8fed" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2150.5,-4291C2150.5,-4291 1960.5,-4291 1960.5,-4291 1954.5,-4291 1948.5,-4285 1948.5,-4279 1948.5,-4279 1948.5,-4209 1948.5,-4209 1948.5,-4203 1954.5,-4197 1960.5,-4197 1960.5,-4197 2150.5,-4197 2150.5,-4197 2156.5,-4197 2162.5,-4203 2162.5,-4209 2162.5,-4209 2162.5,-4279 2162.5,-4279 2162.5,-4285 2156.5,-4291 2150.5,-4291"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4255.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4215.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Pinch",
                    tailId: "Boosting"
                }}><GroupWrapper id="607c127e366dc918789ee7d97b6dbe173479b599" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M883.11,-3083.02C912.66,-3289.99 1035,-4112.98 1122,-4187 1150.3,-4211.08 1752.93,-4217.4 1790,-4220 1838.64,-4223.41 1892.22,-4228.09 1938.37,-4232.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1938.12,-4235.91 1948.4,-4233.37 1938.77,-4228.94 1938.12,-4235.91"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Prediction", "Push Dribbling"],
                    downstreamSkills: ["Bounce To Air Dribble", "Breezi Flick", "Tornado Flick / Spin"]
                }}><GroupWrapper id="51f309ad1c42858841f5b1dfdcaedd0c329ce3aa" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2764,-3843C2764,-3843 2446,-3843 2446,-3843 2440,-3843 2434,-3837 2434,-3831 2434,-3831 2434,-3761 2434,-3761 2434,-3755 2440,-3749 2446,-3749 2446,-3749 2764,-3749 2764,-3749 2770,-3749 2776,-3755 2776,-3761 2776,-3761 2776,-3831 2776,-3831 2776,-3837 2770,-3843 2764,-3843"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3807.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3767.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce To Air Dribble",
                    tailId: "Bounce Dribbling"
                }}><GroupWrapper id="d45b299b709f9408d39d03f1884382e61e4de3ca" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2776.23,-3804.3C2816.21,-3812.81 2856.57,-3827.42 2889,-3852 2917.2,-3873.37 2898.58,-3899.47 2925,-3923 2936.46,-3933.21 2949.36,-3942.14 2963,-3949.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2961.6,-3953.17 2972.05,-3954.91 2964.97,-3947.03 2961.6,-3953.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Bounce Dribbling", "Tornado Spin"],
                    downstreamSkills: []
                }}><GroupWrapper id="78c633192e33640847f65ab13614156fc4721a49" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4167.5,-3937C4167.5,-3937 3952.5,-3937 3952.5,-3937 3946.5,-3937 3940.5,-3931 3940.5,-3925 3940.5,-3925 3940.5,-3855 3940.5,-3855 3940.5,-3849 3946.5,-3843 3952.5,-3843 3952.5,-3843 4167.5,-3843 4167.5,-3843 4173.5,-3843 4179.5,-3849 4179.5,-3855 4179.5,-3855 4179.5,-3925 4179.5,-3925 4179.5,-3931 4173.5,-3937 4167.5,-3937"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3901.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Breezi Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3861.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Bounce Dribbling"
                }}><GroupWrapper id="fb4f1e35611bf41dd58232168d484930c1601ee6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2776.21,-3822.32C2934.87,-3845.44 3178.28,-3877.31 3391,-3890 3578.15,-3901.17 3795.32,-3898.23 3929.96,-3894.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3930.42,-3898.04 3940.32,-3894.26 3930.22,-3891.04 3930.42,-3898.04"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Bounce Dribbling", "Tornado Spin"],
                    downstreamSkills: []
                }}><GroupWrapper id="58c831a400d054a656225db6965364b2dbd9ba76" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4243,-3816C4243,-3816 3877,-3816 3877,-3816 3871,-3816 3865,-3810 3865,-3804 3865,-3804 3865,-3734 3865,-3734 3865,-3728 3871,-3722 3877,-3722 3877,-3722 4243,-3722 4243,-3722 4249,-3722 4255,-3728 4255,-3734 4255,-3734 4255,-3804 4255,-3804 4255,-3810 4249,-3816 4243,-3816"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3780.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Tornado Flick / Spin"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-3740.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Bounce Dribbling"
                }}><GroupWrapper id="f103ea8610da07e02c9113437104c05908058430" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2776.35,-3791.63C2935.35,-3787.66 3179.23,-3781.85 3391,-3778 3546.54,-3775.17 3722.47,-3772.83 3854.73,-3771.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3855.02,-3774.75 3864.97,-3771.13 3854.93,-3767.75 3855.02,-3774.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    downstreamSkills: ["Air Roll Shots"]
                }}><GroupWrapper id="b209979857f96555ea66ffe9ffcb87645ccec92f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2233.5,-3017C2233.5,-3017 1877.5,-3017 1877.5,-3017 1871.5,-3017 1865.5,-3011 1865.5,-3005 1865.5,-3005 1865.5,-2935 1865.5,-2935 1865.5,-2929 1871.5,-2923 1877.5,-2923 1877.5,-2923 2233.5,-2923 2233.5,-2923 2239.5,-2923 2245.5,-2929 2245.5,-2935 2245.5,-2935 2245.5,-3005 2245.5,-3005 2245.5,-3011 2239.5,-3017 2233.5,-3017"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2981.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bounce Powershots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2941.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Roll Shots",
                    tailId: "Bounce Powershots"
                }}><GroupWrapper id="94f719ff2f38fbb4a08479fa290f5ce03ae59be9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2245.69,-3015.61C2315.21,-3032.38 2392.82,-3051.08 2457.97,-3066.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2457.36,-3070.25 2467.91,-3069.19 2459.01,-3063.44 2457.36,-3070.25"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M530.5,-1615C530.5,-1615 349.5,-1615 349.5,-1615 343.5,-1615 337.5,-1609 337.5,-1603 337.5,-1603 337.5,-1533 337.5,-1533 337.5,-1527 343.5,-1521 349.5,-1521 349.5,-1521 530.5,-1521 530.5,-1521 536.5,-1521 542.5,-1527 542.5,-1533 542.5,-1533 542.5,-1603 542.5,-1603 542.5,-1609 536.5,-1615 530.5,-1615"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1579.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Braking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1539.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Directional Air Roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="50cdd25dfdc6c01eedc6f657bfb2724993242682" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2197.5,-5749C2197.5,-5749 1913.5,-5749 1913.5,-5749 1907.5,-5749 1901.5,-5743 1901.5,-5737 1901.5,-5737 1901.5,-5667 1901.5,-5667 1901.5,-5661 1907.5,-5655 1913.5,-5655 1913.5,-5655 2197.5,-5655 2197.5,-5655 2203.5,-5655 2209.5,-5661 2209.5,-5667 2209.5,-5667 2209.5,-5737 2209.5,-5737 2209.5,-5743 2203.5,-5749 2197.5,-5749"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5713.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Bunny Hopping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5673.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Calculated Clears",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Calculated Clears",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="23534bdae00e2ef374f9b651c5ed0c5095a06dc4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2766.5,-1550C2766.5,-1550 2443.5,-1550 2443.5,-1550 2437.5,-1550 2431.5,-1544 2431.5,-1538 2431.5,-1538 2431.5,-1468 2431.5,-1468 2431.5,-1462 2437.5,-1456 2443.5,-1456 2443.5,-1456 2766.5,-1456 2766.5,-1456 2772.5,-1456 2778.5,-1462 2778.5,-1468 2778.5,-1468 2778.5,-1538 2778.5,-1538 2778.5,-1544 2772.5,-1550 2766.5,-1550"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1514.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Calculated Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1474.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    downstreamSkills: ["Wall Catch"]
                }}><GroupWrapper id="2b9bcf7bbecd708379dfee8a9b9b2044a98476b3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-1669C2146,-1669 1965,-1669 1965,-1669 1959,-1669 1953,-1663 1953,-1657 1953,-1657 1953,-1587 1953,-1587 1953,-1581 1959,-1575 1965,-1575 1965,-1575 2146,-1575 2146,-1575 2152,-1575 2158,-1581 2158,-1587 2158,-1587 2158,-1657 2158,-1657 2158,-1663 2152,-1669 2146,-1669"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1633.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Catching"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1593.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Catching", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95374b66691729713bdc144b215e2dfea7db01" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2702.5,-2558C2702.5,-2558 2507.5,-2558 2507.5,-2558 2501.5,-2558 2495.5,-2552 2495.5,-2546 2495.5,-2546 2495.5,-2476 2495.5,-2476 2495.5,-2470 2501.5,-2464 2507.5,-2464 2507.5,-2464 2702.5,-2464 2702.5,-2464 2708.5,-2464 2714.5,-2470 2714.5,-2476 2714.5,-2476 2714.5,-2546 2714.5,-2546 2714.5,-2552 2708.5,-2558 2702.5,-2558"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2522.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Catch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2482.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Catch",
                    tailId: "Catching"
                }}><GroupWrapper id="7c52fe6e101ea53ee24c5e2a71e8664d65463a1d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.2,-1623.26C2204.11,-1629.5 2254.73,-1645.43 2285,-1683 2338.88,-1749.86 2264.96,-2389.94 2321,-2455 2360.86,-2501.28 2426.96,-2516.17 2485.26,-2519.08"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2485.16,-2522.58 2495.29,-2519.47 2485.43,-2515.59 2485.16,-2522.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2739,-1998C2739,-1998 2471,-1998 2471,-1998 2465,-1998 2459,-1992 2459,-1986 2459,-1986 2459,-1916 2459,-1916 2459,-1910 2465,-1904 2471,-1904 2471,-1904 2739,-1904 2739,-1904 2745,-1904 2751,-1910 2751,-1916 2751,-1916 2751,-1986 2751,-1986 2751,-1992 2745,-1998 2739,-1998"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1962.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Ceiling Shuffle"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1922.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ▿ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="e1c06a2914c0afd860df71f0b4c3297fe65d4205" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2741,-1438C2741,-1438 2469,-1438 2469,-1438 2463,-1438 2457,-1432 2457,-1426 2457,-1426 2457,-1356 2457,-1356 2457,-1350 2463,-1344 2469,-1344 2469,-1344 2741,-1344 2741,-1344 2747,-1344 2753,-1350 2753,-1356 2753,-1356 2753,-1426 2753,-1426 2753,-1432 2747,-1438 2741,-1438"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1402.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Cherry Picking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1362.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                        d="M2152.5,-2793C2152.5,-2793 1958.5,-2793 1958.5,-2793 1952.5,-2793 1946.5,-2787 1946.5,-2781 1946.5,-2781 1946.5,-2711 1946.5,-2711 1946.5,-2705 1952.5,-2699 1958.5,-2699 1958.5,-2699 2152.5,-2699 2152.5,-2699 2158.5,-2699 2164.5,-2705 2164.5,-2711 2164.5,-2711 2164.5,-2781 2164.5,-2781 2164.5,-2787 2158.5,-2793 2152.5,-2793"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2757.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Clear"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2717.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ⬣ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Chip Double Touch",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip Double Touch",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="28842baf84efc063b7718a83fa125785181da5c2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2228,-3129C2228,-3129 1883,-3129 1883,-3129 1877,-3129 1871,-3123 1871,-3117 1871,-3117 1871,-3047 1871,-3047 1871,-3041 1877,-3035 1883,-3035 1883,-3035 2228,-3035 2228,-3035 2234,-3035 2240,-3041 2240,-3047 2240,-3047 2240,-3117 2240,-3117 2240,-3123 2234,-3129 2228,-3129"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3093.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Double Touch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-3053.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Chip Shot",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Chip Shot",
                    description: "Using boost to control how hard you chip the ball towards the goal",
                    rank: "",
                    upstreamSkills: ["Chipping"],
                    downstreamSkills: ["Bait Shot"]
                }}><GroupWrapper id="36c41bc4976d87a51476ff84df70b605cfce40d8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-2905C2146,-2905 1965,-2905 1965,-2905 1959,-2905 1953,-2899 1953,-2893 1953,-2893 1953,-2823 1953,-2823 1953,-2817 1959,-2811 1965,-2811 1965,-2811 2146,-2811 2146,-2811 2152,-2811 2158,-2817 2158,-2823 2158,-2823 2158,-2893 2158,-2893 2158,-2899 2152,-2905 2146,-2905"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2869.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Chip Shot"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2829.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bait Shot",
                    tailId: "Chip Shot"
                }}><GroupWrapper id="d3a900f5da85b600216799025e0626cfe613d3a8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.2,-2858C2253.03,-2858 2394.18,-2858 2492.15,-2858"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.38,-2861.5 2502.38,-2858 2492.38,-2854.5 2492.38,-2861.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Chip Clear",
                    tailId: "Chipping"
                }}><GroupWrapper id="76285d63c4bbe1f8272f2ffb3ec148fdaa141305" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-2853.87C1663.39,-2831.1 1826.35,-2795.64 1936.61,-2771.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1937.42,-2775.05 1946.45,-2769.51 1935.93,-2768.21 1937.42,-2775.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Chip Double Touch",
                    tailId: "Chipping"
                }}><GroupWrapper id="d4d5bcdf8e567d985a0abaf5e8d1c9f757de5c1f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.51,-2921.94C1631.81,-2953.95 1733.73,-2996.12 1826,-3026 1837.42,-3029.7 1849.23,-3033.29 1861.19,-3036.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1860.23,-3040.11 1870.81,-3039.48 1862.15,-3033.37 1860.23,-3040.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Chip Shot",
                    tailId: "Chipping"
                }}><GroupWrapper id="d8f1650af60a2b10741bdafd631f14f607a80927" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-2872.94C1665.3,-2869.72 1832.33,-2864.69 1942.61,-2861.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.88,-2864.86 1952.77,-2861.06 1942.66,-2857.87 1942.88,-2864.86"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Clear Prevention",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Clear Prevention",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="5ea77ad958d862ae971aa72ce8101208cc8fd5b6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2758,-1326C2758,-1326 2452,-1326 2452,-1326 2446,-1326 2440,-1320 2440,-1314 2440,-1314 2440,-1244 2440,-1244 2440,-1238 2446,-1232 2452,-1232 2452,-1232 2758,-1232 2758,-1232 2764,-1232 2770,-1238 2770,-1244 2770,-1244 2770,-1314 2770,-1314 2770,-1320 2764,-1326 2758,-1326"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1290.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Clear Prevention"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1250.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Close Touch",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Close Touch",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="104d640197253124756d28b19cd52d3c58388d77" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2715,-1214C2715,-1214 2495,-1214 2495,-1214 2489,-1214 2483,-1208 2483,-1202 2483,-1202 2483,-1132 2483,-1132 2483,-1126 2489,-1120 2495,-1120 2495,-1120 2715,-1120 2715,-1120 2721,-1120 2727,-1126 2727,-1132 2727,-1132 2727,-1202 2727,-1202 2727,-1208 2721,-1214 2715,-1214"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1178.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Close Touch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1138.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Corner Pass",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Corner Pass",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="c43324faadb08677d8df8957a373cb4c9427530b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2715,-1102C2715,-1102 2495,-1102 2495,-1102 2489,-1102 2483,-1096 2483,-1090 2483,-1090 2483,-1020 2483,-1020 2483,-1014 2489,-1008 2495,-1008 2495,-1008 2715,-1008 2715,-1008 2721,-1008 2727,-1014 2727,-1020 2727,-1020 2727,-1090 2727,-1090 2727,-1096 2721,-1102 2715,-1102"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1066.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Corner Pass"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1026.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Crossing",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Crossing",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="7cd05f58b6adce6d5be96789fd45b25a4834018c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M530.5,-1503C530.5,-1503 349.5,-1503 349.5,-1503 343.5,-1503 337.5,-1497 337.5,-1491 337.5,-1491 337.5,-1421 337.5,-1421 337.5,-1415 343.5,-1409 349.5,-1409 349.5,-1409 530.5,-1409 530.5,-1409 536.5,-1409 542.5,-1415 542.5,-1421 542.5,-1421 542.5,-1491 542.5,-1491 542.5,-1497 536.5,-1503 530.5,-1503"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1467.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Crossing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1427.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                        d="M2146,-2043C2146,-2043 1965,-2043 1965,-2043 1959,-2043 1953,-2037 1953,-2031 1953,-2031 1953,-1961 1953,-1961 1953,-1955 1959,-1949 1965,-1949 1965,-1949 2146,-1949 2146,-1949 2152,-1949 2158,-1955 2158,-1961 2158,-1961 2158,-2031 2158,-2031 2158,-2037 2152,-2043 2146,-2043"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2007.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Cutting"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1967.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    downstreamSkills: ["Mognus Flick (180 Backflip Flick)"]
                }}><GroupWrapper id="f98ade5cba23fdc5ba98b6019d8a6c89885d1eca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3680,-5823C3680,-5823 3415,-5823 3415,-5823 3409,-5823 3403,-5817 3403,-5811 3403,-5811 3403,-5741 3403,-5741 3403,-5735 3409,-5729 3415,-5729 3415,-5729 3680,-5729 3680,-5729 3686,-5729 3692,-5735 3692,-5741 3692,-5741 3692,-5811 3692,-5811 3692,-5817 3686,-5823 3680,-5823"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5787.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Delayed Flicks"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5747.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Delayed Flicks"],
                    downstreamSkills: []
                }}><GroupWrapper id="c5da4d98b0e488f670d4dbb0ee2343896701af00" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M4368,-5823C4368,-5823 3752,-5823 3752,-5823 3746,-5823 3740,-5817 3740,-5811 3740,-5811 3740,-5741 3740,-5741 3740,-5735 3746,-5729 3752,-5729 3752,-5729 4368,-5729 4368,-5729 4374,-5729 4380,-5735 4380,-5741 4380,-5741 4380,-5811 4380,-5811 4380,-5817 4374,-5823 4368,-5823"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-5787.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Mognus Flick (180 Backflip Flick)"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="4060"
                        y="-5747.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Mognus Flick (180 Backflip Flick)",
                    tailId: "Delayed Flicks"
                }}><GroupWrapper id="cda66c9a9cd8bddb5195e38bc6f4676ac05c5f0a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3692.06,-5776C3704.16,-5776 3716.68,-5776 3729.47,-5776"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3729.78,-5779.5 3739.78,-5776 3729.78,-5772.5 3729.78,-5779.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Diagonal Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Diagonal Flipping",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1e85eff77e89770205d9c74e3c78f5034b966ad0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2217.5,-5001C2217.5,-5001 1893.5,-5001 1893.5,-5001 1887.5,-5001 1881.5,-4995 1881.5,-4989 1881.5,-4989 1881.5,-4919 1881.5,-4919 1881.5,-4913 1887.5,-4907 1893.5,-4907 1893.5,-4907 2217.5,-4907 2217.5,-4907 2223.5,-4907 2229.5,-4913 2229.5,-4919 2229.5,-4919 2229.5,-4989 2229.5,-4989 2229.5,-4995 2223.5,-5001 2217.5,-5001"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4965.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Diagonal Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4925.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Directional Air Roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Directional Air Roll",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Bunny Hopping", "Speed Flipping", "Stalling", "Tornado Spin"]
                }}><GroupWrapper id="9e3b39aecce8df563adadd6729649a4bf2537a10" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1630.5,-5636C1630.5,-5636 1281.5,-5636 1281.5,-5636 1275.5,-5636 1269.5,-5630 1269.5,-5624 1269.5,-5624 1269.5,-5554 1269.5,-5554 1269.5,-5548 1275.5,-5542 1281.5,-5542 1281.5,-5542 1630.5,-5542 1630.5,-5542 1636.5,-5542 1642.5,-5548 1642.5,-5554 1642.5,-5554 1642.5,-5624 1642.5,-5624 1642.5,-5630 1636.5,-5636 1630.5,-5636"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5600.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Directional Air Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5560.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bunny Hopping",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="b25ec0b53e48d510ed1790240c9705038e76cd1f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.78,-5624.13C1722.28,-5639.17 1814.3,-5656.57 1891.16,-5671.11"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1890.94,-5674.63 1901.42,-5673.05 1892.24,-5667.75 1890.94,-5674.63"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Speed Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Speed Flipping",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Directional Air Roll", "Flipping"],
                    downstreamSkills: ["Zap Dash"]
                }}><GroupWrapper id="82dc79751604a0977ae0945f03c39c8c1781ffc9" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2193,-5225C2193,-5225 1918,-5225 1918,-5225 1912,-5225 1906,-5219 1906,-5213 1906,-5213 1906,-5143 1906,-5143 1906,-5137 1912,-5131 1918,-5131 1918,-5131 2193,-5131 2193,-5131 2199,-5131 2205,-5137 2205,-5143 2205,-5143 2205,-5213 2205,-5213 2205,-5219 2199,-5225 2193,-5225"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5189.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Speed Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5149.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Speed Flipping",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="93f722ba09d46bb81fdcdf60f35f15f86e084b93" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1518.94,-5541.79C1589.46,-5486.23 1705.76,-5388.95 1790,-5290 1809.18,-5267.47 1801.92,-5251.19 1826,-5234 1846.93,-5219.06 1871.38,-5208.08 1896.37,-5200.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1897.43,-5203.36 1905.96,-5197.07 1895.37,-5196.67 1897.43,-5203.36"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Directional Air Roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9f7b99a1949e67ad3915822fb4c785629eab00c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-5861C2146,-5861 1965,-5861 1965,-5861 1959,-5861 1953,-5855 1953,-5849 1953,-5849 1953,-5779 1953,-5779 1953,-5773 1959,-5767 1965,-5767 1965,-5767 2146,-5767 2146,-5767 2152,-5767 2158,-5773 2158,-5779 2158,-5779 2158,-5849 2158,-5849 2158,-5855 2152,-5861 2146,-5861"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5825.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Stalling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5785.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Stalling",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="6c47eba18d52c2cf0b07ce91b29347297c54bcb0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1547.14,-5636.12C1620.66,-5673.11 1728.01,-5723.9 1826,-5758 1863.45,-5771.03 1905.35,-5782.23 1942.95,-5791.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.38,-5794.58 1952.92,-5793.44 1943.97,-5787.76 1942.38,-5794.58"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Spin",
                    tailId: "Directional Air Roll"
                }}><GroupWrapper id="d169f5dc9c7d662a43bb2f3831bc47740fac8471" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1642.65,-5590.07C1810.62,-5589.77 2064.7,-5586.16 2285,-5570 2554.78,-5550.21 2621.2,-5533.16 2889,-5495 3096.68,-5465.4 3211.78,-5573.27 3355,-5420 3384.79,-5388.12 3386.18,-5072.36 3391,-5029 3439.71,-4590.38 3513.73,-4063.24 3538.27,-3891.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3541.76,-3891.57 3539.71,-3881.17 3534.83,-3890.58 3541.76,-3891.57"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Flipping", "Hood Dribble"],
                    downstreamSkills: ["45 Degree Flick", "Delayed Flicks", "Musty Flick"]
                }}><GroupWrapper id="19641b3805579dd37624bf66b09257f750974774" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3290.5,-5767C3290.5,-5767 2989.5,-5767 2989.5,-5767 2983.5,-5767 2977.5,-5761 2977.5,-5755 2977.5,-5755 2977.5,-5685 2977.5,-5685 2977.5,-5679 2983.5,-5673 2989.5,-5673 2989.5,-5673 3290.5,-5673 3290.5,-5673 3296.5,-5673 3302.5,-5679 3302.5,-5685 3302.5,-5685 3302.5,-5755 3302.5,-5755 3302.5,-5761 3296.5,-5767 3290.5,-5767"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5731.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Directional Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5691.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "45 Degree Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="4cf604191d7a99df4aded8b0f539f3ea28adef13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3302.74,-5696.71C3321.95,-5688.69 3340.02,-5678.06 3355,-5664 3394.4,-5627.02 3492.74,-5280.84 3530.96,-5142.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3534.44,-5142.65 3533.71,-5132.08 3527.69,-5140.8 3534.44,-5142.65"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Delayed Flicks",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="09a925621b6b66c33763adab53b0f6fb39fff733" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3302.72,-5742.33C3332.47,-5746.44 3363.44,-5750.72 3392.94,-5754.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3392.5,-5758.27 3402.89,-5756.17 3393.46,-5751.33 3392.5,-5758.27"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M3653.5,-5711C3653.5,-5711 3441.5,-5711 3441.5,-5711 3435.5,-5711 3429.5,-5705 3429.5,-5699 3429.5,-5699 3429.5,-5629 3429.5,-5629 3429.5,-5623 3435.5,-5617 3441.5,-5617 3441.5,-5617 3653.5,-5617 3653.5,-5617 3659.5,-5617 3665.5,-5623 3665.5,-5629 3665.5,-5629 3665.5,-5699 3665.5,-5699 3665.5,-5705 3659.5,-5711 3653.5,-5711"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5675.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Musty Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3547.5"
                        y="-5635.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Musty Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="702449faeb3b2b4420f8ef7f458b5c724ca44ad8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3302.72,-5697.67C3341.36,-5692.33 3382.07,-5686.71 3418.92,-5681.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3419.78,-5685.03 3429.21,-5680.2 3418.82,-5678.1 3419.78,-5685.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2146,-4515C2146,-4515 1965,-4515 1965,-4515 1959,-4515 1953,-4509 1953,-4503 1953,-4503 1953,-4433 1953,-4433 1953,-4427 1959,-4421 1965,-4421 1965,-4421 2146,-4421 2146,-4421 2152,-4421 2158,-4427 2158,-4433 2158,-4433 2158,-4503 2158,-4503 2158,-4509 2152,-4515 2146,-4515"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4479.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Doinking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4439.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                        d="M2707,-3693C2707,-3693 2503,-3693 2503,-3693 2497,-3693 2491,-3687 2491,-3681 2491,-3681 2491,-3611 2491,-3611 2491,-3605 2497,-3599 2503,-3599 2503,-3599 2707,-3599 2707,-3599 2713,-3599 2719,-3605 2719,-3611 2719,-3611 2719,-3681 2719,-3681 2719,-3687 2713,-3693 2707,-3693"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3657.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Spring Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-3617.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Doinking"
                }}><GroupWrapper id="f74ec4708b4af8a62b07acaf86411af898938406" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.18,-4468.98C2203.94,-4463.72 2254.44,-4448.87 2285,-4412 2380.42,-4296.85 2230.28,-3858.89 2321,-3740 2358.63,-3690.69 2423.03,-3666.94 2480.9,-3655.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.67,-3659.05 2490.87,-3653.8 2480.4,-3652.17 2481.67,-3659.05"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Double Jumping",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Double Jump Aerials", "Fast Aerials", "Spring Roll"]
                }}><GroupWrapper id="03c645b9ea53657cc27a20182e7610dcc89b94ee" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1602,-3824C1602,-3824 1310,-3824 1310,-3824 1304,-3824 1298,-3818 1298,-3812 1298,-3812 1298,-3742 1298,-3742 1298,-3736 1304,-3730 1310,-3730 1310,-3730 1602,-3730 1602,-3730 1608,-3730 1614,-3736 1614,-3742 1614,-3742 1614,-3812 1614,-3812 1614,-3818 1608,-3824 1602,-3824"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3788.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-3748.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jump Aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="994586aba8272d1dc3f81d9c00b6b78f21d02dc4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1603.68,-3729.99C1671.13,-3708.91 1752.36,-3684.28 1826,-3664 1833.7,-3661.88 1841.55,-3659.76 1849.5,-3657.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1850.45,-3661.01 1859.23,-3655.07 1848.66,-3654.24 1850.45,-3661.01"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Fast Aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="12304fae0feb3989019ca462f0635f51eddd0de4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1614.38,-3761.99C1711.52,-3752.72 1834.59,-3740.98 1925.87,-3732.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1926.38,-3735.74 1936,-3731.3 1925.71,-3728.77 1926.38,-3735.74"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ad02c4f7b05a024681bb92a2ed2e803bf46c649e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1614.26,-3795.68C1822.56,-3817.26 2176.33,-3841.97 2285,-3776 2314.57,-3758.05 2293.49,-3727.96 2321,-3707 2366.44,-3672.37 2427.33,-3656.47 2480.98,-3649.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.41,-3652.97 2490.91,-3648.29 2480.57,-3646.02 2481.41,-3652.97"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="f21817e858b7a7029bb1d230c1c166612745bbca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2199.5,-4403C2199.5,-4403 1911.5,-4403 1911.5,-4403 1905.5,-4403 1899.5,-4397 1899.5,-4391 1899.5,-4391 1899.5,-4321 1899.5,-4321 1899.5,-4315 1905.5,-4309 1911.5,-4309 1911.5,-4309 2199.5,-4309 2199.5,-4309 2205.5,-4309 2211.5,-4315 2211.5,-4321 2211.5,-4321 2211.5,-4391 2211.5,-4391 2211.5,-4397 2205.5,-4403 2199.5,-4403"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4367.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Double Touches"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4327.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                        d="M203,-2382C203,-2382 12,-2382 12,-2382 6,-2382 0,-2376 0,-2370 0,-2370 0,-2300 0,-2300 0,-2294 6,-2288 12,-2288 12,-2288 203,-2288 203,-2288 209,-2288 215,-2294 215,-2300 215,-2300 215,-2370 215,-2370 215,-2376 209,-2382 203,-2382"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="107.5"
                        y="-2346.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Driving"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="107.5"
                        y="-2306.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ○ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boosting",
                    tailId: "Driving"
                }}><GroupWrapper id="f8161b17441a7def2138c218af3057859b4183f1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M159.95,-2382.08C296.96,-2507.47 670.1,-2848.95 815.44,-2981.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="813.28,-2984.72 823.02,-2988.89 818.01,-2979.56 813.28,-2984.72"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Braking",
                    tailId: "Driving"
                }}><GroupWrapper id="ebf18b4afe73755cc0d0b934b00523fd5e4f7036" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M111.71,-2287.95C122.36,-2145.49 161.06,-1722.59 251,-1624 270.92,-1602.17 298.93,-1588.7 327.26,-1580.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="328.55,-1583.72 337.28,-1577.73 326.72,-1576.96 328.55,-1583.72"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Crossing",
                    tailId: "Driving"
                }}><GroupWrapper id="a4dd9bcb7c16e49f157714b721c1b3dc3a9b3e1c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M110.3,-2287.95C117.26,-2130.99 147.35,-1628.67 251,-1512 270.81,-1489.7 299.08,-1476.1 327.69,-1467.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="328.64,-1471.23 337.4,-1465.27 326.84,-1464.47 328.64,-1471.23"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Jumping",
                    description: "",
                    rank: "",
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
                        d="M966,-4235C966,-4235 785,-4235 785,-4235 779,-4235 773,-4229 773,-4223 773,-4223 773,-4153 773,-4153 773,-4147 779,-4141 785,-4141 785,-4141 966,-4141 966,-4141 972,-4141 978,-4147 978,-4153 978,-4153 978,-4223 978,-4223 978,-4229 972,-4235 966,-4235"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-4199.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-4159.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Jumping",
                    tailId: "Driving"
                }}><GroupWrapper id="4acdb597339422b238ab40122e44811df9987004" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M128.01,-2382.2C233.58,-2637.57 735.9,-3852.73 850.98,-4131.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="847.85,-4132.69 854.91,-4140.6 854.32,-4130.02 847.85,-4132.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Positioning",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Positioning",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Rotation", "Shadowing", "Teammate Awareness", "Wall Driving"]
                }}><GroupWrapper id="a712a04c933abf5a931bcfdc872cedc3542e0268" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M540.5,-1727C540.5,-1727 339.5,-1727 339.5,-1727 333.5,-1727 327.5,-1721 327.5,-1715 327.5,-1715 327.5,-1645 327.5,-1645 327.5,-1639 333.5,-1633 339.5,-1633 339.5,-1633 540.5,-1633 540.5,-1633 546.5,-1633 552.5,-1639 552.5,-1645 552.5,-1645 552.5,-1715 552.5,-1715 552.5,-1721 546.5,-1727 540.5,-1727"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1691.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Positioning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-1651.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Positioning",
                    tailId: "Driving"
                }}><GroupWrapper id="6d69af14f92aa38b283d9f38a8f8e55b7da6c9be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M132.27,-2287.89C191.69,-2170.14 346.5,-1863.31 410.59,-1736.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="413.84,-1737.62 415.23,-1727.12 407.6,-1734.47 413.84,-1737.62"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Driving"
                }}><GroupWrapper id="a95d5e59165072fdf6c0c854a63cde1a2361053e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215,-2335C426.32,-2335 903.83,-2335 1200.78,-2335"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1200.83,-2338.5 1210.83,-2335 1200.83,-2331.5 1200.83,-2338.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Turning",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powerslide Turning",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Power Slide Dribble", "Powerslide Recovery"]
                }}><GroupWrapper id="0fbaf27e68e4e8e34b42a9e74352bce7299da410" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M617,-6160C617,-6160 263,-6160 263,-6160 257,-6160 251,-6154 251,-6148 251,-6148 251,-6078 251,-6078 251,-6072 257,-6066 263,-6066 263,-6066 617,-6066 617,-6066 623,-6066 629,-6072 629,-6078 629,-6078 629,-6148 629,-6148 629,-6154 623,-6160 617,-6160"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-6124.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powerslide Turning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="440"
                        y="-6084.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="46995ef069361998ccf614c333fdc6e911c332b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M112.62,-2382.08C147.67,-2782.74 395.51,-5615.91 433.99,-6055.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="430.52,-6056.28 434.88,-6065.93 437.5,-6055.67 430.52,-6056.28"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Prediction",
                    description: "",
                    rank: "",
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
                        d="M1549,-1987C1549,-1987 1363,-1987 1363,-1987 1357,-1987 1351,-1981 1351,-1975 1351,-1975 1351,-1905 1351,-1905 1351,-1899 1357,-1893 1363,-1893 1363,-1893 1549,-1893 1549,-1893 1555,-1893 1561,-1899 1561,-1905 1561,-1905 1561,-1975 1561,-1975 1561,-1981 1555,-1987 1549,-1987"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1951.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1911.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Prediction",
                    tailId: "Driving"
                }}><GroupWrapper id="e6d0ac4250488960d3927971b52afff6bb1c939b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215,-2303.76C464.44,-2230.58 1084.74,-2048.62 1341.22,-1973.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1342.32,-1976.7 1350.93,-1970.53 1340.35,-1969.99 1342.32,-1976.7"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turning",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Turning",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Basic Demos", "Powershot + Powerclears", "Redirects"]
                }}><GroupWrapper id="b0f78a0f574630800e6d978b85363ff41bd7ad8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M966,-2560C966,-2560 785,-2560 785,-2560 779,-2560 773,-2554 773,-2548 773,-2548 773,-2478 773,-2478 773,-2472 779,-2466 785,-2466 785,-2466 966,-2466 966,-2466 972,-2466 978,-2472 978,-2478 978,-2478 978,-2548 978,-2548 978,-2554 972,-2560 966,-2560"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-2524.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turning"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-2484.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="d26ba9c663855ade1d9248c95687355f9190979d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M215.01,-2359.75C359.37,-2393.3 615.96,-2452.92 762.91,-2487.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="762.33,-2490.53 772.86,-2489.38 763.91,-2483.71 762.33,-2490.53"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2695.5,-2782C2695.5,-2782 2514.5,-2782 2514.5,-2782 2508.5,-2782 2502.5,-2776 2502.5,-2770 2502.5,-2770 2502.5,-2700 2502.5,-2700 2502.5,-2694 2508.5,-2688 2514.5,-2688 2514.5,-2688 2695.5,-2688 2695.5,-2688 2701.5,-2688 2707.5,-2694 2707.5,-2700 2707.5,-2700 2707.5,-2770 2707.5,-2770 2707.5,-2776 2701.5,-2782 2695.5,-2782"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2746.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Dunking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2706.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                        d="M2146,-1931C2146,-1931 1965,-1931 1965,-1931 1959,-1931 1953,-1925 1953,-1919 1953,-1919 1953,-1849 1953,-1849 1953,-1843 1959,-1837 1965,-1837 1965,-1837 2146,-1837 2146,-1837 2152,-1837 2158,-1843 2158,-1849 2158,-1849 2158,-1919 2158,-1919 2158,-1925 2152,-1931 2146,-1931"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1895.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Faking"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1855.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                        d="M3300.5,-4179C3300.5,-4179 2979.5,-4179 2979.5,-4179 2973.5,-4179 2967.5,-4173 2967.5,-4167 2967.5,-4167 2967.5,-4097 2967.5,-4097 2967.5,-4091 2973.5,-4085 2979.5,-4085 2979.5,-4085 3300.5,-4085 3300.5,-4085 3306.5,-4085 3312.5,-4091 3312.5,-4097 3312.5,-4097 3312.5,-4167 3312.5,-4167 3312.5,-4173 3306.5,-4179 3300.5,-4179"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4143.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wavedash Kickoff"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4103.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wavedash Kickoff",
                    tailId: "Fast Kickoffs"
                }}><GroupWrapper id="67d9afd180d6e1f10cc6a76e7f00728105982e64" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2733.67,-4132C2800.51,-4132 2883.52,-4132 2956.98,-4132"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2957.28,-4135.5 2967.28,-4132 2957.28,-4128.5 2957.28,-4135.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Half Flipping"]
                }}><GroupWrapper id="e316805d3be682b3c87b00d407221b6e711bcbf2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2187,-5337C2187,-5337 1924,-5337 1924,-5337 1918,-5337 1912,-5331 1912,-5325 1912,-5325 1912,-5255 1912,-5255 1912,-5249 1918,-5243 1924,-5243 1924,-5243 2187,-5243 2187,-5243 2193,-5243 2199,-5249 2199,-5255 2199,-5255 2199,-5325 2199,-5325 2199,-5331 2193,-5337 2187,-5337"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5301.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Canceling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5261.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Half Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Half Flipping",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Flip Canceling"],
                    downstreamSkills: ["Forward Half Flipping"]
                }}><GroupWrapper id="2f486098ed6ca725946e7874897f547e93ca3e85" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2724.5,-5224C2724.5,-5224 2485.5,-5224 2485.5,-5224 2479.5,-5224 2473.5,-5218 2473.5,-5212 2473.5,-5212 2473.5,-5142 2473.5,-5142 2473.5,-5136 2479.5,-5130 2485.5,-5130 2485.5,-5130 2724.5,-5130 2724.5,-5130 2730.5,-5130 2736.5,-5136 2736.5,-5142 2736.5,-5142 2736.5,-5212 2736.5,-5212 2736.5,-5218 2730.5,-5224 2724.5,-5224"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5188.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Half Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5148.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Half Flipping",
                    tailId: "Flip Canceling"
                }}><GroupWrapper id="213e51184931850635d69bb0c3526abb9edae090" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2199.17,-5258.79C2238.61,-5250.29 2281.44,-5241.18 2321,-5233 2367.27,-5223.44 2417.86,-5213.32 2463.31,-5204.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2464.09,-5207.77 2473.23,-5202.4 2462.74,-5200.9 2464.09,-5207.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Flip Window"],
                    downstreamSkills: []
                }}><GroupWrapper id="e7f376482ca72c1e9ac02a746b294f2841867fb0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2156,-5973C2156,-5973 1955,-5973 1955,-5973 1949,-5973 1943,-5967 1943,-5961 1943,-5961 1943,-5891 1943,-5891 1943,-5885 1949,-5879 1955,-5879 1955,-5879 2156,-5879 2156,-5879 2162,-5879 2168,-5885 2168,-5891 2168,-5891 2168,-5961 2168,-5961 2168,-5967 2162,-5973 2156,-5973"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5937.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Resets"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-5897.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Flip Window",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Flip Window",
                    description: "Understanding how long you have to flip, and when your flip is avaialable again (resets)",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Flip Resets", "Rumble - UFO Shots"]
                }}><GroupWrapper id="bf988ab8fc9ce684ae09535bf927100f8d56eb42" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1569.5,-5973C1569.5,-5973 1342.5,-5973 1342.5,-5973 1336.5,-5973 1330.5,-5967 1330.5,-5961 1330.5,-5961 1330.5,-5891 1330.5,-5891 1330.5,-5885 1336.5,-5879 1342.5,-5879 1342.5,-5879 1569.5,-5879 1569.5,-5879 1575.5,-5879 1581.5,-5885 1581.5,-5891 1581.5,-5891 1581.5,-5961 1581.5,-5961 1581.5,-5967 1575.5,-5973 1569.5,-5973"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5937.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flip Window"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-5897.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip Resets",
                    tailId: "Flip Window"
                }}><GroupWrapper id="b772f4fec96f62f3ed42b7425c8f3cbe794bb97f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1581.53,-5926C1684.63,-5926 1830.29,-5926 1932.65,-5926"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1932.73,-5929.5 1942.73,-5926 1932.73,-5922.5 1932.73,-5929.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Flip Window"],
                    downstreamSkills: []
                }}><GroupWrapper id="17075a55ee3dc99408922e99aa3b9d8397b11618" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2241,-6085C2241,-6085 1870,-6085 1870,-6085 1864,-6085 1858,-6079 1858,-6073 1858,-6073 1858,-6003 1858,-6003 1858,-5997 1864,-5991 1870,-5991 1870,-5991 2241,-5991 2241,-5991 2247,-5991 2253,-5997 2253,-6003 2253,-6003 2253,-6073 2253,-6073 2253,-6079 2247,-6085 2241,-6085"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-6049.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rumble - UFO Shots"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-6009.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - UFO Shots",
                    tailId: "Flip Window"
                }}><GroupWrapper id="164fe1cfbd8d0a7fda8f667b20ac2890ccc0cd22" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1581.53,-5949.34C1658.5,-5963.77 1759.2,-5982.65 1847.88,-5999.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1847.33,-6002.73 1857.8,-6001.13 1848.62,-5995.85 1847.33,-6002.73"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Flipping",
                    description: "",
                    rank: "",
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
                        d="M1546.5,-4945C1546.5,-4945 1365.5,-4945 1365.5,-4945 1359.5,-4945 1353.5,-4939 1353.5,-4933 1353.5,-4933 1353.5,-4863 1353.5,-4863 1353.5,-4857 1359.5,-4851 1365.5,-4851 1365.5,-4851 1546.5,-4851 1546.5,-4851 1552.5,-4851 1558.5,-4857 1558.5,-4863 1558.5,-4863 1558.5,-4933 1558.5,-4933 1558.5,-4939 1552.5,-4945 1546.5,-4945"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4909.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4869.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Flipping"
                }}><GroupWrapper id="9629a67191bfe59987557df418272e39594e5e63" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1508.92,-4850.76C1585.67,-4777.36 1727.1,-4627.67 1790,-4468 1822.06,-4386.61 1768.91,-4142.28 1826,-4076 1837.81,-4062.29 1852.37,-4051.65 1868.38,-4043.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1869.91,-4046.57 1877.42,-4039.1 1866.89,-4040.26 1869.91,-4046.57"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backflip Shot",
                    tailId: "Flipping"
                }}><GroupWrapper id="feacadcab328ca220484c937119099189c6f0856" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.77,-4930.52C1632.63,-4953.72 1735.12,-4985.09 1826,-5010 1853.96,-5017.66 1883.98,-5025.38 1912.77,-5032.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1911.93,-5035.93 1922.48,-5034.94 1913.61,-5029.14 1911.93,-5035.93"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Diagonal Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="261c87736cbe53fafb62bf8314c992a171d8018a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-4907.53C1644.13,-4915.54 1768.37,-4927.18 1871.11,-4936.81"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1871.02,-4940.32 1881.3,-4937.77 1871.67,-4933.35 1871.02,-4940.32"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Flipping"
                }}><GroupWrapper id="e45baa78fa3c1200e296a306aacaef56a3377c2c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1545.13,-4945.22C1624.06,-4992.7 1735.51,-5073.74 1790,-5178 1830.52,-5255.53 1766.43,-5505.94 1826,-5570 1966.82,-5721.42 2101.74,-5550.22 2285,-5646 2305.33,-5656.63 2300.07,-5673.6 2321,-5683 2528.25,-5776.09 2795.53,-5767.37 2967.12,-5747.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2967.74,-5751.13 2977.26,-5746.49 2966.92,-5744.18 2967.74,-5751.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Flip Canceling",
                    tailId: "Flipping"
                }}><GroupWrapper id="abdfa8ec98928ad093f18c04973c737ffcdba0b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1524.39,-4945.17C1595.57,-4997.05 1708.55,-5085.42 1790,-5178 1809.54,-5200.22 1801.92,-5216.81 1826,-5234 1848.5,-5250.06 1875.08,-5261.54 1902,-5269.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1901.35,-5273.2 1911.93,-5272.62 1903.3,-5266.48 1901.35,-5273.2"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2253,-4889C2253,-4889 1858,-4889 1858,-4889 1852,-4889 1846,-4883 1846,-4877 1846,-4877 1846,-4807 1846,-4807 1846,-4801 1852,-4795 1858,-4795 1858,-4795 2253,-4795 2253,-4795 2259,-4795 2265,-4801 2265,-4807 2265,-4807 2265,-4877 2265,-4877 2265,-4883 2259,-4889 2253,-4889"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4853.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rumble - Spike Flicks"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4813.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - Spike Flicks",
                    tailId: "Flipping"
                }}><GroupWrapper id="16d66adb5bb5e45604b95ecc253ebd736034bcbb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-4888.47C1634.55,-4881.36 1740.99,-4871.38 1835.81,-4862.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1836.2,-4865.98 1845.83,-4861.56 1835.55,-4859.01 1836.2,-4865.98"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Speed Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="b3b15ccfc7f072fd97b31f1386b3096de20b88a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1520.75,-4945.07C1591.86,-4995.52 1711.94,-5074.72 1826,-5122 1848.14,-5131.18 1872.13,-5139.09 1895.96,-5145.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1895.22,-5149.26 1905.8,-5148.55 1897.09,-5142.51 1895.22,-5149.26"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tilted Drift",
                    tailId: "Flipping"
                }}><GroupWrapper id="4c5ab425ea999e64ad292194f7947958bbb980c8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1520.75,-4850.93C1591.86,-4800.48 1711.94,-4721.28 1826,-4674 1859.88,-4659.95 1898.12,-4648.87 1933.47,-4640.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1934.43,-4643.77 1943.36,-4638.08 1932.83,-4636.96 1934.43,-4643.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wave Dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Wave Dash",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Hel-jump", "Zap Dash"]
                }}><GroupWrapper id="b0de0622ceba25cab2e09310a3ff7d162d92d7d5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2155,-4777C2155,-4777 1956,-4777 1956,-4777 1950,-4777 1944,-4771 1944,-4765 1944,-4765 1944,-4695 1944,-4695 1944,-4689 1950,-4683 1956,-4683 1956,-4683 2155,-4683 2155,-4683 2161,-4683 2167,-4689 2167,-4695 2167,-4695 2167,-4765 2167,-4765 2167,-4771 2161,-4777 2155,-4777"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4741.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wave Dash"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4701.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wave Dash",
                    tailId: "Flipping"
                }}><GroupWrapper id="ea1de08d5e958d1b560b23ea180cf31e829563e6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.77,-4865.48C1632.63,-4842.28 1735.12,-4810.91 1826,-4786 1860.93,-4776.43 1899.07,-4766.77 1934.01,-4758.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1934.89,-4761.62 1943.78,-4755.85 1933.23,-4754.82 1934.89,-4761.62"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Forward Half Flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Forward Half Flipping",
                    description: "A back flip that is canceled when parallel with the ground. Then air roll to have the wheels hit the ground.",
                    rank: "",
                    upstreamSkills: ["Half Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="0e0242c7d3c6a2b7ad2e3915291b850782e5b202" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3343,-5224C3343,-5224 2937,-5224 2937,-5224 2931,-5224 2925,-5218 2925,-5212 2925,-5212 2925,-5142 2925,-5142 2925,-5136 2931,-5130 2937,-5130 2937,-5130 3343,-5130 3343,-5130 3349,-5130 3355,-5136 3355,-5142 3355,-5142 3355,-5212 3355,-5212 3355,-5218 3349,-5224 3343,-5224"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5188.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Forward Half Flipping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5148.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Game Awareness",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Game Awareness",
                    description: "",
                    rank: "",
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
                        d="M2212,-1427C2212,-1427 1899,-1427 1899,-1427 1893,-1427 1887,-1421 1887,-1415 1887,-1415 1887,-1345 1887,-1345 1887,-1339 1893,-1333 1899,-1333 1899,-1333 2212,-1333 2212,-1333 2218,-1333 2224,-1339 2224,-1345 2224,-1345 2224,-1415 2224,-1415 2224,-1421 2218,-1427 2212,-1427"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1391.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Game Awareness"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1351.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Advanced Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="898b4867af4ebac3edc9bf2478b3441b7e8c2219" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.12,-1399.18C2246.61,-1407.69 2267.81,-1419.55 2285,-1436 2326.16,-1475.37 2278.96,-1520.56 2321,-1559 2321.85,-1559.78 2322.72,-1560.55 2323.59,-1561.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2321.67,-1564.27 2331.61,-1567.93 2326.12,-1558.87 2321.67,-1564.27"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Back-passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="d13f3701214bb777840e3fb34cd86a1f8bd83764" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.23,-1365.81C2247.65,-1356.78 2269.1,-1343.44 2285,-1324 2347.31,-1247.82 2257,-513.76 2321,-439 2355.73,-398.43 2410.63,-381.94 2462.86,-376.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2463.28,-379.99 2472.92,-375.6 2462.65,-373.02 2463.28,-379.99"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backboard Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="1f23a919bf2d5f48bb5e4839fe8064e6d83502de" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.03,-1365.99C2247.54,-1356.94 2269.08,-1343.56 2285,-1324 2354.98,-1238.03 2249.1,-411.37 2321,-327 2343.84,-300.2 2375.48,-283.89 2409.37,-274.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2410.67,-277.62 2419.46,-271.71 2408.9,-270.85 2410.67,-277.62"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Boost Stealing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cb3916ed6895d30b621b55760369746d38aca7bf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.13,-1396.42C2247.11,-1405.24 2268.45,-1417.92 2285,-1436 2356.34,-1513.94 2247.92,-1594.68 2321,-1671 2354.63,-1706.12 2403.46,-1722.66 2451.12,-1729.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2450.9,-1733.16 2461.27,-1731.01 2451.82,-1726.22 2450.9,-1733.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Calculated Clears",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="81a6b816764e11391c2575b156285d985502b7a3" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224,-1419.9C2244.59,-1425.15 2265.31,-1430.58 2285,-1436 2301.13,-1440.44 2304.77,-1442.93 2321,-1447 2353.28,-1455.1 2387.86,-1462.77 2421.38,-1469.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2420.78,-1473.13 2431.27,-1471.71 2422.18,-1466.28 2420.78,-1473.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling Shots",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="f53ab604d5a283098ce56ea49ebbb6007105b944" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.16,-1394.25C2247.58,-1403.28 2269.05,-1416.59 2285,-1436 2341.14,-1504.32 2263.34,-2163.96 2321,-2231 2355.59,-2271.22 2410.01,-2287.74 2461.92,-2293.3"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2461.64,-2296.78 2471.92,-2294.24 2462.29,-2289.82 2461.64,-2296.78"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Cherry Picking",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="fe9217ad1e64731395a25492bccb54bc75794440" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.12,-1383.37C2294.99,-1384.79 2377.09,-1386.44 2446.79,-1387.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2446.92,-1391.34 2456.98,-1388.05 2447.06,-1384.35 2446.92,-1391.34"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Clear Prevention",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b4b3e97ec498cd1c679051ecdd4af42abf11f05b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.12,-1349.08C2289.31,-1337.05 2364.01,-1323.27 2429.81,-1311.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2430.68,-1314.53 2439.88,-1309.28 2429.41,-1307.65 2430.68,-1314.53"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Close Touch",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="940924250eaffbeaff74dc5ab0bf13b2da91a4a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.15,-1359.59C2246.44,-1351.23 2267.57,-1339.74 2285,-1324 2320.37,-1292.07 2284.92,-1254.13 2321,-1223 2362.5,-1187.19 2420.24,-1171.77 2472.75,-1165.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2473.24,-1169.31 2482.84,-1164.81 2472.53,-1162.34 2473.24,-1169.31"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Corner Pass",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="6afa524d77469b0e6cdfaff2d63f93551fdf58b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.17,-1363.24C2247.08,-1354.45 2268.38,-1341.87 2285,-1324 2350.37,-1253.68 2254.07,-1179.83 2321,-1111 2360.03,-1070.86 2418.94,-1055.1 2472.93,-1050.08"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2473.26,-1053.56 2482.94,-1049.26 2472.69,-1046.59 2473.26,-1053.56"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee Dish",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="088fc2b24cbe6784a222b09461ecf773cbb71215" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.03,-1394.35C2247.47,-1403.37 2268.98,-1416.65 2285,-1436 2381.93,-1553.07 2221.46,-2004.14 2321,-2119 2353.76,-2156.8 2404.03,-2173.63 2453.16,-2180.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2452.95,-2183.6 2463.29,-2181.29 2453.77,-2176.65 2452.95,-2183.6"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2768,-2110C2768,-2110 2442,-2110 2442,-2110 2436,-2110 2430,-2104 2430,-2098 2430,-2098 2430,-2028 2430,-2028 2430,-2022 2436,-2016 2442,-2016 2442,-2016 2768,-2016 2768,-2016 2774,-2016 2780,-2022 2780,-2028 2780,-2028 2780,-2098 2780,-2098 2780,-2104 2774,-2110 2768,-2110"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2074.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Guillotine Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2034.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ♢ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Guillotine Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="e942a4dc090779dc581af6e2d1913f319994e5be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.15,-1394.6C2247.49,-1403.6 2268.95,-1416.81 2285,-1436 2366.59,-1533.51 2237.24,-1911.35 2321,-2007 2346.44,-2036.06 2382.23,-2052.69 2419.83,-2061.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2419.43,-2065.24 2429.95,-2064 2420.95,-2058.41 2419.43,-2065.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    headId: "Infield Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="2a82335a34f1adac9e1b9fef24e2c4392c4180ea" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.23,-1364.4C2247.34,-1355.49 2268.7,-1342.57 2285,-1324 2380.87,-1214.78 2222.7,-1106.04 2321,-999 2353.74,-963.36 2402.08,-946.64 2449.58,-939.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2450.25,-943.09 2459.7,-938.3 2449.32,-936.15 2450.25,-943.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kickoff Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Kickoff Prediction",
                    description: "Reading the opponent in a 50/50 but during kickoff.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="454017229b315aff8e91fd57a09283bbe1503a61" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2767.5,-878C2767.5,-878 2442.5,-878 2442.5,-878 2436.5,-878 2430.5,-872 2430.5,-866 2430.5,-866 2430.5,-796 2430.5,-796 2430.5,-790 2436.5,-784 2442.5,-784 2442.5,-784 2767.5,-784 2767.5,-784 2773.5,-784 2779.5,-790 2779.5,-796 2779.5,-796 2779.5,-866 2779.5,-866 2779.5,-872 2773.5,-878 2767.5,-878"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-842.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Kickoff Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-802.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kickoff Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="0c6f6f79961babdc9afa0c123c1fccae65b647ca" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.11,-1365.02C2247.39,-1356.05 2268.83,-1342.95 2285,-1324 2348.24,-1249.87 2256.11,-959.69 2321,-887 2346.72,-858.19 2382.62,-841.66 2420.24,-832.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2421.35,-835.95 2430.36,-830.37 2419.84,-829.12 2421.35,-835.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2877,-766C2877,-766 2333,-766 2333,-766 2327,-766 2321,-760 2321,-754 2321,-754 2321,-684 2321,-684 2321,-678 2327,-672 2333,-672 2333,-672 2877,-672 2877,-672 2883,-672 2889,-678 2889,-684 2889,-684 2889,-754 2889,-754 2889,-760 2883,-766 2877,-766"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-730.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Opponent Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-690.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="86d86f548fb4ae64e6c33c63d7d1a638f3be6a08" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.1,-1365.36C2247.46,-1356.37 2268.92,-1343.17 2285,-1324 2363.57,-1230.33 2240.34,-866.88 2321,-775 2321.43,-774.51 2321.85,-774.03 2322.29,-773.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2325.07,-775.72 2329.52,-766.1 2320.04,-770.84 2325.07,-775.72"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Opponent Prediction",
                    description: "Understanding what the opponent will do from experience and responding beforehand.",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="0bee089080a6d9ffe1b8b7d78345b56e5641c8ea" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2793.5,-654C2793.5,-654 2416.5,-654 2416.5,-654 2410.5,-654 2404.5,-648 2404.5,-642 2404.5,-642 2404.5,-572 2404.5,-572 2404.5,-566 2410.5,-560 2416.5,-560 2416.5,-560 2793.5,-560 2793.5,-560 2799.5,-560 2805.5,-566 2805.5,-572 2805.5,-572 2805.5,-642 2805.5,-642 2805.5,-648 2799.5,-654 2793.5,-654"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-618.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Opponent Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-578.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="1a4978a5074c04537248607f066af57e7356a573" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224,-1365.62C2247.44,-1356.61 2268.96,-1343.33 2285,-1324 2378.91,-1210.77 2224.56,-774.09 2321,-663 2340.62,-640.4 2366.49,-625.3 2394.63,-615.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2395.84,-618.72 2404.26,-612.28 2393.67,-612.07 2395.84,-618.72"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Pinching",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="8dcb80bfa3d75a2c1076d34fdd33a41055424e8b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.25,-1394.17C2247.66,-1403.21 2269.11,-1416.55 2285,-1436 2348.81,-1514.1 2255.45,-2266.35 2321,-2343 2362.24,-2391.21 2431.95,-2405.43 2491.87,-2407.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.08,-2410.98 2502.16,-2407.72 2492.25,-2403.99 2492.08,-2410.98"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2224.14,-1365.73C2247.56,-1356.71 2269.04,-1343.4 2285,-1324 2339.63,-1257.6 2264.89,-616.15 2321,-551 2346.69,-521.18 2383.27,-504.38 2421.65,-495.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2422.4,-498.86 2431.44,-493.33 2420.92,-492.01 2422.4,-498.86"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Possession Prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Possession Prediction",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness", "Powershot + Powerclears"],
                    downstreamSkills: []
                }}><GroupWrapper id="8b5a1709bd001cb3cd9bee3c80300276e4531ff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2802,-1886C2802,-1886 2408,-1886 2408,-1886 2402,-1886 2396,-1880 2396,-1874 2396,-1874 2396,-1804 2396,-1804 2396,-1798 2402,-1792 2408,-1792 2408,-1792 2802,-1792 2802,-1792 2808,-1792 2814,-1798 2814,-1804 2814,-1804 2814,-1874 2814,-1874 2814,-1880 2808,-1886 2802,-1886"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1850.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Possession Prediction"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-1810.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="3f2bf2ce818de0032db4a4a2cab7c52c512cd922" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.05,-1395.39C2247.26,-1404.31 2268.7,-1417.3 2285,-1436 2386.88,-1552.88 2216.52,-1668.44 2321,-1783 2338.96,-1802.69 2361.67,-1816.61 2386.39,-1826.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2385.37,-1829.67 2395.96,-1829.83 2387.78,-1823.1 2385.37,-1829.67"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot Passing",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powershot Passing",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b5525427452488ec5fd95bc4f54bd8bf7200f501" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2775.5,-206C2775.5,-206 2434.5,-206 2434.5,-206 2428.5,-206 2422.5,-200 2422.5,-194 2422.5,-194 2422.5,-124 2422.5,-124 2422.5,-118 2428.5,-112 2434.5,-112 2434.5,-112 2775.5,-112 2775.5,-112 2781.5,-112 2787.5,-118 2787.5,-124 2787.5,-124 2787.5,-194 2787.5,-194 2787.5,-200 2781.5,-206 2775.5,-206"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-170.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powershot Passing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-130.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot Passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="42cb1d7520c96fc8ab018c2289490cd78a0a7338" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.09,-1366.04C2247.59,-1356.98 2269.11,-1343.59 2285,-1324 2362.66,-1228.25 2241.2,-308.98 2321,-215 2344.48,-187.34 2377.33,-170.85 2412.37,-161.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2413.45,-164.77 2422.31,-158.95 2411.76,-157.97 2413.45,-164.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2706,-94C2706,-94 2504,-94 2504,-94 2498,-94 2492,-88 2492,-82 2492,-82 2492,-12 2492,-12 2492,-6 2498,0 2504,0 2504,0 2706,0 2706,0 2712,0 2718,-6 2718,-12 2718,-12 2718,-82 2718,-82 2718,-88 2712,-94 2706,-94"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-58.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Shadowing"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-18.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="21204dd13f3ebc8562e7c30347a6ed2beea4a3b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.14,-1366.08C2247.64,-1357.02 2269.14,-1343.61 2285,-1324 2370.34,-1218.46 2233.31,-206.59 2321,-103 2359.69,-57.29 2423.98,-42.06 2481.51,-38.82"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2481.96,-42.3 2491.79,-38.36 2481.65,-35.31 2481.96,-42.3"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="ce96d7f23d91250787935e64e821ff1ea5fe14e0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2224.28,-1393.8C2247.77,-1402.88 2269.23,-1416.32 2285,-1436 2344.85,-1510.66 2295.18,-3065.86 2321,-3158 2369.19,-3329.98 2492.34,-3504.58 2559.19,-3590.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2556.57,-3593.12 2565.48,-3598.86 2562.09,-3588.82 2556.57,-3593.12"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Speed",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Game Speed",
                    description: "",
                    rank: "",
                    upstreamSkills: [],
                    downstreamSkills: ["Game Awareness"]
                }}><GroupWrapper id="c47f3d4df7d8556cd1bf2b526a12ce140a896a94" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1570.5,-1595C1570.5,-1595 1341.5,-1595 1341.5,-1595 1335.5,-1595 1329.5,-1589 1329.5,-1583 1329.5,-1583 1329.5,-1513 1329.5,-1513 1329.5,-1507 1335.5,-1501 1341.5,-1501 1341.5,-1501 1570.5,-1501 1570.5,-1501 1576.5,-1501 1582.5,-1507 1582.5,-1513 1582.5,-1513 1582.5,-1583 1582.5,-1583 1582.5,-1589 1576.5,-1595 1570.5,-1595"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1559.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Game Speed"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1519.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Game Speed"
                }}><GroupWrapper id="630e285f11754702182280c9673f6d7525052569" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1582.9,-1550.61C1649.29,-1546.41 1729.32,-1532.02 1790,-1492 1814.7,-1475.71 1801.92,-1453.19 1826,-1436 1841.57,-1424.89 1859.09,-1415.97 1877.33,-1408.81"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1878.78,-1412 1886.92,-1405.22 1876.33,-1405.44 1878.78,-1412"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Forward Half Flipping",
                    tailId: "Half Flipping"
                }}><GroupWrapper id="58cf82bead5a18f29d1308b165179f8006204669" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2736.73,-5177C2790.38,-5177 2854.04,-5177 2914.71,-5177"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2914.81,-5180.5 2924.81,-5177 2914.81,-5173.5 2914.81,-5180.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2727,-5674C2727,-5674 2483,-5674 2483,-5674 2477,-5674 2471,-5668 2471,-5662 2471,-5662 2471,-5592 2471,-5592 2471,-5586 2477,-5580 2483,-5580 2483,-5580 2727,-5580 2727,-5580 2733,-5580 2739,-5586 2739,-5592 2739,-5592 2739,-5662 2739,-5662 2739,-5668 2733,-5674 2727,-5674"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5638.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hood Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5598.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ ✩ ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Hood Dribble"
                }}><GroupWrapper id="77db32b2913a32a0165710dde8ce61a445cddb82" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2739.12,-5650.23C2808.18,-5662.28 2893.32,-5677.13 2967.28,-5690.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2966.71,-5693.49 2977.17,-5691.76 2967.92,-5686.6 2966.71,-5693.49"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hood To Air Dribble",
                    tailId: "Hood Dribble"
                }}><GroupWrapper id="2006738620e0ba3d9030fdc784a4f353f52b5f97" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2739.12,-5622.25C2798.51,-5620.14 2869.81,-5617.6 2935.65,-5615.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2935.88,-5618.74 2945.75,-5614.89 2935.63,-5611.75 2935.88,-5618.74"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Hood Dribble", "Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9cae66b7d691f1ffdcd0d4bd94e7a9313f8dfad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3321,-6019C3321,-6019 2959,-6019 2959,-6019 2953,-6019 2947,-6013 2947,-6007 2947,-6007 2947,-5937 2947,-5937 2947,-5931 2953,-5925 2959,-5925 2959,-5925 3321,-5925 3321,-5925 3327,-5925 3333,-5931 3333,-5937 3333,-5937 3333,-6007 3333,-6007 3333,-6013 3327,-6019 3321,-6019"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5983.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Power Slide Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5943.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Hood Dribble"
                }}><GroupWrapper id="a0e0a42ee00406d304ea812563a18cb812da0632" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2678.72,-5674.07C2777.77,-5738.18 2954.58,-5852.63 3057.85,-5919.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3056.08,-5922.5 3066.38,-5924.99 3059.88,-5916.62 3056.08,-5922.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Kuxir Pinch"],
                    downstreamSkills: []
                }}><GroupWrapper id="9d18007d3de438d638a68348f5957c2bde716b8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3333.5,-4403C3333.5,-4403 2946.5,-4403 2946.5,-4403 2940.5,-4403 2934.5,-4397 2934.5,-4391 2934.5,-4391 2934.5,-4321 2934.5,-4321 2934.5,-4315 2940.5,-4309 2946.5,-4309 2946.5,-4309 3333.5,-4309 3333.5,-4309 3339.5,-4309 3345.5,-4315 3345.5,-4321 3345.5,-4321 3345.5,-4391 3345.5,-4391 3345.5,-4397 3339.5,-4403 3333.5,-4403"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4367.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hoops - Basket Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-4327.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
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
                    rank: "",
                    upstreamSkills: ["Jumping", "Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="1a2754a90c93002ead2d7ede01cabf26a4f9e15a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1778,-2494C1778,-2494 1134,-2494 1134,-2494 1128,-2494 1122,-2488 1122,-2482 1122,-2482 1122,-2412 1122,-2412 1122,-2406 1128,-2400 1134,-2400 1134,-2400 1778,-2400 1778,-2400 1784,-2400 1790,-2406 1790,-2412 1790,-2412 1790,-2482 1790,-2482 1790,-2488 1784,-2494 1778,-2494"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2458.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Hoops - Friendship / Fusion Kickoff"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-2418.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Joystick Air Roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Joystick Air Roll",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Air Roll Shots", "Backwards Aerials", "Turtling", "Wall Pinch"]
                }}><GroupWrapper id="7847fee1262959ac96105130b062f544c664b437" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1601,-4178C1601,-4178 1311,-4178 1311,-4178 1305,-4178 1299,-4172 1299,-4166 1299,-4166 1299,-4096 1299,-4096 1299,-4090 1305,-4084 1311,-4084 1311,-4084 1601,-4084 1601,-4084 1607,-4084 1613,-4090 1613,-4096 1613,-4096 1613,-4166 1613,-4166 1613,-4172 1607,-4178 1601,-4178"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4142.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Joystick Air Roll"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4102.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Roll Shots",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="3faa8ba0b2b5cd2610310096ac41afcf6283f14e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1503.14,-4083.99C1568.63,-4020.32 1695.2,-3908.19 1826,-3852 2015.99,-3770.39 2136.82,-3920.22 2285,-3776 2345.34,-3717.27 2291.47,-3668.85 2321,-3590 2383.89,-3422.07 2501.58,-3244.73 2563.52,-3157.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2566.39,-3159.34 2569.33,-3149.16 2560.68,-3155.28 2566.39,-3159.34"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backwards Aerials",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="92cceee64adbb05fc2bea30c5f3b9e3a44f86bfe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1548.34,-4083.94C1621.86,-4047.47 1728.63,-3997.64 1826,-3964 1838.31,-3959.75 1851.09,-3955.69 1864.04,-3951.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1865.36,-3955.1 1873.97,-3948.93 1863.39,-3948.38 1865.36,-3955.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtling",
                    isUnnecessary: true,
                    isRecommended: false,
                    isSilly: true,
                    notes: [],
                    title: "Turtling",
                    description: "After a jump, turning the car upside down so that it lands on the hood of the car is turtling. Players can score a goal while doing this and get the turtle shot award.",
                    rank: "",
                    upstreamSkills: ["Joystick Air Roll"],
                    downstreamSkills: ["Turtle Dribbling", "Turtle Flick"]
                }}><GroupWrapper id="f6ef1ec4e3cdd633da3819f1cb20f1feee3902c0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2146,-4179C2146,-4179 1965,-4179 1965,-4179 1959,-4179 1953,-4173 1953,-4167 1953,-4167 1953,-4097 1953,-4097 1953,-4091 1959,-4085 1965,-4085 1965,-4085 2146,-4085 2146,-4085 2152,-4085 2158,-4091 2158,-4097 2158,-4097 2158,-4167 2158,-4167 2158,-4173 2152,-4179 2146,-4179"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4143.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-4103.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtling",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="1caf7caa7517ac1613d5f3d75bce71d12d69a92f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.21,-4131.26C1716.52,-4131.43 1849.54,-4131.66 1942.41,-4131.81"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.68,-4135.31 1952.68,-4131.83 1942.69,-4128.31 1942.68,-4135.31"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Pinch",
                    tailId: "Joystick Air Roll"
                }}><GroupWrapper id="f9ba371593d0f28e7c469a60b4300fefb65a44c4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.35,-4159.21C1669.13,-4169.39 1732.4,-4181.06 1790,-4192 1838.62,-4201.23 1892.2,-4211.71 1938.35,-4220.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1937.89,-4224.31 1948.38,-4222.81 1939.25,-4217.44 1937.89,-4224.31"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ball Camera Control",
                    tailId: "Jumping"
                }}><GroupWrapper id="f399b2a4c58561116c62feeddf52af6576cfa4ae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M882.34,-4235.06C899.84,-4361.27 960.95,-4713.94 1122,-4954 1186.42,-5050.03 1292.89,-5131.35 1368.07,-5181.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1366.34,-5184.25 1376.62,-5186.82 1370.19,-5178.4 1366.34,-5184.25"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Aerials",
                    tailId: "Jumping"
                }}><GroupWrapper id="a86d228158ce930f72b88a82a02ddb011cb04d94" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M897.5,-4140.9C936.75,-4054.69 1025.98,-3866.97 1122,-3721 1211.43,-3585.06 1336.3,-3440.23 1404.91,-3363.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1407.69,-3365.87 1411.77,-3356.1 1402.49,-3361.19 1407.69,-3365.87"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Jumping"
                }}><GroupWrapper id="29ed75b408be8185556eb730bdc5870d85da7d79" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M882.85,-4140.8C906.75,-3969.8 996.33,-3385.79 1122,-3253 1313.17,-3050.99 1643.34,-2991.73 1855.17,-2975.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1855.45,-2978.67 1865.16,-2974.42 1854.93,-2971.69 1855.45,-2978.67"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional Air Roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="b1d438970212cc2a96a493454947cb28af5b4b53" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M876.99,-4235.19C880.63,-4394.96 909.01,-4925.8 1122,-5290 1183.28,-5394.78 1293.78,-5483.03 1370.61,-5535.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1369.1,-5539.11 1379.34,-5541.85 1373.05,-5533.33 1369.1,-5539.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Double Jumping",
                    tailId: "Jumping"
                }}><GroupWrapper id="968f8634e8cf7c030c4fbb56a8841097ca9a258b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M942.86,-4140.85C1051.44,-4063.71 1266.33,-3911.04 1380.17,-3830.16"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1382.4,-3832.87 1388.52,-3824.23 1378.34,-3827.17 1382.4,-3832.87"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Flip Window",
                    tailId: "Jumping"
                }}><GroupWrapper id="b3233626c9af0cafe621b72d3021f113d64738fe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M880.08,-4235.15C897.55,-4456.71 978.85,-5394.06 1122,-5645 1178.75,-5744.49 1284.86,-5824.59 1362.09,-5873.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1360.56,-5876.6 1370.89,-5878.94 1364.27,-5870.67 1360.56,-5876.6"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Flipping",
                    tailId: "Jumping"
                }}><GroupWrapper id="96092db701ed22de4a7d19868e7adbf9d35b541e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M899.2,-4235.09C938.44,-4313.99 1024.19,-4475.92 1122,-4595 1202.14,-4692.56 1313.72,-4787.63 1385.16,-4844.52"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1383.23,-4847.45 1393.24,-4850.92 1387.58,-4841.97 1383.23,-4847.45"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hoops - Friendship / Fusion Kickoff",
                    tailId: "Jumping"
                }}><GroupWrapper id="a01934255f1b44e069e0e102a96e0c4d39354676" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M887.77,-4140.81C923.43,-3989.41 1034.51,-3501.89 1086,-3092 1094.17,-3026.94 1078.15,-2551.74 1122,-2503 1122.43,-2502.52 1122.86,-2502.05 1123.29,-2501.58"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1126.01,-2503.81 1130.52,-2494.22 1121.02,-2498.9 1126.01,-2503.81"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Joystick Air Roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="422ff7142e1a4d06294a0f4586cdf604276666b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-4177.97C1063.99,-4169.53 1188.32,-4157.28 1288.52,-4147.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1289.15,-4150.86 1298.76,-4146.39 1288.46,-4143.89 1289.15,-4150.86"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Popping",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Popping",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["45 Degree Flick", "Doinking", "Double Touches"]
                }}><GroupWrapper id="91a3270cb0d1d83b450b4ded0b087df6325a3148" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-4459C1546.5,-4459 1365.5,-4459 1365.5,-4459 1359.5,-4459 1353.5,-4453 1353.5,-4447 1353.5,-4447 1353.5,-4377 1353.5,-4377 1353.5,-4371 1359.5,-4365 1365.5,-4365 1365.5,-4365 1546.5,-4365 1546.5,-4365 1552.5,-4365 1558.5,-4371 1558.5,-4377 1558.5,-4377 1558.5,-4447 1558.5,-4447 1558.5,-4453 1552.5,-4459 1546.5,-4459"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4423.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Popping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-4383.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Popping",
                    tailId: "Jumping"
                }}><GroupWrapper id="03d1e8d95dd46376633beb1fd22529e51ff511fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-4227.4C1080.7,-4267.07 1238.26,-4328.08 1343.9,-4368.98"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1342.73,-4372.28 1353.32,-4372.63 1345.26,-4365.75 1342.73,-4372.28"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Pinch",
                    tailId: "Jumping"
                }}><GroupWrapper id="62b0f3c1b612adcd854011c733e89f7ed2958d9f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.08,-4203.65C1022.2,-4209.82 1074.54,-4216.31 1122,-4220 1415.21,-4242.82 1761.67,-4245.34 1938.29,-4244.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1938.39,-4248.38 1948.38,-4244.85 1938.37,-4241.38 1938.39,-4248.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Wall Pinch"],
                    downstreamSkills: ["Hoops - Basket Pinch"]
                }}><GroupWrapper id="ad2e1a8bd58c4efa3605297cc3d542397b198cf5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2710,-4403C2710,-4403 2500,-4403 2500,-4403 2494,-4403 2488,-4397 2488,-4391 2488,-4391 2488,-4321 2488,-4321 2488,-4315 2494,-4309 2500,-4309 2500,-4309 2710,-4309 2710,-4309 2716,-4309 2722,-4315 2722,-4321 2722,-4321 2722,-4391 2722,-4391 2722,-4397 2716,-4403 2710,-4403"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4367.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Kuxir Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4327.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Basket Pinch",
                    tailId: "Kuxir Pinch"
                }}><GroupWrapper id="3daa79d67cb2293c0e3b297efb8b5446e9006453" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2722.31,-4356C2781.43,-4356 2855.19,-4356 2924.15,-4356"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2924.29,-4359.5 2934.29,-4356 2924.29,-4352.5 2924.29,-4359.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "45 Degree Flick",
                    tailId: "Popping"
                }}><GroupWrapper id="e74d18ecc73812660d41be9ec4b40bbe0c8043e5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.68,-4406.17C1629.16,-4407.02 1722.17,-4418.33 1790,-4464 1815.8,-4481.37 1799.59,-4507.57 1826,-4524 1912.91,-4578.06 2185.53,-4537.89 2285,-4562 2740.5,-4672.41 3244.76,-4924.17 3450.86,-5033.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3449.37,-5036.31 3459.85,-5037.9 3452.65,-5030.13 3449.37,-5036.31"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doinking",
                    tailId: "Popping"
                }}><GroupWrapper id="2c4d9f9f18fcf706152e3f4ba6b7590de8a75010" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-4421.53C1665.3,-4431.52 1832.33,-4447.18 1942.61,-4457.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.48,-4461.02 1952.77,-4458.47 1943.14,-4454.05 1942.48,-4461.02"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Double Touches",
                    tailId: "Popping"
                }}><GroupWrapper id="cd35487f06fe9f9b17fdd45f6ec4995983b5be4e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-4402.47C1649.22,-4393.98 1783.31,-4381.42 1889.23,-4371.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1889.76,-4374.96 1899.39,-4370.54 1889.1,-4367.99 1889.76,-4374.96"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rotation",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Rotation",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Positioning", "Teammate Awareness"],
                    downstreamSkills: ["Game Awareness", "Self Boost Management"]
                }}><GroupWrapper id="96df7e6ae52ce92ca621526e553a7673744a55f2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1546.5,-1371C1546.5,-1371 1365.5,-1371 1365.5,-1371 1359.5,-1371 1353.5,-1365 1353.5,-1359 1353.5,-1359 1353.5,-1289 1353.5,-1289 1353.5,-1283 1359.5,-1277 1365.5,-1277 1365.5,-1277 1546.5,-1277 1546.5,-1277 1552.5,-1277 1558.5,-1283 1558.5,-1289 1558.5,-1289 1558.5,-1359 1558.5,-1359 1558.5,-1365 1552.5,-1371 1546.5,-1371"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1335.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Rotation"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1295.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Positioning"
                }}><GroupWrapper id="a427c282c94acc51433e7494a2c9cbe0a942c74c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M552.58,-1663.13C579.85,-1654.83 607.37,-1642.46 629,-1624 657.13,-1600 637.66,-1573.9 665,-1549 825.1,-1403.18 912.75,-1435.76 1122,-1380 1194.59,-1360.66 1277.95,-1346.65 1343.1,-1337.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1343.98,-1340.89 1353.4,-1336.05 1343.01,-1333.96 1343.98,-1340.89"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Positioning"
                }}><GroupWrapper id="26d39c2706f7dff1eab4875355a404b12dd1f07a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M552.71,-1668.38C581.3,-1660.14 609.45,-1646.49 629,-1624 699.2,-1543.27 610.84,-1478.26 665,-1386 1136.38,-583.1 1473.65,-488.8 2321,-103 2371.1,-80.19 2430.36,-66.64 2481.67,-58.61"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2482.45,-62.03 2491.82,-57.07 2481.4,-55.11 2482.45,-62.03"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Teammate Awareness",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Teammate Awareness",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Positioning"],

                    downstreamSkills: [
                        "Game Awareness",
                        "Hoops - Friendship / Fusion Kickoff",
                        "Rotation",
                        "Team Pinch"
                    ]
                }}><GroupWrapper id="783469932a61ca943eee27536e95aa94b4fbef7e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1074,-1652C1074,-1652 677,-1652 677,-1652 671,-1652 665,-1646 665,-1640 665,-1640 665,-1570 665,-1570 665,-1564 671,-1558 677,-1558 677,-1558 1074,-1558 1074,-1558 1080,-1558 1086,-1564 1086,-1570 1086,-1570 1086,-1640 1086,-1640 1086,-1646 1080,-1652 1074,-1652"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-1616.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Teammate Awareness"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-1576.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Teammate Awareness",
                    tailId: "Positioning"
                }}><GroupWrapper id="a9a17bcbe95848ce2fbe64466fe7579b0df9f2dd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M552.64,-1660.69C584.05,-1655.25 619.35,-1649.14 654.76,-1643.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="655.49,-1646.44 664.75,-1641.29 654.3,-1639.55 655.49,-1646.44"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Driving",
                    isUnnecessary: false,
                    isRecommended: true,
                    isSilly: false,
                    notes: [],
                    title: "Wall Driving",
                    description: "Keeping the car pointed within 90 degrees of 'straight up' for better wall control",
                    rank: "",
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
                        d="M2167,-1539C2167,-1539 1944,-1539 1944,-1539 1938,-1539 1932,-1533 1932,-1527 1932,-1527 1932,-1457 1932,-1457 1932,-1451 1938,-1445 1944,-1445 1944,-1445 2167,-1445 2167,-1445 2173,-1445 2179,-1451 2179,-1457 2179,-1457 2179,-1527 2179,-1527 2179,-1533 2173,-1539 2167,-1539"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1503.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Driving"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1463.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Driving",
                    tailId: "Positioning"
                }}><GroupWrapper id="651dda6aa2f10ca0cd7d11fa1ee2c9ba68298667" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M552.78,-1713.93C799.91,-1781.72 1401.5,-1906.29 1790,-1647 1822.77,-1625.13 1796.72,-1592.36 1826,-1566 1852.91,-1541.78 1887.86,-1525.47 1922.29,-1514.5"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1923.44,-1517.81 1931.98,-1511.54 1921.4,-1511.11 1923.44,-1517.81"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6e12ddd82ba76fbdfd2f127c4d354e7597f33141" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.13,-2340.51C1734.23,-2350.83 1765.26,-2366.83 1790,-2391 1850.55,-2450.14 1767.67,-2516.67 1826,-2578 1840.76,-2593.52 1859.07,-2605.03 1878.84,-2613.53"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1877.75,-2616.86 1888.34,-2617.34 1880.36,-2610.37 1877.75,-2616.86"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Roll Shots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5e6e71ec689305bb7b577ade176bf3b240b5a8a7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.21,-2324.22C1930.19,-2316.71 2243.48,-2314.16 2285,-2354 2374.98,-2440.34 2258.57,-2806.05 2321,-2914 2356.11,-2974.71 2419.65,-3019.58 2477.64,-3050.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2476.03,-3053.34 2486.52,-3054.84 2479.26,-3047.12 2476.03,-3053.34"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5393ce41d9044769cb75e995ed926cb6df79f6b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.32,-2337.12C1735.02,-2347.74 1766.18,-2364.72 1790,-2391 1868.25,-2477.31 1750.99,-2824.87 1826,-2914 1834.75,-2924.4 1845.08,-2933.04 1856.44,-2940.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1854.92,-2943.37 1865.32,-2945.4 1858.46,-2937.33 1854.92,-2943.37"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Guillotine Passing",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="a30ea156efad5b878d52a671b68c8481cb0abb11" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1520.77,-2287.91C1591.41,-2238.54 1710.64,-2163.34 1826,-2128 1853.98,-2119.43 2198.35,-2092.83 2419.45,-2076.44"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2419.84,-2079.92 2429.56,-2075.69 2419.32,-2072.94 2419.84,-2079.92"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="801627f5997fc9b6df68fbbcd96e5454f49ae0d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1507.46,-2287.8C1574.39,-2228.45 1698.96,-2129.03 1826,-2085 1922.62,-2051.51 2207.35,-2118.55 2285,-2052 2339.36,-2005.41 2269.62,-1944.85 2321,-1895 2339.48,-1877.06 2361.96,-1864.07 2386.08,-1854.77"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2387.56,-1857.95 2395.77,-1851.25 2385.17,-1851.37 2387.56,-1857.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    upstreamSkills: ["Powershot + Powerclears", "Prediction", "Wall Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="b92bb096f87c33e3f2fe965b18a4ebdd7374756c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2708,-2670C2708,-2670 2502,-2670 2502,-2670 2496,-2670 2490,-2664 2490,-2658 2490,-2658 2490,-2588 2490,-2588 2490,-2582 2496,-2576 2502,-2576 2502,-2576 2708,-2576 2708,-2576 2714,-2576 2720,-2582 2720,-2588 2720,-2588 2720,-2658 2720,-2658 2720,-2664 2714,-2670 2708,-2670"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2634.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Wall Clears"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-2594.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="c9f4387c8905c55860eef274e62c9c20ac39b475" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1701.05,-2296.36C1913.56,-2268.74 2200.5,-2247.96 2285,-2321 2368.6,-2393.26 2244.85,-2486.94 2321,-2567 2361.3,-2609.37 2423.69,-2624.74 2479.65,-2628.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2479.45,-2632.42 2489.66,-2629.56 2479.9,-2625.43 2479.45,-2632.42"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Recovery",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Powerslide Recovery",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="ccfc412c31f61c5e442aacee30a71f358100b194" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1064,-6235C1064,-6235 687,-6235 687,-6235 681,-6235 675,-6229 675,-6223 675,-6223 675,-6153 675,-6153 675,-6147 681,-6141 687,-6141 687,-6141 1064,-6141 1064,-6141 1070,-6141 1076,-6147 1076,-6153 1076,-6153 1076,-6223 1076,-6223 1076,-6229 1070,-6235 1064,-6235"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-6199.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Powerslide Recovery"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="875.5"
                        y="-6159.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="133cd91cdf62e0d7e8a17dd618fc9ff8ba494556" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M629.29,-6113C832.88,-6113 1166.95,-6113 1455,-6113 1455,-6113 1455,-6113 2056.5,-6113 2365.64,-6113 2720.32,-6055.75 2936.99,-6014.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2937.73,-6017.64 2946.88,-6012.31 2936.4,-6010.76 2937.73,-6017.64"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powerslide Recovery",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="8eff5a91b6778636663f84b79a0efabc32d0103b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M629.25,-6145.57C641.03,-6147.61 652.93,-6149.67 664.79,-6151.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="664.3,-6155.19 674.75,-6153.44 665.5,-6148.29 664.3,-6155.19"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2168.5,-2231C2168.5,-2231 1942.5,-2231 1942.5,-2231 1936.5,-2231 1930.5,-2225 1930.5,-2219 1930.5,-2219 1930.5,-2149 1930.5,-2149 1930.5,-2143 1936.5,-2137 1942.5,-2137 1942.5,-2137 2168.5,-2137 2168.5,-2137 2174.5,-2137 2180.5,-2143 2180.5,-2149 2180.5,-2149 2180.5,-2219 2180.5,-2219 2180.5,-2225 2174.5,-2231 2168.5,-2231"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2195.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Pre-Jumping"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-2155.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Dunking",
                    tailId: "Pre-Jumping"
                }}><GroupWrapper id="624eb4431d3a01fbcda01962bb9606910f24d20b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2180.69,-2189.75C2219.66,-2197.95 2259.19,-2214.13 2285,-2245 2347.07,-2319.25 2256.53,-2606.83 2321,-2679 2363.11,-2726.14 2432.47,-2740.41 2491.99,-2742.76"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.12,-2746.27 2502.21,-2743.06 2492.32,-2739.27 2492.12,-2746.27"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Dribbling",
                    tailId: "Prediction"
                }}><GroupWrapper id="25ff9284b2b2c916982fddd803465d072ce906ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1501.18,-1987.18C1566.05,-2053.62 1693.77,-2173.99 1826,-2240 2014.06,-2333.89 2153.32,-2190.16 2285,-2354 2378.87,-2470.78 2231.71,-3581.68 2321,-3702 2346.21,-3735.97 2384.15,-3757.83 2424.13,-3771.85"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2423.18,-3775.22 2433.78,-3775.07 2425.4,-3768.58 2423.18,-3775.22"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Catching",
                    tailId: "Prediction"
                }}><GroupWrapper id="02d351bfa707895de9cc91d3f16b92318244efa6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1511.38,-1892.91C1580.22,-1835.56 1704.56,-1739.38 1826,-1683 1862.58,-1666.02 1904.73,-1653.09 1942.79,-1643.6"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1944,-1646.91 1952.88,-1641.14 1942.34,-1640.11 1944,-1646.91"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Cutting",
                    tailId: "Prediction"
                }}><GroupWrapper id="7a0bd30db6e0621af48c9cc65ab6295c941fb508" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.08,-1949.75C1667.75,-1959.75 1833.07,-1975.25 1942.53,-1985.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.33,-1989 1952.61,-1986.45 1942.98,-1982.03 1942.33,-1989"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Faking",
                    tailId: "Prediction"
                }}><GroupWrapper id="9cb42e435c1a2484a1d90b27ada123b31d29ed07" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.08,-1930.25C1667.75,-1920.25 1833.07,-1904.75 1942.53,-1894.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1942.98,-1897.97 1952.61,-1893.55 1942.33,-1891 1942.98,-1897.97"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Prediction"
                }}><GroupWrapper id="2fbce5d5cb08c9e3b5b28c5b2e122d00c7b59e01" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1532.87,-1893C1610.59,-1840.58 1728.47,-1748.34 1790,-1637 1833.9,-1557.57 1763.88,-1502.17 1826,-1436 1840.42,-1420.64 1858.31,-1409.2 1877.67,-1400.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1879.05,-1403.93 1886.98,-1396.9 1876.4,-1397.45 1879.05,-1403.93"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Pre-Jumping",
                    tailId: "Prediction"
                }}><GroupWrapper id="d4e13a0daae87bc7082db04fd54cc27db9a4a959" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.08,-1982.5C1663.74,-2024.43 1820.73,-2088.53 1929.96,-2133.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1928.8,-2136.45 1939.38,-2136.99 1931.45,-2129.97 1928.8,-2136.45"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound Shots",
                    tailId: "Prediction"
                }}><GroupWrapper id="ff7e355a49be49c6d7fbe66453221f9721048775" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1503.09,-1987.03C1570.54,-2054.56 1701.67,-2180.98 1826,-2273 1867.57,-2303.76 1916.41,-2333.78 1958.24,-2357.85"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1956.64,-2360.96 1967.05,-2362.89 1960.11,-2354.88 1956.64,-2360.96"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2146,-1819C2146,-1819 1965,-1819 1965,-1819 1959,-1819 1953,-1813 1953,-1807 1953,-1807 1953,-1737 1953,-1737 1953,-1731 1959,-1725 1965,-1725 1965,-1725 2146,-1725 2146,-1725 2152,-1725 2158,-1731 2158,-1737 2158,-1737 2158,-1807 2158,-1807 2158,-1813 2152,-1819 2146,-1819"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1783.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Softblock"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1743.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Softblock",
                    tailId: "Prediction"
                }}><GroupWrapper id="6653f1c7ab683566a092a4bb4dd44dbc5b5e38d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561.14,-1906.74C1634.81,-1883.61 1736.09,-1852.64 1826,-1828 1863.97,-1817.59 1905.74,-1807.08 1943.06,-1798.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1944.06,-1801.39 1952.96,-1795.63 1942.42,-1794.58 1944.06,-1801.39"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Prediction"
                }}><GroupWrapper id="6bc6bf6f6cd4304d059809f4565e825bab3d5f13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1512.41,-1892.77C1580.85,-1837.84 1703.31,-1750.32 1826,-1716 1875.11,-1702.26 2248.18,-1680.71 2285,-1716 2353.32,-1781.49 2259.39,-2495.16 2321,-2567 2359.52,-2611.92 2422.77,-2627.31 2479.72,-2630.85"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2479.73,-2634.35 2489.9,-2631.36 2480.09,-2627.36 2479.73,-2634.35"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Dribbling",
                    tailId: "Push Dribbling"
                }}><GroupWrapper id="5032be6e6cb9c81c8a5c4fe3602528ac5f7c09be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.56,-5394.93C2234.9,-5386.29 2264.65,-5371.3 2285,-5346 2337.03,-5281.3 2267.53,-3915.51 2321,-3852 2346.95,-3821.18 2384.52,-3804.2 2423.86,-3795.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2424.81,-3798.79 2433.9,-3793.34 2423.4,-3791.93 2424.81,-3798.79"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hood Dribble",
                    tailId: "Push Dribbling"
                }}><GroupWrapper id="ad3c6bee2936cf4eef999e38aad5ed0c3494bb67" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.79,-5425.24C2231.86,-5433.18 2260.18,-5443.8 2285,-5458 2304.91,-5469.39 2302.3,-5481.71 2321,-5495 2366.05,-5527.01 2420.09,-5554.45 2468.82,-5575.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2467.6,-5579.18 2478.17,-5579.97 2470.4,-5572.77 2467.6,-5579.18"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Turtle Dribbling",
                    description: "A type of push dribble, where the player is turtling while dribbling.",
                    rank: "",
                    upstreamSkills: ["Push Dribbling", "Turtling"],
                    downstreamSkills: ["Turtle To Air Dribble"]
                }}><GroupWrapper id="0a0ec5499fd29060e4849605f069cc89d07aebab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2751.5,-5336C2751.5,-5336 2458.5,-5336 2458.5,-5336 2452.5,-5336 2446.5,-5330 2446.5,-5324 2446.5,-5324 2446.5,-5254 2446.5,-5254 2446.5,-5248 2452.5,-5242 2458.5,-5242 2458.5,-5242 2751.5,-5242 2751.5,-5242 2757.5,-5242 2763.5,-5248 2763.5,-5254 2763.5,-5254 2763.5,-5324 2763.5,-5324 2763.5,-5330 2757.5,-5336 2751.5,-5336"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5300.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle Dribbling"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-5260.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Push Dribbling"
                }}><GroupWrapper id="354cac540e959cdf39d2fc3bcfc6617355463040" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2203.58,-5371.64C2275.27,-5356.85 2361.83,-5338.98 2436.1,-5323.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2436.94,-5327.05 2446.02,-5321.6 2435.52,-5320.2 2436.94,-5327.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound Shots",
                    tailId: "Redirects"
                }}><GroupWrapper id="2d054f86d7010b7725e9d5e93f662ede705607f8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.73,-2558.19C1627.51,-2553.85 1718.48,-2540.5 1790,-2503 1810.32,-2492.35 1806.09,-2477.39 1826,-2466 1847.52,-2453.69 1871.67,-2444.07 1896.01,-2436.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1897.12,-2439.87 1905.71,-2433.67 1895.12,-2433.16 1897.12,-2439.87"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Rotation"
                }}><GroupWrapper id="2179051b6b220f67738b5881612b5c4bd33724ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-1333.53C1645.75,-1341.69 1773.1,-1353.63 1876.93,-1363.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1876.62,-1366.84 1886.9,-1364.29 1877.27,-1359.87 1876.62,-1366.84"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Self Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Self Boost Management",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Rotation"],
                    downstreamSkills: []
                }}><GroupWrapper id="e6eb7a78d9abbbc4245ab4f3ab258b6f827e13ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2273,-1315C2273,-1315 1838,-1315 1838,-1315 1832,-1315 1826,-1309 1826,-1303 1826,-1303 1826,-1233 1826,-1233 1826,-1227 1832,-1221 1838,-1221 1838,-1221 2273,-1221 2273,-1221 2279,-1221 2285,-1227 2285,-1233 2285,-1233 2285,-1303 2285,-1303 2285,-1309 2279,-1315 2273,-1315"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1279.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Self Boost Management"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2055.5"
                        y="-1239.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Self Boost Management",
                    tailId: "Rotation"
                }}><GroupWrapper id="73746e89f85b52d1f9d9a4f84871bea6859d5c75" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1558.7,-1314.47C1629.26,-1307.86 1726.29,-1298.76 1815.81,-1290.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1816.22,-1293.85 1825.85,-1289.43 1815.57,-1286.88 1816.22,-1293.85"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Spin",
                    tailId: "Sideways Aerials"
                }}><GroupWrapper id="49cf82c78a11e72225cda600bb6ecd4e3a259e81" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3177.34,-3356.05C3252.29,-3453.09 3423.7,-3675.01 3503.79,-3778.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3501.21,-3781.09 3510.09,-3786.86 3506.75,-3776.81 3501.21,-3781.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Zap Dash",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Zap Dash",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Speed Flipping", "Wave Dash"],
                    downstreamSkills: []
                }}><GroupWrapper id="4ca3378acf86cb1801e818134952d679d60822ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2695.5,-4944C2695.5,-4944 2514.5,-4944 2514.5,-4944 2508.5,-4944 2502.5,-4938 2502.5,-4932 2502.5,-4932 2502.5,-4862 2502.5,-4862 2502.5,-4856 2508.5,-4850 2514.5,-4850 2514.5,-4850 2695.5,-4850 2695.5,-4850 2701.5,-4850 2707.5,-4856 2707.5,-4862 2707.5,-4862 2707.5,-4932 2707.5,-4932 2707.5,-4938 2701.5,-4944 2695.5,-4944"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4908.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Zap Dash"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4868.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Zap Dash",
                    tailId: "Speed Flipping"
                }}><GroupWrapper id="8acdfdb46f728e1dfbeb77620b83a957e28b0930" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2205.21,-5150.13C2232.37,-5142.65 2260,-5133.38 2285,-5122 2382.69,-5077.51 2481.61,-5001.95 2542.84,-4950.79"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2545.46,-4953.16 2550.86,-4944.05 2540.95,-4947.8 2545.46,-4953.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Team Pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    isSilly: false,
                    notes: [],
                    title: "Team Pinch",
                    description: "",
                    rank: "",
                    upstreamSkills: ["Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="8f697b059b55b86443c0ced770e229f731238d1c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1561,-1483C1561,-1483 1351,-1483 1351,-1483 1345,-1483 1339,-1477 1339,-1471 1339,-1471 1339,-1401 1339,-1401 1339,-1395 1345,-1389 1351,-1389 1351,-1389 1561,-1389 1561,-1389 1567,-1389 1573,-1395 1573,-1401 1573,-1401 1573,-1471 1573,-1471 1573,-1477 1567,-1483 1561,-1483"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1447.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Team Pinch"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="1456"
                        y="-1407.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="6fa49c5829505d35fa1ab40353a79027f811101a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1086.26,-1634.07C1322.17,-1661.82 1685.98,-1688.18 1790,-1604 1849.36,-1555.96 1772.8,-1490.78 1826,-1436 1840.49,-1421.08 1858.25,-1409.88 1877.42,-1401.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1879,-1404.65 1886.93,-1397.63 1876.35,-1398.17 1879,-1404.65"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hoops - Friendship / Fusion Kickoff",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="12b5e0801706ea052e23a9ccb49475fb8629249b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M875.52,-1652.4C875.45,-1790.21 895.5,-2193.41 1122,-2391 1122.99,-2391.87 1124,-2392.72 1125.01,-2393.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1122.9,-2396.36 1132.91,-2399.84 1127.25,-2390.88 1122.9,-2396.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="e28ebf8d1f01dc0e418be90fdb1bf793bea2d8fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M942.83,-1557.74C986.19,-1525.11 1042.6,-1479.24 1086,-1432 1105.02,-1411.3 1098.27,-1395.07 1122,-1380 1187.54,-1338.36 1274.4,-1324.82 1342.98,-1321.45"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1343.55,-1324.93 1353.39,-1321.01 1343.25,-1317.93 1343.55,-1324.93"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Team Pinch",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="c2a493797bd635bfb8386a44e3977079c536da5e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M963.76,-1557.96C1009.69,-1534.99 1067.63,-1508.76 1122,-1492 1188.87,-1471.39 1265.78,-1457.82 1328.83,-1449.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1329.37,-1452.67 1338.82,-1447.87 1328.44,-1445.73 1329.37,-1452.67"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Tornado Spin"
                }}><GroupWrapper id="db180d78160b9ed6066926b0f3827e2169d93e6d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3680.63,-3848.49C3757.53,-3856.93 3854.04,-3867.52 3930.35,-3875.89"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3930.18,-3879.39 3940.5,-3877 3930.94,-3872.43 3930.18,-3879.39"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Tornado Spin"
                }}><GroupWrapper id="f656724a7469b151dfe53f45b08d3698dcee3871" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3680.63,-3817.18C3733.69,-3810.42 3796.09,-3802.48 3854.74,-3795.01"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="3855.4,-3798.45 3864.88,-3793.72 3854.52,-3791.51 3855.4,-3798.45"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Turning"
                }}><GroupWrapper id="04363ac6b640dc5c3d688ce5a59f51e53ce1b738" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.29,-2557.15C1022.22,-2575.72 1074.36,-2597.12 1122,-2615 1185.83,-2638.96 1257.4,-2663.35 1317.78,-2683.22"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1316.78,-2686.58 1327.37,-2686.37 1318.96,-2679.93 1316.78,-2686.58"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Turning"
                }}><GroupWrapper id="65d524634dc012c0ec9b26a6896ba3cfa8d7d463" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M956.07,-2465.96C1002.92,-2440.19 1064.17,-2409.77 1122,-2391 1147.2,-2382.82 1173.89,-2375.78 1200.74,-2369.74"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1201.63,-2373.12 1210.64,-2367.55 1200.12,-2366.29 1201.63,-2373.12"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Turning"
                }}><GroupWrapper id="86d5ea5067f613df951463cdbd4fa42a98441d9e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M978.26,-2521.09C1080.49,-2529.22 1237.63,-2541.72 1343.26,-2550.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1343.08,-2553.61 1353.32,-2550.91 1343.63,-2546.63 1343.08,-2553.61"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                    rank: "",
                    upstreamSkills: ["Turtle Dribbling", "Wall Air Dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="f51bb7bb52d9283b236b3499c07ee06d5a200995" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M3328.5,-5411C3328.5,-5411 2951.5,-5411 2951.5,-5411 2945.5,-5411 2939.5,-5405 2939.5,-5399 2939.5,-5399 2939.5,-5329 2939.5,-5329 2939.5,-5323 2945.5,-5317 2951.5,-5317 2951.5,-5317 3328.5,-5317 3328.5,-5317 3334.5,-5317 3340.5,-5323 3340.5,-5329 3340.5,-5329 3340.5,-5399 3340.5,-5399 3340.5,-5405 3334.5,-5411 3328.5,-5411"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5375.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle To Air Dribble"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="3140"
                        y="-5335.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle To Air Dribble",
                    tailId: "Turtle Dribbling"
                }}><GroupWrapper id="f325ae0c3b0270856649b6db112eca842a499910" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2763.75,-5311.2C2815.73,-5318.51 2874.38,-5326.76 2929.59,-5334.53"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2929.1,-5338 2939.49,-5335.93 2930.08,-5331.07 2929.1,-5338"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M2710,-4291C2710,-4291 2500,-4291 2500,-4291 2494,-4291 2488,-4285 2488,-4279 2488,-4279 2488,-4209 2488,-4209 2488,-4203 2494,-4197 2500,-4197 2500,-4197 2710,-4197 2710,-4197 2716,-4197 2722,-4203 2722,-4209 2722,-4209 2722,-4279 2722,-4279 2722,-4285 2716,-4291 2710,-4291"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4255.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"Turtle Flick"}</TextWrapper><TextWrapper
                        textAnchor="middle"
                        x="2605"
                        y="-4215.2"
                        fontFamily="Times,serif"
                        fontSize="36.00">{"_✓ • ! ¿¡ x"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Turtling"
                }}><GroupWrapper id="c9e95ffab6a02abd861459b79c033ee19ec33712" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.2,-4130.73C2204.11,-4135.9 2254.73,-4150.76 2285,-4188 2358.27,-4278.16 2245.72,-5144.51 2321,-5233 2349.81,-5266.87 2392.68,-5283.98 2436.39,-5291.89"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2435.88,-5295.35 2446.31,-5293.52 2437.02,-5288.44 2435.88,-5295.35"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle Flick",
                    tailId: "Turtling"
                }}><GroupWrapper id="af34872fb0c9c299694b3c45d92970eb48888303" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2158.17,-4153.86C2207.33,-4164.34 2267.2,-4176.98 2321,-4188 2372.3,-4198.51 2428.9,-4209.77 2477.91,-4219.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2477.44,-4222.9 2487.93,-4221.39 2478.79,-4216.03 2477.44,-4222.9"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle To Air Dribble",
                    tailId: "Wall Air Dribble"
                }}><GroupWrapper id="c5cdc3690521f3eb089f3d6c6f310e0d7296f1b6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2762.32,-5417C2814.62,-5409.64 2873.8,-5401.32 2929.49,-5393.48"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2930.07,-5396.93 2939.48,-5392.07 2929.09,-5390 2930.07,-5396.93"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling Shots",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="b526eb787420a90d5e9064d57cb6771ec8a2d3e4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2179.01,-1504.05C2218.94,-1514.34 2259.51,-1532.87 2285,-1566 2375.25,-1683.29 2224,-2119.23 2321,-2231 2355.69,-2270.98 2409.98,-2287.49 2461.76,-2293.1"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2461.45,-2296.59 2471.74,-2294.05 2462.11,-2289.62 2461.45,-2296.59"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling Shuffle",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="513360333e08802f82692a009e06831324cc2f93" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2179.21,-1505.16C2218.66,-1515.57 2258.87,-1533.91 2285,-1566 2377.87,-1680.07 2221.58,-1786.59 2321,-1895 2353.55,-1930.49 2401.58,-1947.22 2448.86,-1954.28"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2448.56,-1957.77 2458.94,-1955.64 2449.5,-1950.83 2448.56,-1957.77"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee Dish",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="646243164902550e338f7d6f297985e621094eab" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2179.11,-1504.29C2218.92,-1514.6 2259.39,-1533.09 2285,-1566 2360.63,-1663.19 2239.78,-2026.43 2321,-2119 2353.91,-2156.51 2404.07,-2173.3 2453.07,-2179.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2452.83,-2183.32 2463.18,-2181.03 2453.66,-2176.37 2452.83,-2183.32"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Catch",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="486f1255898ee3ebeca05042837d42dd0f36476a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2179.26,-1503.86C2219.21,-1514.13 2259.73,-1532.7 2285,-1566 2344.75,-1644.76 2256.71,-2379.9 2321,-2455 2360.72,-2501.4 2426.81,-2516.3 2485.14,-2519.18"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2485.05,-2522.68 2495.18,-2519.57 2485.32,-2515.69 2485.05,-2522.68"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="15ff7ec5d2b6bede189461464370309e803249f3" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2179.05,-1503.72C2219.1,-1513.97 2259.75,-1532.56 2285,-1566 2352.07,-1654.82 2248.82,-2482.29 2321,-2567 2359.38,-2612.04 2422.62,-2627.44 2479.59,-2630.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2479.62,-2634.46 2489.78,-2631.46 2479.97,-2627.47 2479.62,-2634.46"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Driving",
                    tailId: "Wall Driving"
                }}><GroupWrapper id="08bd1bee76e24c25c70e36a826825fcfb0d504d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1955.52,-1539.04C1964.91,-1549.43 1998.24,-1557 2055.5,-1557 2101.58,-1557 2132.16,-1552.1 2147.24,-1544.77"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2149.27,-1547.62 2155.48,-1539.04 2145.28,-1541.87 2149.27,-1547.62"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Kuxir Pinch",
                    tailId: "Wall Pinch"
                }}><GroupWrapper id="0928735b8a9b8fc402a38262b267aac6668bebec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2162.61,-4266.8C2210.9,-4277.09 2268.81,-4289.31 2321,-4300 2372.3,-4310.51 2428.9,-4321.77 2477.91,-4331.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2477.44,-4334.9 2487.93,-4333.39 2478.79,-4328.03 2477.44,-4334.9"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Wave Dash"
                }}><GroupWrapper id="03a801af447fa3c13f265187617f822427a2d5c9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2167.06,-4729.89C2210.38,-4723.78 2256.45,-4708.56 2285,-4674 2385.63,-4552.21 2217.66,-4083.49 2321,-3964 2362.5,-3916.01 2432.22,-3901.8 2492.07,-3899.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2492.44,-3903.19 2502.35,-3899.45 2492.27,-3896.19 2492.44,-3903.19"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Zap Dash",
                    tailId: "Wave Dash"
                }}><GroupWrapper id="18688f80dba52db670f7c3496a5b987b80afceae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M2167.19,-4754.9C2204.79,-4763.95 2246.91,-4774.73 2285,-4786 2354.79,-4806.64 2431.89,-4833.36 2492.8,-4855.41"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="2491.84,-4858.78 2502.44,-4858.91 2494.23,-4852.2 2491.84,-4858.78"></PolygonWrapper></GroupWrapper></Prerequisite></GroupWrapper></></SvgWrapper>)})