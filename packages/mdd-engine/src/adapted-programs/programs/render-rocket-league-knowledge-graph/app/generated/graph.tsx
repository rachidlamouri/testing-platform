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
    viewBox="0.00 0.00 1939.00 2840.00"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}><><GroupWrapper
            id="1adafe6db7788063f4117ab4c77b6c55bc78bcab"
            className="graph"
            transform="scale(1 1) rotate(0) translate(4 2836)"><PolygonWrapper
                fill="white"
                stroke="transparent"
                points="-4,4 -4,-2836 1935,-2836 1935,4 -4,4"></PolygonWrapper><Skill
                {...{
                    id: "Jumping",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Preform by pressing the button for jumping in the controls panel.",
                        "Has in-game tutorial.",
                        {
                            text: "Done by Video Games Source on Youtube.",
                            url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                        }
                    ],

                    title: "Jumping",
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
                        d="M409.5,-1877C409.5,-1877 357.5,-1877 357.5,-1877 351.5,-1877 345.5,-1871 345.5,-1865 345.5,-1865 345.5,-1853 345.5,-1853 345.5,-1847 351.5,-1841 357.5,-1841 357.5,-1841 409.5,-1841 409.5,-1841 415.5,-1841 421.5,-1847 421.5,-1853 421.5,-1853 421.5,-1865 421.5,-1865 421.5,-1871 415.5,-1877 409.5,-1877"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-1855.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Jumping"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Double Jumping",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: ["Pressing the button for jump in the control panel.", {
                        text: "Done by Video Games Source on Youtube.",
                        url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                    }],

                    title: "Double Jumping",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Double jump aerials", "Fast aerials", "Spring Roll"]
                }}><GroupWrapper id="03c645b9ea53657cc27a20182e7610dcc89b94ee" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693,-1627C693,-1627 586,-1627 586,-1627 580,-1627 574,-1621 574,-1615 574,-1615 574,-1603 574,-1603 574,-1597 580,-1591 586,-1591 586,-1591 693,-1591 693,-1591 699,-1591 705,-1597 705,-1603 705,-1603 705,-1615 705,-1615 705,-1621 699,-1627 693,-1627"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1605.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Double Jumping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double Jumping",
                    tailId: "Jumping"
                }}><GroupWrapper id="968f8634e8cf7c030c4fbb56a8841097ca9a258b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M403.18,-1840.62C447.96,-1796.53 561.55,-1684.74 612.76,-1634.33"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="615.47,-1636.58 620.14,-1627.07 610.56,-1631.59 615.47,-1636.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flipping",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Pressing the action for jump in the air, while turning the car.",
                        "Has in-game tutorial.",
                        {
                            text: "Done by Video Games Source on Youtube.",
                            url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                        }
                    ],

                    title: "Flipping",
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
                        d="M665.5,-2377C665.5,-2377 613.5,-2377 613.5,-2377 607.5,-2377 601.5,-2371 601.5,-2365 601.5,-2365 601.5,-2353 601.5,-2353 601.5,-2347 607.5,-2341 613.5,-2341 613.5,-2341 665.5,-2341 665.5,-2341 671.5,-2341 677.5,-2347 677.5,-2353 677.5,-2353 677.5,-2365 677.5,-2365 677.5,-2371 671.5,-2377 665.5,-2377"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2355.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flipping",
                    tailId: "Jumping"
                }}><GroupWrapper id="96092db701ed22de4a7d19868e7adbf9d35b541e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M388.12,-1877.29C399.34,-1931.3 437.05,-2093.67 506,-2211 534.55,-2259.58 580.63,-2306.44 610.24,-2333.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="608.02,-2336.7 617.76,-2340.89 612.76,-2331.55 608.02,-2336.7"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce Powershots",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "While the ball is boucing, powershot the ball after it bounces back off of the ground.",
                        {
                            text: "Dignitas’s Power shot guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                        }
                    ],

                    title: "Bounce Powershots",
                    upstreamSkills: ["Jumping", "Powershot + Powerclears"],
                    downstreamSkills: ["Air roll shots"]
                }}><GroupWrapper id="b209979857f96555ea66ffe9ffcb87645ccec92f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M969,-1220C969,-1220 837,-1220 837,-1220 831,-1220 825,-1214 825,-1208 825,-1208 825,-1196 825,-1196 825,-1190 831,-1184 837,-1184 837,-1184 969,-1184 969,-1184 975,-1184 981,-1190 981,-1196 981,-1196 981,-1208 981,-1208 981,-1214 975,-1220 969,-1220"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1198.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bounce Powershots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Jumping"
                }}><GroupWrapper id="29ed75b408be8185556eb730bdc5870d85da7d79" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M387.59,-1840.94C400.14,-1769.55 449.3,-1508.03 506,-1449 592.84,-1358.58 686.88,-1449.11 773,-1358 813.89,-1314.74 767.13,-1271.31 809,-1229 811.16,-1226.82 813.49,-1224.81 815.95,-1222.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="818.26,-1225.63 824.76,-1217.27 814.46,-1219.75 818.26,-1225.63"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M708.5,-2754C708.5,-2754 570.5,-2754 570.5,-2754 564.5,-2754 558.5,-2748 558.5,-2742 558.5,-2742 558.5,-2730 558.5,-2730 558.5,-2724 564.5,-2718 570.5,-2718 570.5,-2718 708.5,-2718 708.5,-2718 714.5,-2718 720.5,-2724 720.5,-2730 720.5,-2730 720.5,-2742 720.5,-2742 720.5,-2748 714.5,-2754 708.5,-2754"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2732.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Ball Camera Control"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ball camera control",
                    tailId: "Jumping"
                }}><GroupWrapper id="e4eb51790b6963ed4042ffcc42eab1a183e247c5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M388.33,-1877.09C401.36,-1939.11 444.54,-2148.95 470,-2324 480.78,-2398.09 465.24,-2596.2 506,-2659 522.06,-2683.75 549.07,-2701.5 574.52,-2713.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="573.26,-2716.95 583.81,-2717.92 576.16,-2710.58 573.26,-2716.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Joystick air roll",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: [],
                    title: "Joystick air roll",
                    upstreamSkills: ["Jumping"],
                    downstreamSkills: ["Turtling", "Wall pinch", "Air roll shots", "Backwards aerials"]
                }}><GroupWrapper id="52c4080efca8c754eb74746d4fdb5ec0eda02d2a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.5,-2049C692.5,-2049 586.5,-2049 586.5,-2049 580.5,-2049 574.5,-2043 574.5,-2037 574.5,-2037 574.5,-2025 574.5,-2025 574.5,-2019 580.5,-2013 586.5,-2013 586.5,-2013 692.5,-2013 692.5,-2013 698.5,-2013 704.5,-2019 704.5,-2025 704.5,-2025 704.5,-2037 704.5,-2037 704.5,-2043 698.5,-2049 692.5,-2049"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2027.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Joystick Air Roll"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Joystick air roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="7c65d28bd6b0f8ee958ddb1025619a4df1589719" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M395.02,-1877.21C413.45,-1907.44 454.58,-1967.72 506,-1999 523.56,-2009.68 544.45,-2016.8 564.39,-2021.54"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="563.87,-2025.01 574.39,-2023.74 565.38,-2018.17 563.87,-2025.01"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M704,-2650C704,-2650 575,-2650 575,-2650 569,-2650 563,-2644 563,-2638 563,-2638 563,-2626 563,-2626 563,-2620 569,-2614 575,-2614 575,-2614 704,-2614 704,-2614 710,-2614 716,-2620 716,-2626 716,-2626 716,-2638 716,-2638 716,-2644 710,-2650 704,-2650"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-2628.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Directional Air Roll"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional air roll",
                    tailId: "Jumping"
                }}><GroupWrapper id="0886c5668eb4ef50cd4ad379c49348b76baccc65" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M386.9,-1877.25C396.3,-1945.84 433.67,-2194.02 506,-2386 537.7,-2470.12 592.94,-2561.36 621.02,-2605.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="618.23,-2607.47 626.59,-2613.98 624.12,-2603.68 618.23,-2607.47"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M680.5,-1919C680.5,-1919 598.5,-1919 598.5,-1919 592.5,-1919 586.5,-1913 586.5,-1907 586.5,-1907 586.5,-1895 586.5,-1895 586.5,-1889 592.5,-1883 598.5,-1883 598.5,-1883 680.5,-1883 680.5,-1883 686.5,-1883 692.5,-1889 692.5,-1895 692.5,-1895 692.5,-1907 692.5,-1907 692.5,-1913 686.5,-1919 680.5,-1919"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1897.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flip Window"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip window",
                    tailId: "Jumping"
                }}><GroupWrapper id="1fff6d4684e74beb0eb3619a8c33eccbc0553781" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M421.71,-1865.15C462.23,-1871.85 527.72,-1882.68 576.13,-1890.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="575.75,-1894.17 586.19,-1892.35 576.9,-1887.27 575.75,-1894.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M664.5,-1846C664.5,-1846 614.5,-1846 614.5,-1846 608.5,-1846 602.5,-1840 602.5,-1834 602.5,-1834 602.5,-1822 602.5,-1822 602.5,-1816 608.5,-1810 614.5,-1810 614.5,-1810 664.5,-1810 664.5,-1810 670.5,-1810 676.5,-1816 676.5,-1822 676.5,-1822 676.5,-1834 676.5,-1834 676.5,-1840 670.5,-1846 664.5,-1846"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1824.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Popping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Popping",
                    tailId: "Jumping"
                }}><GroupWrapper id="03d1e8d95dd46376633beb1fd22529e51ff511fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M421.71,-1854.46C466.99,-1848.93 543.45,-1839.6 592.42,-1833.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="592.93,-1837.09 602.43,-1832.4 592.08,-1830.14 592.93,-1837.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall pinch",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Wall pinch",
                    upstreamSkills: ["Jumping", "Boosting", "Joystick air roll"],
                    downstreamSkills: ["Kuxir pinch"]
                }}><GroupWrapper id="0cafa4b4135ad0c10019301e85c42bbcf18d737f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M937,-2242C937,-2242 869,-2242 869,-2242 863,-2242 857,-2236 857,-2230 857,-2230 857,-2218 857,-2218 857,-2212 863,-2206 869,-2206 869,-2206 937,-2206 937,-2206 943,-2206 949,-2212 949,-2218 949,-2218 949,-2230 949,-2230 949,-2236 943,-2242 937,-2242"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2220.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Pinch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Jumping"
                }}><GroupWrapper id="d63045344dd68ad51eb474a6ae10182403dead33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M386.44,-1877.19C392.9,-1928.25 418.54,-2073.84 506,-2145 605.05,-2225.59 763.63,-2231.49 846.88,-2228.19"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="847.07,-2231.69 856.9,-2227.73 846.75,-2224.69 847.07,-2231.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic aerials",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "When the ball is in the air and the player jumps and boosts into it with the purpose to pass, push, or score a goal.",
                        "Has in-game tutorial.",
                        {
                            text: "Reddit post by u/Bits_n_Bobs : Sir Timbers",
                            url: "https://www.reddit.com/r/RocketLeague/comments/3vzlxx/indepth_basic_aerial_guide_wgif_illustrations/"
                        },
                        {
                            text: "SubParButInHD Aerial Tutorial",
                            url: "https://www.youtube.com/watch?v=BtIjlnVh2DE"
                        },
                        {
                            text: "Rocket League Academy Aerial Tutorial",
                            url: "https://www.youtube.com/watch?v=OFIOZjlpj_w"
                        }
                    ],

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
                        d="M682,-1494C682,-1494 597,-1494 597,-1494 591,-1494 585,-1488 585,-1482 585,-1482 585,-1470 585,-1470 585,-1464 591,-1458 597,-1458 597,-1458 682,-1458 682,-1458 688,-1458 694,-1464 694,-1470 694,-1470 694,-1482 694,-1482 694,-1488 688,-1494 682,-1494"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1472.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Basic Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic aerials",
                    tailId: "Jumping"
                }}><GroupWrapper id="59d4c18483840653f54eebc6100174318dac059c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M389.15,-1840.91C401.78,-1794.27 440.29,-1667.6 506,-1582 531.85,-1548.33 570.58,-1518.98 599.5,-1499.75"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="601.67,-1502.52 608.13,-1494.12 597.84,-1496.65 601.67,-1502.52"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hoops - Friendship / fusion Kickoff",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["Hitting the teammate in a way to boost them faster to the ball.", {
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
                    upstreamSkills: ["Jumping", "Teammate Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4c97e91301b9bb257aceb3aa8119334ea2d99a2f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M761,-1067C761,-1067 518,-1067 518,-1067 512,-1067 506,-1061 506,-1055 506,-1055 506,-1043 506,-1043 506,-1037 512,-1031 518,-1031 518,-1031 761,-1031 761,-1031 767,-1031 773,-1037 773,-1043 773,-1043 773,-1055 773,-1055 773,-1061 767,-1067 761,-1067"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1045.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hoops - Friendship / Fusion Kickoff"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Friendship / fusion Kickoff",
                    tailId: "Jumping"
                }}><GroupWrapper id="eaab3ac652d99cb29dc1915b52f2791f3e468bf2" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M389.84,-1840.65C404.85,-1788.37 447.77,-1633.97 470,-1503 483.34,-1424.39 466.4,-1215.21 506,-1146 524.8,-1113.15 559.73,-1088.28 589.02,-1071.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="590.76,-1074.99 597.9,-1067.16 587.43,-1068.83 590.76,-1074.99"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turning",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Players turn by pressing the respective buttons or analog stick assigned in the controls panel. Has in game tutorial.",
                        {
                            text: "Done by Video Games Source on Youtube.",
                            url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                        }
                    ],

                    title: "Turning",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powershot + Powerclears", "Redirects", "Basic Demos"]
                }}><GroupWrapper id="b0f78a0f574630800e6d978b85363ff41bd7ad8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M408,-1243C408,-1243 359,-1243 359,-1243 353,-1243 347,-1237 347,-1231 347,-1231 347,-1219 347,-1219 347,-1213 353,-1207 359,-1207 359,-1207 408,-1207 408,-1207 414,-1207 420,-1213 420,-1219 420,-1219 420,-1231 420,-1231 420,-1237 414,-1243 408,-1243"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-1221.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turning"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Powershot + Powerclears",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "When the ball is rolling towards a player and the player boosts and flips into it resulting, causing a powershot.",
                        {
                            text: "Kevpert's Turn & Clears tutorial",
                            url: "https://www.youtube.com/watch?v=czZXq3fJoGE"
                        },
                        {
                            text: "Squishy Muffinz Powershot",
                            url: "https://www.youtube.com/watch?v=fA0ivgr69Xg"
                        },
                        {
                            text: "Sir Timbers Powershot and Powerclear tutorial",
                            url: "https://www.youtube.com/watch?v=jOjzJb4r3Zo"
                        },
                        {
                            text: "Dignitas’s Power shot guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                        }
                    ],

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
                        d="M727.5,-1191C727.5,-1191 551.5,-1191 551.5,-1191 545.5,-1191 539.5,-1185 539.5,-1179 539.5,-1179 539.5,-1167 539.5,-1167 539.5,-1161 545.5,-1155 551.5,-1155 551.5,-1155 727.5,-1155 727.5,-1155 733.5,-1155 739.5,-1161 739.5,-1167 739.5,-1167 739.5,-1179 739.5,-1179 739.5,-1185 733.5,-1191 727.5,-1191"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1169.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powershot + Powerclears"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Turning"
                }}><GroupWrapper id="65d524634dc012c0ec9b26a6896ba3cfa8d7d463" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M420.12,-1217.65C444.33,-1212.66 477.1,-1205.92 506,-1200 516.94,-1197.76 528.39,-1195.42 539.78,-1193.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="540.66,-1196.49 549.76,-1191.06 539.26,-1189.63 540.66,-1196.49"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Redirects",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Hitting the ball in a way to cause the direction of the ball to change for a pass, clear, or goal."
                    ],

                    title: "Redirects",
                    upstreamSkills: ["Turning", "Boosting"],
                    downstreamSkills: ["Rebound shots"]
                }}><GroupWrapper id="fd69be653321b291759b25bacb9d457fe645abae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M670,-1245C670,-1245 609,-1245 609,-1245 603,-1245 597,-1239 597,-1233 597,-1233 597,-1221 597,-1221 597,-1215 603,-1209 609,-1209 609,-1209 670,-1209 670,-1209 676,-1209 682,-1215 682,-1221 682,-1221 682,-1233 682,-1233 682,-1239 676,-1245 670,-1245"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1223.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Redirects"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Turning"
                }}><GroupWrapper id="86d5ea5067f613df951463cdbd4fa42a98441d9e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M420.09,-1225.28C463.42,-1225.62 536.97,-1226.2 586.62,-1226.59"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="586.8,-1230.09 596.83,-1226.67 586.86,-1223.09 586.8,-1230.09"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Basic Demos",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Basic demo’s (demolishing and / or bumping) are usually done at lower levels without a real purpose in mind.",
                        {
                            text: "Rocket Sledge’s Basic Demo’s tutorial.",
                            url: "https://www.youtube.com/watch?v=AkBbjnay4oY"
                        },
                        {
                            text: "Rocket Sledge’s Demo tutorial series.",
                            url: "https://www.youtube.com/playlist?list=PLBVtR-e9dDtxGSbZ-AtzsV1h5EN3SsfYj"
                        },
                        {
                            text: "Rocket Sledge’s Defensive Demos tutorial.",
                            url: "https://www.youtube.com/watch?v=YGUSrDHKi-Q"
                        }
                    ],

                    title: "Basic Demos",
                    upstreamSkills: ["Turning", "Boosting"],
                    downstreamSkills: ["Goalie Demos", "Air Demos"]
                }}><GroupWrapper id="7336660793449ed1297223c8aefa547b3bea0a96" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M681.5,-1349C681.5,-1349 597.5,-1349 597.5,-1349 591.5,-1349 585.5,-1343 585.5,-1337 585.5,-1337 585.5,-1325 585.5,-1325 585.5,-1319 591.5,-1313 597.5,-1313 597.5,-1313 681.5,-1313 681.5,-1313 687.5,-1313 693.5,-1319 693.5,-1325 693.5,-1325 693.5,-1337 693.5,-1337 693.5,-1343 687.5,-1349 681.5,-1349"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-1327.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Basic Demos"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Turning"
                }}><GroupWrapper id="04363ac6b640dc5c3d688ce5a59f51e53ce1b738" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M420.09,-1239.85C463.18,-1257.84 536.16,-1288.29 585.79,-1309"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="584.5,-1312.26 595.08,-1312.88 587.2,-1305.8 584.5,-1312.26"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Driving",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Using the drive key assigned in the control panel. fHas in game tutorial.",
                        {
                            text: "Done by Video Games Source on Youtube.",
                            url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                        }
                    ],

                    title: "Driving",
                    upstreamSkills: [],

                    downstreamSkills: [
                        "Jumping",
                        "Turning",
                        "Braking",
                        "Boosting",
                        "Powershot + Powerclears",
                        "Powerslide Turning",
                        "Wall driving",
                        "Positioning",
                        "Prediction"
                    ]
                }}><GroupWrapper id="ff52a774cad89d125cacf645052cfe567096d753" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M58,-1235C58,-1235 12,-1235 12,-1235 6,-1235 0,-1229 0,-1223 0,-1223 0,-1211 0,-1211 0,-1205 6,-1199 12,-1199 12,-1199 58,-1199 58,-1199 64,-1199 70,-1205 70,-1211 70,-1211 70,-1223 70,-1223 70,-1229 64,-1235 58,-1235"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="35"
                        y="-1213.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Driving"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Jumping",
                    tailId: "Driving"
                }}><GroupWrapper id="4acdb597339422b238ab40122e44811df9987004" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M45.81,-1235.18C94.45,-1325.31 309.72,-1724.15 367.94,-1832.02"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="364.94,-1833.84 372.77,-1840.98 371.1,-1830.52 364.94,-1833.84"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="d26ba9c663855ade1d9248c95687355f9190979d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M70.17,-1217.79C132.78,-1219.23 265.9,-1222.31 336.43,-1223.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="336.7,-1227.44 346.78,-1224.18 336.86,-1220.45 336.7,-1227.44"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Braking",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: ["Slows the car down by letting go of accelerate and pressing reverse."],
                    title: "Braking",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="eaa44d00fe236ab417d0738ebd452e912564166a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M208,-1319C208,-1319 159,-1319 159,-1319 153,-1319 147,-1313 147,-1307 147,-1307 147,-1295 147,-1295 147,-1289 153,-1283 159,-1283 159,-1283 208,-1283 208,-1283 214,-1283 220,-1289 220,-1295 220,-1295 220,-1307 220,-1307 220,-1313 214,-1319 208,-1319"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="183.5"
                        y="-1297.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Braking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Braking",
                    tailId: "Driving"
                }}><GroupWrapper id="ebf18b4afe73755cc0d0b934b00523fd5e4f7036" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M57.44,-1235.07C70.84,-1245.8 88.77,-1259.19 106,-1269 115.87,-1274.62 126.91,-1279.81 137.48,-1284.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="136.42,-1287.66 147,-1288.23 139.09,-1281.18 136.42,-1287.66"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boosting",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Faster than driving, boosting uses boost to increase the speed of the car until it becomes supersonic (maximum speed that any car can keep) .",
                        {
                            text: "Done by Video Games Source on Youtube.",
                            url: "https://www.youtube.com/watch?v=9-Z-aQFZPyg"
                        },
                        {
                            text: "Rocket Science’s explanation on max speed vs supersonic.",
                            url: "https://www.youtube.com/watch?v=mlWY6x8g5Ps"
                        }
                    ],

                    title: "Boosting",
                    upstreamSkills: ["Driving"],

                    downstreamSkills: [
                        "50/50’s + Kickoffs",
                        "Powershot + Powerclears",
                        "Redirects",
                        "Tilted drift",
                        "Wall pinch",
                        "Basic Demos",
                        "Hel-jump",
                        "Basic aerials"
                    ]
                }}><GroupWrapper id="537c9a929ccd9e9add13b15ba512c096d2fd52c4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M411.5,-1494C411.5,-1494 355.5,-1494 355.5,-1494 349.5,-1494 343.5,-1488 343.5,-1482 343.5,-1482 343.5,-1470 343.5,-1470 343.5,-1464 349.5,-1458 355.5,-1458 355.5,-1458 411.5,-1458 411.5,-1458 417.5,-1458 423.5,-1464 423.5,-1470 423.5,-1470 423.5,-1482 423.5,-1482 423.5,-1488 417.5,-1494 411.5,-1494"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-1472.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Boosting"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boosting",
                    tailId: "Driving"
                }}><GroupWrapper id="f8161b17441a7def2138c218af3057859b4183f1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M70.17,-1225.82C81.56,-1228.76 94.33,-1232.03 106,-1235 174.84,-1252.51 203.93,-1231.7 261,-1274 321.85,-1319.11 358.22,-1404.58 373.7,-1448.47"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="370.39,-1449.6 376.94,-1457.93 377.01,-1447.34 370.39,-1449.6"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Driving"
                }}><GroupWrapper id="a95d5e59165072fdf6c0c854a63cde1a2361053e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M70.12,-1214.51C157.06,-1208.16 389.87,-1191.16 529.09,-1180.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="529.64,-1184.46 539.36,-1180.24 529.13,-1177.48 529.64,-1184.46"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Turning",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Holding drift while turning will produce a powerslide and allow for sharper turns and faster play speeds.",
                        {
                            text: "Kevpert's Turn & Clears tutorial",
                            url: "https://www.youtube.com/watch?v=czZXq3fJoGE"
                        },
                        {
                            text: "u/HoraryHellfire2's explination of powerslide turning in comparison.",
                            url: "https://www.reddit.com/r/RocketLeague/comments/53djcs/what_little_things_do_the_pros_do_that_we/d7s7d50/"
                        }
                    ],

                    title: "Powerslide Turning",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Powerslide Recovery", "Power Slide Dribble"]
                }}><GroupWrapper id="0fbaf27e68e4e8e34b42a9e74352bce7299da410" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M249,-2369C249,-2369 118,-2369 118,-2369 112,-2369 106,-2363 106,-2357 106,-2357 106,-2345 106,-2345 106,-2339 112,-2333 118,-2333 118,-2333 249,-2333 249,-2333 255,-2333 261,-2339 261,-2345 261,-2345 261,-2357 261,-2357 261,-2363 255,-2369 249,-2369"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="183.5"
                        y="-2347.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powerslide Turning"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Turning",
                    tailId: "Driving"
                }}><GroupWrapper id="46995ef069361998ccf614c333fdc6e911c332b0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M38.36,-1235.27C55.29,-1366.3 158.12,-2162.26 178.86,-2322.8"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="175.4,-2323.37 180.15,-2332.84 182.34,-2322.47 175.4,-2323.37"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M680,-922C680,-922 599,-922 599,-922 593,-922 587,-916 587,-910 587,-910 587,-898 587,-898 587,-892 593,-886 599,-886 599,-886 680,-886 680,-886 686,-886 692,-892 692,-898 692,-898 692,-910 692,-910 692,-916 686,-922 680,-922"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-900.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Driving"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall driving",
                    tailId: "Driving"
                }}><GroupWrapper id="15037e985c66a7cbef252e08c95a777ac8f3fce8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M70.12,-1199.27C173.01,-1145.83 480.16,-986.26 594.75,-926.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="596.37,-929.83 603.63,-922.11 593.14,-923.62 596.37,-929.83"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Positioning",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Whenever the a player is on the field, positioning is being used. Positioning is where the player puts themselves relative to the ball.",
                        "All tutorials in rotation can also be used for this.",
                        {
                            text: "Ytzi13 Lead offence 3v3 guide",
                            url: "https://www.reddit.com/r/RocketLeague/comments/ab9490/playing_the_first_man_role_a_guide_for_all_skill/?st=JQFHERHK&sh=9ac03a3b"
                        },
                        {
                            text: "Dignitas’s 1v1 guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12629/becoming-the-best-solo-duel-a-high-level-1v1-guide"
                        },
                        {
                            text: "Gregan’s positioning tutorial series.",
                            url: "https://www.youtube.com/playlist?list=PLNlAnZLtqpGy9B7I2PUe_JPfjrjawmffP"
                        }
                    ],

                    title: "Positioning",
                    upstreamSkills: ["Driving"],
                    downstreamSkills: ["Shadowing", "Teammate Awareness", "Rotation"]
                }}><GroupWrapper id="a712a04c933abf5a931bcfdc872cedc3542e0268" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M219.5,-424C219.5,-424 147.5,-424 147.5,-424 141.5,-424 135.5,-418 135.5,-412 135.5,-412 135.5,-400 135.5,-400 135.5,-394 141.5,-388 147.5,-388 147.5,-388 219.5,-388 219.5,-388 225.5,-388 231.5,-394 231.5,-400 231.5,-400 231.5,-412 231.5,-412 231.5,-418 225.5,-424 219.5,-424"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="183.5"
                        y="-402.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Positioning"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Positioning",
                    tailId: "Driving"
                }}><GroupWrapper id="6d69af14f92aa38b283d9f38a8f8e55b7da6c9be" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M38.29,-1198.76C46.24,-1136.24 73.9,-924.98 106,-752 128.03,-633.27 161.25,-493.2 175.55,-434.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="179.03,-434.83 177.99,-424.29 172.23,-433.18 179.03,-434.83"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Prediction",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Being able to predict what an player or opponent will do from repetition and experience.",
                        {
                            text: "Rocket Science’s explanation of ball physics.",
                            url: "https://www.youtube.com/watch?v=9uh8-nBlufM"
                        }
                    ],

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
                        d="M672.5,-657C672.5,-657 606.5,-657 606.5,-657 600.5,-657 594.5,-651 594.5,-645 594.5,-645 594.5,-633 594.5,-633 594.5,-627 600.5,-621 606.5,-621 606.5,-621 672.5,-621 672.5,-621 678.5,-621 684.5,-627 684.5,-633 684.5,-633 684.5,-645 684.5,-645 684.5,-651 678.5,-657 672.5,-657"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-635.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Prediction",
                    tailId: "Driving"
                }}><GroupWrapper id="e6d0ac4250488960d3927971b52afff6bb1c939b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M44.28,-1198.73C55.94,-1174.11 78.84,-1129.62 106,-1097 266.42,-904.31 512.67,-725.69 603.38,-662.85"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="605.43,-665.69 611.67,-657.13 601.45,-659.93 605.43,-665.69"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double jump aerials",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["Jumping twice for maximum height, then going for an aerial.", {
                        text: "SuParButinHd’s 10 pro skills video.",
                        url: "https://youtu.be/0ohM0iPynUI?t=62"
                    }],

                    title: "Double jump aerials",
                    upstreamSkills: ["Double Jumping", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="d7a2f6ed1c0ab39bbe8fd25a89d2e285f02074b5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M972,-1604C972,-1604 834,-1604 834,-1604 828,-1604 822,-1598 822,-1592 822,-1592 822,-1580 822,-1580 822,-1574 828,-1568 834,-1568 834,-1568 972,-1568 972,-1568 978,-1568 984,-1574 984,-1580 984,-1580 984,-1592 984,-1592 984,-1598 978,-1604 972,-1604"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1582.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Double Jump Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double jump aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="0df125d690097c5707cd4815127d1dcb711300cf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M705.14,-1603.31C737.21,-1600.49 776.49,-1597.04 811.5,-1593.96"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="812.08,-1597.42 821.73,-1593.06 811.47,-1590.45 812.08,-1597.42"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast aerials",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Like a basic aerial but at the start, jump, tilt the car upwards, and jump to gain momentum while boosting the entire time.",
                        {
                            text: "Sir Timbers fast aerials tutorial.",
                            url: "https://www.youtube.com/watch?v=lkBZg0Ldhls"
                        },
                        {
                            text: "Iridium’s fast aerial tutorial.",
                            url: "https://www.youtube.com/watch?v=RHVQ_0zbW14"
                        }
                    ],

                    title: "Fast aerials",
                    upstreamSkills: ["Double Jumping", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="f38a452faec31adb27135b563ce6b43880be5c7b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M941.5,-1550C941.5,-1550 864.5,-1550 864.5,-1550 858.5,-1550 852.5,-1544 852.5,-1538 852.5,-1538 852.5,-1526 852.5,-1526 852.5,-1520 858.5,-1514 864.5,-1514 864.5,-1514 941.5,-1514 941.5,-1514 947.5,-1514 953.5,-1520 953.5,-1526 953.5,-1526 953.5,-1538 953.5,-1538 953.5,-1544 947.5,-1550 941.5,-1550"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1528.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Fast Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast aerials",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ebed3c96ee622da9af0ebdb96f577f64a5d00b4b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M700.92,-1590.98C733.01,-1581.43 773.13,-1569.53 809,-1559 819.86,-1555.81 831.43,-1552.44 842.59,-1549.19"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="843.65,-1552.53 852.27,-1546.38 841.69,-1545.81 843.65,-1552.53"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Spring Roll",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "A move where the player pops the ball up for another touch but, uses the car’s jump to go back down to the ground faster to fake the opponent.",
                        {
                            text: "The Spring Roll",
                            url: "https://www.reddit.com/r/RocketLeague/comments/9df4av/someone_come_up_with_a_new_mechanic_and_name_it/e5hemz8/"
                        },
                        "While turtle dribbling, push the ball up the wall and start air dribbling.",
                        {
                            text: "FLuuMP Turtle AirDribble tutorial.",
                            url: "https://www.youtube.com/watch?v=_pOs0oZMXFU"
                        }
                    ],

                    title: "Spring Roll",
                    upstreamSkills: ["Double Jumping", "Doinking", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="76e9558e859ffe4b4d74c25a894bb587785133d0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1184.5,-1642C1184.5,-1642 1111.5,-1642 1111.5,-1642 1105.5,-1642 1099.5,-1636 1099.5,-1630 1099.5,-1630 1099.5,-1618 1099.5,-1618 1099.5,-1612 1105.5,-1606 1111.5,-1606 1111.5,-1606 1184.5,-1606 1184.5,-1606 1190.5,-1606 1196.5,-1612 1196.5,-1618 1196.5,-1618 1196.5,-1630 1196.5,-1630 1196.5,-1636 1190.5,-1642 1184.5,-1642"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1620.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Spring Roll"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Double Jumping"
                }}><GroupWrapper id="ad02c4f7b05a024681bb92a2ed2e803bf46c649e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M705.16,-1610.91C804.74,-1613.86 994.07,-1619.47 1089.28,-1622.29"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1089.21,-1625.79 1099.31,-1622.59 1089.42,-1618.79 1089.21,-1625.79"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "50/50’s + Kickoffs",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "When players flip or jump into the ball at the same time. Advanced versions of this have players observe each other to determine what angle the ball will go after the confrontation. Kickoffs are 50/50’s at the beginning of a match or after a goal has been scored.",
                        {
                            text: "Dignitas’s guide to kickoffs",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12642/take-your-rocket-league-gameplay-to-the-next-level-kickoffs"
                        },
                        {
                            text: "Doomsee's 50/50 tutorial",
                            url: "https://www.youtube.com/watch?v=d5XisgpPNCI"
                        },
                        {
                            text: "Azure Rl 50/50 tutorial",
                            url: "https://www.youtube.com/watch?v=kjvDwh0zogk"
                        },
                        {
                            text: "Excel Exports 50/50 tutorial",
                            url: "https://www.youtube.com/watch?v=Df5ZPYqePok"
                        }
                    ],

                    title: "50/50’s + Kickoffs",
                    upstreamSkills: ["Flipping", "Boosting"],
                    downstreamSkills: ["Fast Kickoffs"]
                }}><GroupWrapper id="a2b936491d4b9c3849b428df5f3f16a31cc9d59d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M964,-2134C964,-2134 842,-2134 842,-2134 836,-2134 830,-2128 830,-2122 830,-2122 830,-2110 830,-2110 830,-2104 836,-2098 842,-2098 842,-2098 964,-2098 964,-2098 970,-2098 976,-2104 976,-2110 976,-2110 976,-2122 976,-2122 976,-2128 970,-2134 964,-2134"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2112.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"50/50’s + Kickoffs"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Flipping"
                }}><GroupWrapper id="9629a67191bfe59987557df418272e39594e5e63" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M649.53,-2340.8C671.12,-2299.2 729.85,-2196.62 809,-2143 812.7,-2140.49 816.64,-2138.21 820.72,-2136.15"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="822.23,-2139.3 829.85,-2131.94 819.31,-2132.94 822.23,-2139.3"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M938.5,-2296C938.5,-2296 867.5,-2296 867.5,-2296 861.5,-2296 855.5,-2290 855.5,-2284 855.5,-2284 855.5,-2272 855.5,-2272 855.5,-2266 861.5,-2260 867.5,-2260 867.5,-2260 938.5,-2260 938.5,-2260 944.5,-2260 950.5,-2266 950.5,-2272 950.5,-2272 950.5,-2284 950.5,-2284 950.5,-2290 944.5,-2296 938.5,-2296"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2274.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wave Dash"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wave dash",
                    tailId: "Flipping"
                }}><GroupWrapper id="dc949969e7dffed44d2cfec04071f3a68f05a9a5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.55,-2346.8C711.63,-2335.66 763.61,-2318.86 809,-2305 820.68,-2301.43 833.23,-2297.72 845.2,-2294.22"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.46,-2297.5 855.09,-2291.35 844.51,-2290.78 846.46,-2297.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M962.5,-2350C962.5,-2350 843.5,-2350 843.5,-2350 837.5,-2350 831.5,-2344 831.5,-2338 831.5,-2338 831.5,-2326 831.5,-2326 831.5,-2320 837.5,-2314 843.5,-2314 843.5,-2314 962.5,-2314 962.5,-2314 968.5,-2314 974.5,-2320 974.5,-2326 974.5,-2326 974.5,-2338 974.5,-2338 974.5,-2344 968.5,-2350 962.5,-2350"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2328.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Diagonal Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Diagonal Flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="261c87736cbe53fafb62bf8314c992a171d8018a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.69,-2355.16C714.94,-2351.31 773.48,-2345.27 821.41,-2340.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="821.88,-2343.79 831.47,-2339.28 821.16,-2336.83 821.88,-2343.79"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Speed flipping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: [],
                    title: "Speed flipping",
                    upstreamSkills: ["Flipping", "Directional air roll"],
                    downstreamSkills: ["Zap dash"]
                }}><GroupWrapper id="a4dfc80ce8e6927ad97338af954e64a2369ec1cd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953.5,-2604C953.5,-2604 852.5,-2604 852.5,-2604 846.5,-2604 840.5,-2598 840.5,-2592 840.5,-2592 840.5,-2580 840.5,-2580 840.5,-2574 846.5,-2568 852.5,-2568 852.5,-2568 953.5,-2568 953.5,-2568 959.5,-2568 965.5,-2574 965.5,-2580 965.5,-2580 965.5,-2592 965.5,-2592 965.5,-2598 959.5,-2604 953.5,-2604"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2582.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Speed Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Speed flipping",
                    tailId: "Flipping"
                }}><GroupWrapper id="55939fa0e30c0eb191f3b0497e63c325778de99b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M651.41,-2377.14C675.26,-2415.31 735.81,-2504.49 809,-2554 815.74,-2558.56 823.19,-2562.53 830.85,-2565.97"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="829.69,-2569.28 840.27,-2569.91 832.4,-2562.82 829.69,-2569.28"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backflip shot",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Hitting the ball normally and backflipping after the shot to keep the players position and be able to hit the ball again.",
                        {
                            text: "SuParButinHd’s 10 pro skills video.",
                            url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                        }
                    ],

                    title: "Backflip shot",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="ea54f7ee4b0949603f1aa4df4dd85877d59eafb6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M946.5,-2458C946.5,-2458 859.5,-2458 859.5,-2458 853.5,-2458 847.5,-2452 847.5,-2446 847.5,-2446 847.5,-2434 847.5,-2434 847.5,-2428 853.5,-2422 859.5,-2422 859.5,-2422 946.5,-2422 946.5,-2422 952.5,-2422 958.5,-2428 958.5,-2434 958.5,-2434 958.5,-2446 958.5,-2446 958.5,-2452 952.5,-2458 946.5,-2458"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2436.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Backflip Shot"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backflip shot",
                    tailId: "Flipping"
                }}><GroupWrapper id="6962bee10e7ea6267af2c2e5586d3934452044b8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.55,-2371.2C711.63,-2382.34 763.61,-2399.14 809,-2413 818.19,-2415.81 827.91,-2418.7 837.47,-2421.51"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="836.76,-2424.95 847.34,-2424.4 838.73,-2418.24 836.76,-2424.95"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tilted drift",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "A skill where a player will forward diagonal flip then land on the left or right two wheels whilst proceeding to continuously boost and turn.",
                        {
                            text: "Tilted Drift tutorial by HelvetiaGaming",
                            url: "https://www.youtube.com/watch?v=y2isfCJfPps"
                        }
                    ],

                    title: "Tilted drift",
                    upstreamSkills: ["Flipping", "Boosting"],
                    downstreamSkills: []
                }}><GroupWrapper id="bc39cc9f4f8933fa4c939aea82d280f199742478" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M939,-2080C939,-2080 867,-2080 867,-2080 861,-2080 855,-2074 855,-2068 855,-2068 855,-2056 855,-2056 855,-2050 861,-2044 867,-2044 867,-2044 939,-2044 939,-2044 945,-2044 951,-2050 951,-2056 951,-2056 951,-2068 951,-2068 951,-2074 945,-2080 939,-2080"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2058.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Tilted Drift"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tilted drift",
                    tailId: "Flipping"
                }}><GroupWrapper id="cb124b8d6d0696496124ea3d4424402dfc935d0c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M646.63,-2340.7C663.91,-2291.95 717.79,-2158.01 809,-2089 819.58,-2081 832.47,-2075.36 845.24,-2071.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.26,-2074.75 854.94,-2068.68 844.37,-2068.01 846.26,-2074.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip canceling",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "During a flip, the player rotates the car in the opposite direction the flip is going to stop the car from turning. Used to gain speed.",
                        {
                            text: "Dignitas’s half-flip guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12628/half-flips-where-when-and-how"
                        }
                    ],

                    title: "Flip canceling",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: ["Half flipping"]
                }}><GroupWrapper id="7b29daf22ac71cf45cefd3252bbdb88fe8895ce6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M950.5,-2512C950.5,-2512 855.5,-2512 855.5,-2512 849.5,-2512 843.5,-2506 843.5,-2500 843.5,-2500 843.5,-2488 843.5,-2488 843.5,-2482 849.5,-2476 855.5,-2476 855.5,-2476 950.5,-2476 950.5,-2476 956.5,-2476 962.5,-2482 962.5,-2488 962.5,-2488 962.5,-2500 962.5,-2500 962.5,-2506 956.5,-2512 950.5,-2512"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2490.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flip Canceling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip canceling",
                    tailId: "Flipping"
                }}><GroupWrapper id="8cb1a3eae957ffe71f4a2235200013a07cb31752" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M663.8,-2377.04C695.22,-2400.62 753.63,-2441.86 809,-2467 816.7,-2470.5 824.97,-2473.66 833.28,-2476.49"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="832.44,-2479.9 843.03,-2479.66 834.6,-2473.24 832.44,-2479.9"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Directional Flick",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "The standard type of flick that players use when directional flipping into the ball.",
                        {
                            text: "Sir Classy Flicks tutorial.",
                            url: "https://www.youtube.com/watch?v=O2H9yQJrEJQ"
                        },
                        {
                            text: "Dignitas 45-Degree flick guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12789/how-to-master-the-45-degree-flick"
                        }
                    ],

                    title: "Directional Flick",
                    upstreamSkills: ["Flipping", "Hood dribble"],
                    downstreamSkills: ["45 degree flick", "Musty Flick", "Delayed Flicks"]
                }}><GroupWrapper id="19641b3805579dd37624bf66b09257f750974774" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1441.5,-2612C1441.5,-2612 1331.5,-2612 1331.5,-2612 1325.5,-2612 1319.5,-2606 1319.5,-2600 1319.5,-2600 1319.5,-2588 1319.5,-2588 1319.5,-2582 1325.5,-2576 1331.5,-2576 1331.5,-2576 1441.5,-2576 1441.5,-2576 1447.5,-2576 1453.5,-2582 1453.5,-2588 1453.5,-2588 1453.5,-2600 1453.5,-2600 1453.5,-2606 1447.5,-2612 1441.5,-2612"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2590.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Directional Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Flipping"
                }}><GroupWrapper id="e45baa78fa3c1200e296a306aacaef56a3377c2c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M653.06,-2377.2C678.14,-2411.91 738.15,-2487.14 809,-2521 853.25,-2542.15 1162.91,-2573.29 1309.24,-2587.04"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1309.2,-2590.55 1319.49,-2588 1309.86,-2583.58 1309.2,-2590.55"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rumble - Spike Flicks",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "While spikes have the ball stuck to your car, flip right before they let go to flick the ball.",
                        {
                            text: "Johnniboi_i stream with kronovi.",
                            url: "https://clips.twitch.tv/CleanAbnegateWrenchKappaWealth"
                        }
                    ],

                    title: "Rumble - Spike Flicks",
                    upstreamSkills: ["Flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="147dbe8bf54f7f867d98ea39b01f66d718271304" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976.5,-2404C976.5,-2404 829.5,-2404 829.5,-2404 823.5,-2404 817.5,-2398 817.5,-2392 817.5,-2392 817.5,-2380 817.5,-2380 817.5,-2374 823.5,-2368 829.5,-2368 829.5,-2368 976.5,-2368 976.5,-2368 982.5,-2368 988.5,-2374 988.5,-2380 988.5,-2380 988.5,-2392 988.5,-2392 988.5,-2398 982.5,-2404 976.5,-2404"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2382.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rumble - Spike Flicks"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - Spike Flicks",
                    tailId: "Flipping"
                }}><GroupWrapper id="16d66adb5bb5e45604b95ecc253ebd736034bcbb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.69,-2362.84C711.38,-2366.32 762.47,-2371.59 807.39,-2376.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="807.16,-2379.73 817.47,-2377.27 807.88,-2372.76 807.16,-2379.73"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "50/50’s + Kickoffs",
                    tailId: "Boosting"
                }}><GroupWrapper id="5d8996827b436d743ab2e51c0f78da5c2dfeaa6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M388.86,-1494.07C410.04,-1581.87 501.43,-1959.85 506,-1964 594.79,-2044.71 678.17,-1930.48 773,-2004 805.42,-2029.14 778.33,-2061.75 809,-2089 812.66,-2092.25 816.68,-2095.11 820.95,-2097.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="819.51,-2100.82 830,-2102.32 822.73,-2094.61 819.51,-2100.82"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Powershot + Powerclears",
                    tailId: "Boosting"
                }}><GroupWrapper id="51301e2282283ee5735d568c01e581d46214133c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M391.32,-1457.98C413.61,-1399.48 484.14,-1217.62 506,-1200 513.18,-1194.21 521.28,-1189.56 529.84,-1185.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="531.25,-1189.05 539.3,-1182.16 528.71,-1182.53 531.25,-1189.05"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Redirects",
                    tailId: "Boosting"
                }}><GroupWrapper id="2b101ad152e13d18e42311c10f858ec8a217e3d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M393.92,-1457.75C411.99,-1424.06 454.35,-1351.27 506,-1304 530.32,-1281.75 562.13,-1263 588.49,-1249.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="590.18,-1252.64 597.56,-1245.05 587.05,-1246.38 590.18,-1252.64"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tilted drift",
                    tailId: "Boosting"
                }}><GroupWrapper id="e773c38c8f5a4939fc2a750117b53518db7eeecf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M388.8,-1494.15C408.39,-1576.63 489.07,-1912.73 506,-1928 595.25,-2008.51 661.95,-1925.02 773,-1971 791.24,-1978.55 792.91,-1985.57 809,-1997 828.32,-2010.73 850.02,-2025.91 867.6,-2038.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="865.66,-2041.06 875.87,-2043.9 869.66,-2035.31 865.66,-2041.06"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Boosting"
                }}><GroupWrapper id="174936d386e79231fe49f9d9a99586a031f46c23" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M389.36,-1494.04C403.28,-1546.14 443.96,-1701.41 470,-1832 489.89,-1931.75 439.94,-1980.66 506,-2058 587.06,-2152.9 672.9,-2070.45 773,-2145 795.54,-2161.79 786.19,-2180.58 809,-2197 820.09,-2204.98 833.51,-2210.62 846.67,-2214.59"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.07,-2218.06 856.64,-2217.32 847.91,-2211.3 846.07,-2218.06"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic Demos",
                    tailId: "Boosting"
                }}><GroupWrapper id="52167b9a65db45a3347dca992a7cc93919727046" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M415.11,-1457.89C439.62,-1443.44 474.92,-1422.76 506,-1405 536.29,-1387.7 570.68,-1368.5 596.84,-1353.99"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="598.68,-1356.98 605.73,-1349.07 595.29,-1350.85 598.68,-1356.98"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hel-jump",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "A form of wave dashing, the hel-jump has the player jump instead of flip when they hit the ground with the use of powerslide and boost to start an aerial that keeps their flip to be used whenever they wanted. Also known as a Wave jump.",
                        {
                            text: "Hel-Jump Tutorial by  HelvetiaGaming",
                            url: "https://www.youtube.com/watch?v=p1KxjeQT5As"
                        },
                        "A combination of a hel-jump and a wave dash; The hel-dash allows the player to hit max speed in a very short amount of time and boost.",
                        {
                            text: "https://gfycat.com/LiquidBaggyDoe",
                            url: "https://gfycat.com/LiquidBaggyDoe"
                        }
                    ],

                    title: "Hel-jump",
                    upstreamSkills: ["Boosting", "Wave dash"],
                    downstreamSkills: []
                }}><GroupWrapper id="3c95c68cc3736c6dfaa388c5aadcd341c5b0a21f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1177,-1696C1177,-1696 1119,-1696 1119,-1696 1113,-1696 1107,-1690 1107,-1684 1107,-1684 1107,-1672 1107,-1672 1107,-1666 1113,-1660 1119,-1660 1119,-1660 1177,-1660 1177,-1660 1183,-1660 1189,-1666 1189,-1672 1189,-1672 1189,-1684 1189,-1684 1189,-1690 1183,-1696 1177,-1696"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1674.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hel-jump"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Boosting"
                }}><GroupWrapper id="e6abb339e33d2c148fdb01ea27b6ee3307a4035c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M392.93,-1494.2C409.51,-1527.86 449.71,-1599.71 506,-1636 694.34,-1757.42 981.93,-1714.11 1096.93,-1689.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1097.82,-1693.25 1106.86,-1687.72 1096.35,-1686.4 1097.82,-1693.25"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Basic aerials",
                    tailId: "Boosting"
                }}><GroupWrapper id="7602d96def6adb029b613d4821567cac668c7c8a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M423.63,-1476C463.82,-1476 527.04,-1476 574.52,-1476"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="574.7,-1479.5 584.7,-1476 574.7,-1472.5 574.7,-1479.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Fast Kickoffs",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["During the kickoff, the player diagonal flips to gain speed.", {
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
                    upstreamSkills: ["50/50’s + Kickoffs"],
                    downstreamSkills: ["Wavedash Kickoff"]
                }}><GroupWrapper id="70ae9f10a1ebfc1c3e2894c6b3cf99364f1eab4e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1190,-2134C1190,-2134 1106,-2134 1106,-2134 1100,-2134 1094,-2128 1094,-2122 1094,-2122 1094,-2110 1094,-2110 1094,-2104 1100,-2098 1106,-2098 1106,-2098 1190,-2098 1190,-2098 1196,-2098 1202,-2104 1202,-2110 1202,-2110 1202,-2122 1202,-2122 1202,-2128 1196,-2134 1190,-2134"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2112.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Fast Kickoffs"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Fast Kickoffs",
                    tailId: "50/50’s + Kickoffs"
                }}><GroupWrapper id="f52925957ddb7918578ad02bb3562cee452d58b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M976.25,-2116C1010.33,-2116 1050.64,-2116 1083.54,-2116"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1083.94,-2119.5 1093.94,-2116 1083.94,-2112.5 1083.94,-2119.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce Powershots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="5393ce41d9044769cb75e995ed926cb6df79f6b7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M739.73,-1184.01C764.39,-1186.74 790.63,-1189.65 814.66,-1192.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="814.49,-1195.82 824.82,-1193.44 815.27,-1188.86 814.49,-1195.82"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Possession Prediction",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Knowing when a touch on the ball will lead to the possession of the ball going to the other team."
                    ],

                    title: "Possession Prediction",
                    upstreamSkills: ["Powershot + Powerclears", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="8b5a1709bd001cb3cd9bee3c80300276e4531ff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1222,-909C1222,-909 1074,-909 1074,-909 1068,-909 1062,-903 1062,-897 1062,-897 1062,-885 1062,-885 1062,-879 1068,-873 1074,-873 1074,-873 1222,-873 1222,-873 1228,-873 1234,-879 1234,-885 1234,-885 1234,-897 1234,-897 1234,-903 1228,-909 1222,-909"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-887.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Possession Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="801627f5997fc9b6df68fbbcd96e5454f49ae0d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.78,-1154.86C711.57,-1138.79 762.98,-1115.27 809,-1098 890.87,-1067.28 935.34,-1102 997,-1040 1035.96,-1000.82 993.22,-959.35 1033,-921 1038.75,-915.46 1045.39,-910.91 1052.53,-907.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1054.2,-910.26 1061.8,-902.87 1051.25,-903.91 1054.2,-910.26"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Aerial Powershot",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["Positioning the car to go with the ball's momentum to powershot it.", {
                        text: "Dignitas’s Power shot guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                    }],

                    title: "Aerial Powershot",
                    upstreamSkills: ["Powershot + Powerclears", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="95db5dbea9d6dd0b9b333735ed54b07d0bd15896" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M960,-1274C960,-1274 846,-1274 846,-1274 840,-1274 834,-1268 834,-1262 834,-1262 834,-1250 834,-1250 834,-1244 840,-1238 846,-1238 846,-1238 960,-1238 960,-1238 966,-1238 972,-1244 972,-1250 972,-1250 972,-1262 972,-1262 972,-1268 966,-1274 960,-1274"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1252.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Aerial Powershot"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6e12ddd82ba76fbdfd2f127c4d354e7597f33141" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M739.53,-1187.71C751.08,-1191.01 762.48,-1195.05 773,-1200 791.59,-1208.74 790.78,-1219.51 809,-1229 813.85,-1231.52 818.96,-1233.84 824.2,-1235.97"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="823.13,-1239.31 833.72,-1239.59 825.62,-1232.76 823.13,-1239.31"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air roll shots",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Tilting the car by using air roll to hit the ball in a way to get more power or slow the ball down.",
                        {
                            text: "Dignitas air rolling guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12633/air-rolling-a-rocket-league-guide-on-effective-aerials"
                        },
                        {
                            text: "Ytzi13 Air roll usage comment",
                            url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                        }
                    ],

                    title: "Air roll shots",
                    upstreamSkills: ["Powershot + Powerclears", "Bounce Powershots", "Joystick air roll"],
                    downstreamSkills: ["Sideways aerials"]
                }}><GroupWrapper id="8ed889690f1cbd15c45145c524af7e835735526a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1193.5,-1299C1193.5,-1299 1102.5,-1299 1102.5,-1299 1096.5,-1299 1090.5,-1293 1090.5,-1287 1090.5,-1287 1090.5,-1275 1090.5,-1275 1090.5,-1269 1096.5,-1263 1102.5,-1263 1102.5,-1263 1193.5,-1263 1193.5,-1263 1199.5,-1263 1205.5,-1269 1205.5,-1275 1205.5,-1275 1205.5,-1287 1205.5,-1287 1205.5,-1293 1199.5,-1299 1193.5,-1299"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1277.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Roll Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="6593f4c98a54ef0fe027b6c0cc07a3c8bd7718e5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M677.62,-1154.99C744.4,-1125.28 887.95,-1073.76 997,-1121 1059.65,-1148.14 1108.12,-1215.75 1131.55,-1253.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1128.8,-1256.06 1136.95,-1262.83 1134.8,-1252.46 1128.8,-1256.06"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Guillotine passing",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "An advanced form of the backboard pass, the guillotine pass or bevel pass, is where a player aims higher up on the backboard towards the curve between the ceiling and wall to send the ball straight down, like a guillotine’s blade."
                    ],

                    title: "Guillotine passing",
                    upstreamSkills: ["Powershot + Powerclears", "Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="d38b4a8b07534956531b0f922440a52ab564a50b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1209,-848C1209,-848 1087,-848 1087,-848 1081,-848 1075,-842 1075,-836 1075,-836 1075,-824 1075,-824 1075,-818 1081,-812 1087,-812 1087,-812 1209,-812 1209,-812 1215,-812 1221,-818 1221,-824 1221,-824 1221,-836 1221,-836 1221,-842 1215,-848 1209,-848"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-826.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Guillotine Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Guillotine passing",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="7361172893963c864d90140f043f64979e68390a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M667.81,-1154.83C695.27,-1136.16 738.37,-1105.69 773,-1076 790.18,-1061.27 791.06,-1053.79 809,-1040 885.57,-981.13 929.82,-1000.39 997,-931 1020.51,-906.71 1006.8,-885.36 1033,-864 1042.54,-856.23 1053.81,-850.23 1065.49,-845.6"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1066.72,-848.88 1074.93,-842.18 1064.33,-842.3 1066.72,-848.88"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Clears",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Hitting the ball hard enough while off of the wall to clear the ball to the other side of the field.",
                        {
                            text: "waypr0tein",
                            url: "https://www.reddit.com/user/waypr0tein"
                        }
                    ],

                    title: "Wall Clears",
                    upstreamSkills: ["Powershot + Powerclears", "Wall driving", "Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="b92bb096f87c33e3f2fe965b18a4ebdd7374756c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M940,-868C940,-868 866,-868 866,-868 860,-868 854,-862 854,-856 854,-856 854,-844 854,-844 854,-838 860,-832 866,-832 866,-832 940,-832 940,-832 946,-832 952,-838 952,-844 952,-844 952,-856 952,-856 952,-862 946,-868 940,-868"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-846.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Clears"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Powershot + Powerclears"
                }}><GroupWrapper id="c9f4387c8905c55860eef274e62c9c20ac39b475" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M679.4,-1154.87C709.84,-1138.6 750.63,-1111.77 773,-1076 820.66,-999.8 748.82,-943.76 809,-877 818.15,-866.85 830.86,-860.42 843.96,-856.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="845.22,-859.67 853.99,-853.73 843.43,-852.9 845.22,-859.67"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Bounce Powershots"
                }}><GroupWrapper id="7f690d379036991dd5e1a8228d33fdfc5633cd0d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M967.67,-1220.01C977.51,-1222.94 987.55,-1225.99 997,-1229 1026.95,-1238.53 1059.99,-1249.89 1087.42,-1259.56"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1086.28,-1262.87 1096.87,-1262.9 1088.61,-1256.27 1086.28,-1262.87"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powerslide Recovery",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "When landing after an aerial or after being bumped, holding powerslide when landing on the players wheels will allow them to keep their momentum and get back into the game faster."
                    ],

                    title: "Powerslide Recovery",
                    upstreamSkills: ["Powerslide Turning"],
                    downstreamSkills: []
                }}><GroupWrapper id="ccfc412c31f61c5e442aacee30a71f358100b194" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M454,-2369C454,-2369 313,-2369 313,-2369 307,-2369 301,-2363 301,-2357 301,-2357 301,-2345 301,-2345 301,-2339 307,-2333 313,-2333 313,-2333 454,-2333 454,-2333 460,-2333 466,-2339 466,-2345 466,-2345 466,-2357 466,-2357 466,-2363 460,-2369 454,-2369"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-2347.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powerslide Recovery"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powerslide Recovery",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="8eff5a91b6778636663f84b79a0efabc32d0103b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M261.05,-2351C270.74,-2351 280.74,-2351 290.64,-2351"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="290.9,-2354.5 300.9,-2351 290.9,-2347.5 290.9,-2354.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Power Slide Dribble",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "While hood dribbling, start to have the ball turn but, drift back into the ball for a fake.",
                        {
                            text: "Dignitas’s dribbling guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                        }
                    ],

                    title: "Power Slide Dribble",
                    upstreamSkills: ["Powerslide Turning", "Hood dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9cae66b7d691f1ffdcd0d4bd94e7a9313f8dfad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1454,-2735C1454,-2735 1319,-2735 1319,-2735 1313,-2735 1307,-2729 1307,-2723 1307,-2723 1307,-2711 1307,-2711 1307,-2705 1313,-2699 1319,-2699 1319,-2699 1454,-2699 1454,-2699 1460,-2699 1466,-2705 1466,-2711 1466,-2711 1466,-2723 1466,-2723 1466,-2729 1460,-2735 1454,-2735"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2713.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Power Slide Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Powerslide Turning"
                }}><GroupWrapper id="133cd91cdf62e0d7e8a17dd618fc9ff8ba494556" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M191.05,-2369.27C223.85,-2457.13 378.98,-2832 638.5,-2832 638.5,-2832 638.5,-2832 904,-2832 1062.84,-2832 1243.3,-2772.06 1331.37,-2738.73"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1332.78,-2741.93 1340.88,-2735.1 1330.29,-2735.39 1332.78,-2741.93"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rebound shots",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "When the ball hits a wall hard enough to start going towards midfield and the player uses prediction, aerials, and air rolls to score it."
                    ],

                    title: "Rebound shots",
                    upstreamSkills: ["Redirects", "Prediction", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="97cc5b3e3e1b1e8bdeef9ae11de24d6cc3b84c24" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953.5,-1166C953.5,-1166 852.5,-1166 852.5,-1166 846.5,-1166 840.5,-1160 840.5,-1154 840.5,-1154 840.5,-1142 840.5,-1142 840.5,-1136 846.5,-1130 852.5,-1130 852.5,-1130 953.5,-1130 953.5,-1130 959.5,-1130 965.5,-1136 965.5,-1142 965.5,-1142 965.5,-1154 965.5,-1154 965.5,-1160 959.5,-1166 953.5,-1166"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1144.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rebound Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Redirects"
                }}><GroupWrapper id="99fd4fb144afe2c7928adf112338cd2834b8afdd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M682.09,-1222.92C708.87,-1219.24 743.97,-1212.41 773,-1200 790.91,-1192.34 791.42,-1183.38 809,-1175 815.94,-1171.69 823.36,-1168.71 830.88,-1166.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="832.06,-1169.33 840.42,-1162.81 829.82,-1162.69 832.06,-1169.33"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M1178,-2520C1178,-2520 1118,-2520 1118,-2520 1112,-2520 1106,-2514 1106,-2508 1106,-2508 1106,-2496 1106,-2496 1106,-2490 1112,-2484 1118,-2484 1118,-2484 1178,-2484 1178,-2484 1184,-2484 1190,-2490 1190,-2496 1190,-2496 1190,-2508 1190,-2508 1190,-2514 1184,-2520 1178,-2520"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2498.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Zap Dash"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Zap dash",
                    tailId: "Wave dash"
                }}><GroupWrapper id="bdeea73adb652fca8b2394c9e5599e9194668a58" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M950.84,-2281.7C967.52,-2285.33 985.1,-2292.19 997,-2305 1049.56,-2361.59 979.05,-2419.74 1033,-2475 1049.27,-2491.66 1073.78,-2498.82 1095.91,-2501.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1095.57,-2505.13 1105.87,-2502.65 1096.28,-2498.16 1095.57,-2505.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hel-jump",
                    tailId: "Wave dash"
                }}><GroupWrapper id="97ff0192c8fbde6c225ada95c170cd558c6511fa" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M950.87,-2275.36C967.97,-2271.91 985.84,-2264.89 997,-2251 1073.18,-2156.22 954.48,-1797.84 1033,-1705 1048.43,-1686.75 1073.72,-1679.57 1096.56,-1677.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1097.14,-1680.6 1106.83,-1676.33 1096.59,-1673.62 1097.14,-1680.6"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M945,-922C945,-922 861,-922 861,-922 855,-922 849,-916 849,-910 849,-910 849,-898 849,-898 849,-892 855,-886 861,-886 861,-886 945,-886 945,-886 951,-886 957,-892 957,-898 957,-898 957,-910 957,-910 957,-916 951,-922 945,-922"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-900.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Leveling Out"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Leveling out",
                    tailId: "Wall driving"
                }}><GroupWrapper id="763b994b6a045868362a41da8a85f8060c11ef86" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.16,-904C734.14,-904 793.54,-904 838.44,-904"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="838.65,-907.5 848.65,-904 838.65,-900.5 838.65,-907.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Wall driving"
                }}><GroupWrapper id="f9c0ec896be088d2f058793787b28edea2c8310d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.16,-893.33C735.89,-884.3 798.52,-871.37 843.97,-861.98"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="844.88,-865.37 853.97,-859.92 843.47,-858.51 844.88,-865.37"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall catch",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["Stopping or slowing the ball on the wall by dribbling.", {
                        text: "Dignitas’s dribbling guide",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                    }],

                    title: "Wall catch",
                    upstreamSkills: ["Wall driving", "Catching"],
                    downstreamSkills: []
                }}><GroupWrapper id="7ab8dbca628402320020496ca2e50eb5a9962b06" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1182.5,-792C1182.5,-792 1113.5,-792 1113.5,-792 1107.5,-792 1101.5,-786 1101.5,-780 1101.5,-780 1101.5,-768 1101.5,-768 1101.5,-762 1107.5,-756 1113.5,-756 1113.5,-756 1182.5,-756 1182.5,-756 1188.5,-756 1194.5,-762 1194.5,-768 1194.5,-768 1194.5,-780 1194.5,-780 1194.5,-786 1188.5,-792 1182.5,-792"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-770.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Catch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall catch",
                    tailId: "Wall driving"
                }}><GroupWrapper id="bddf6a1f226f3235ec64ef15485c811e8406d053" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M655.35,-885.92C682.17,-854.87 742.16,-792.47 809,-769 903.67,-735.75 1022.65,-749.15 1091.24,-761.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1090.92,-765.21 1101.39,-763.63 1092.22,-758.33 1090.92,-765.21"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doomsee dish",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "When a player push dribbles the ball into the opponent's corner then pops (Hitting the ball in a way where it allows the player to hit it again) it away from the wall to hit it in a way to attempt a shot on goal."
                    ],

                    title: "Doomsee dish",
                    upstreamSkills: ["Wall driving", "Game Awareness", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="e1b011f80eecc4d250648c956021f50aeb0878ae" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1195.5,-966C1195.5,-966 1100.5,-966 1100.5,-966 1094.5,-966 1088.5,-960 1088.5,-954 1088.5,-954 1088.5,-942 1088.5,-942 1088.5,-936 1094.5,-930 1100.5,-930 1100.5,-930 1195.5,-930 1195.5,-930 1201.5,-930 1207.5,-936 1207.5,-942 1207.5,-942 1207.5,-954 1207.5,-954 1207.5,-960 1201.5,-966 1195.5,-966"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-944.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Doomsee Dish"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Wall driving"
                }}><GroupWrapper id="88c81116498b22aca21d7c81489a6a2173751b51" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.3,-913.79C725.53,-919.71 769.66,-926.87 809,-931 901.82,-940.74 1009.58,-944.94 1078.01,-946.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1078.15,-950.23 1088.23,-946.98 1078.32,-943.23 1078.15,-950.23"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling shots",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Having the ball near or bounce off or around the ceiling for a shot on goal."
                    ],

                    title: "Ceiling shots",
                    upstreamSkills: ["Wall driving", "Game Awareness", "Basic aerials"],
                    downstreamSkills: []
                }}><GroupWrapper id="17cc0c6cbc3f34d99fbd108905d9e1c36913221b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1192,-1020C1192,-1020 1104,-1020 1104,-1020 1098,-1020 1092,-1014 1092,-1008 1092,-1008 1092,-996 1092,-996 1092,-990 1098,-984 1104,-984 1104,-984 1192,-984 1192,-984 1198,-984 1204,-990 1204,-996 1204,-996 1204,-1008 1204,-1008 1204,-1014 1198,-1020 1192,-1020"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-998.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Ceiling Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Wall driving"
                }}><GroupWrapper id="91e177a3f75b827e865d124e0fc673b66f860d0f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.05,-920.58C725.19,-930.76 769.3,-943.45 809,-952 902.91,-972.23 1013.26,-986.87 1081.67,-994.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1081.53,-998.41 1091.87,-996.09 1082.34,-991.46 1081.53,-998.41"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Ceiling shuffle",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "Having the car stay on the ceiling by turning in a way that keeps enough friction that it doesn’t fall.",
                        {
                            text: "Mondo’s ceiling shuffle tutorial.",
                            url: "https://www.youtube.com/watch?v=bnNrwTKuh3c"
                        }
                    ],

                    title: "Ceiling shuffle",
                    upstreamSkills: ["Wall driving"],
                    downstreamSkills: []
                }}><GroupWrapper id="45e3dafb9b0a08bbd8690727d4bf6066b874978e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M952,-814C952,-814 854,-814 854,-814 848,-814 842,-808 842,-802 842,-802 842,-790 842,-790 842,-784 848,-778 854,-778 854,-778 952,-778 952,-778 958,-778 964,-784 964,-790 964,-790 964,-802 964,-802 964,-808 958,-814 952,-814"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-792.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Ceiling Shuffle"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Ceiling shuffle",
                    tailId: "Wall driving"
                }}><GroupWrapper id="5d909e64e00333b3088c0a686449d7c5750e065f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M673.98,-885.87C707.47,-868.22 760.8,-841.44 809,-823 816.48,-820.14 824.4,-817.41 832.33,-814.86"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="833.48,-818.16 841.98,-811.84 831.39,-811.48 833.48,-818.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Push dribbling",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Having the ball on the ground and pushing it with the front of the players car.",
                        {
                            text: "Sir Timbers Dribbling Tutorial.",
                            url: "https://www.youtube.com/watch?v=eBmgRPOmh98"
                        }
                    ],

                    title: "Push dribbling",
                    upstreamSkills: ["Ball camera control"],
                    downstreamSkills: ["Hood dribble", "Bounce dribbling", "Turtle Dribbling"]
                }}><GroupWrapper id="1f89633229d14b505f218fdea712129e5d18d1dd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M953,-2804C953,-2804 853,-2804 853,-2804 847,-2804 841,-2798 841,-2792 841,-2792 841,-2780 841,-2780 841,-2774 847,-2768 853,-2768 853,-2768 953,-2768 953,-2768 959,-2768 965,-2774 965,-2780 965,-2780 965,-2792 965,-2792 965,-2798 959,-2804 953,-2804"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2782.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Push Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Push dribbling",
                    tailId: "Ball camera control"
                }}><GroupWrapper id="f67d097a22f449d738d7f4193bff7081f66268ba" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M720.74,-2751.34C755.85,-2758.06 796.72,-2765.87 830.75,-2772.38"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="830.13,-2775.82 840.61,-2774.26 831.45,-2768.95 830.13,-2775.82"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtling",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "After a jump, turning the car upside down so that it lands on the hood of the car is turtling. Players can score a goal while doing this and get the turtle shot award."
                    ],

                    title: "Turtling",
                    upstreamSkills: ["Joystick air roll"],
                    downstreamSkills: ["Turtle Dribbling", "Turtle Flick"]
                }}><GroupWrapper id="f6ef1ec4e3cdd633da3819f1cb20f1feee3902c0" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M928,-2188C928,-2188 878,-2188 878,-2188 872,-2188 866,-2182 866,-2176 866,-2176 866,-2164 866,-2164 866,-2158 872,-2152 878,-2152 878,-2152 928,-2152 928,-2152 934,-2152 940,-2158 940,-2164 940,-2164 940,-2176 940,-2176 940,-2182 934,-2188 928,-2188"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2166.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turtling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtling",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="e2b88e6fb7f4839535804f4b80bd508434b1b885" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M669.2,-2049.05C696.22,-2066.18 737.71,-2092.82 773,-2117 789.28,-2128.15 791.26,-2134.34 809,-2143 823.63,-2150.14 840.49,-2155.74 855.8,-2159.94"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="855.04,-2163.36 865.6,-2162.51 856.82,-2156.59 855.04,-2163.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall pinch",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="74a606d5ec07a25bc04d3678938c76caff60933d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M680.23,-2049.08C709.12,-2063.89 747.47,-2087.23 773,-2117 798.38,-2146.59 779.57,-2171.43 809,-2197 819.62,-2206.23 833.24,-2212.31 846.75,-2216.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="845.97,-2219.72 856.54,-2218.88 847.75,-2212.95 845.97,-2219.72"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air roll shots",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="92882808bdf167d4f112fe558aecff84b429732d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M704.53,-2034.24C795.98,-2037.37 957.37,-2036.84 997,-1997 1059.94,-1933.72 1013.7,-1684.14 1033,-1597 1057.46,-1486.57 1110.28,-1362.11 1134.46,-1308.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1137.69,-1309.58 1138.63,-1299.03 1131.32,-1306.7 1137.69,-1309.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backwards aerials",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: ["Hitting the ball in an aerial but, with the car being upside-down."],
                    title: "Backwards aerials",
                    upstreamSkills: ["Joystick air roll", "Basic aerials"],
                    downstreamSkills: ["Tornado spin"]
                }}><GroupWrapper id="dea8a431dbfc07fac1a133f50b3af766ad88409c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.5,-1788C965.5,-1788 840.5,-1788 840.5,-1788 834.5,-1788 828.5,-1782 828.5,-1776 828.5,-1776 828.5,-1764 828.5,-1764 828.5,-1758 834.5,-1752 840.5,-1752 840.5,-1752 965.5,-1752 965.5,-1752 971.5,-1752 977.5,-1758 977.5,-1764 977.5,-1764 977.5,-1776 977.5,-1776 977.5,-1782 971.5,-1788 965.5,-1788"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1766.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Backwards Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backwards aerials",
                    tailId: "Joystick air roll"
                }}><GroupWrapper id="0b0d9c0a52762c08b1de328ec2b54a92242fcc60" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M674.67,-2012.92C704.91,-1995.19 747.99,-1965.43 773,-1928 806.55,-1877.8 766.61,-1840 809,-1797 812.21,-1793.75 815.78,-1790.88 819.61,-1788.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="821.41,-1791.36 828.35,-1783.35 817.93,-1785.28 821.41,-1791.36"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Speed flipping",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="2118c598e1936c0f53e31153b466368cabb9ab14" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M716.14,-2618.69C751.97,-2612.39 794.56,-2604.9 829.93,-2598.68"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="830.93,-2602.06 840.18,-2596.88 829.72,-2595.16 830.93,-2602.06"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Stalling",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: ["Using the air roll left button to cancel a flip.", {
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
                    upstreamSkills: ["Directional air roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="a9f7b99a1949e67ad3915822fb4c785629eab00c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M927,-2750C927,-2750 879,-2750 879,-2750 873,-2750 867,-2744 867,-2738 867,-2738 867,-2726 867,-2726 867,-2720 873,-2714 879,-2714 879,-2714 927,-2714 927,-2714 933,-2714 939,-2720 939,-2726 939,-2726 939,-2738 939,-2738 939,-2744 933,-2750 927,-2750"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2728.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Stalling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Stalling",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="6c6cb72f92935a8705a3f0424613374a52fa09fd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M678.43,-2650.07C712.22,-2665.77 763.26,-2688.53 809,-2705 824.44,-2710.56 841.63,-2715.81 856.99,-2720.17"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="856.2,-2723.58 866.78,-2722.9 858.09,-2716.84 856.2,-2723.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bunny hopping",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "An advanced version of wave dashing but, when landing holding air roll when flipping allowing for wave dashing in faster succession.",
                        {
                            text: "Shippotv’s bunny hop tutorial.",
                            url: "https://www.youtube.com/watch?v=p2PkJ3OyjXU"
                        }
                    ],

                    title: "Bunny hopping",
                    upstreamSkills: ["Directional air roll"],
                    downstreamSkills: []
                }}><GroupWrapper id="da8643db0fba88c2799215c0b1b595c0b8e3c51a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M955,-2696C955,-2696 851,-2696 851,-2696 845,-2696 839,-2690 839,-2684 839,-2684 839,-2672 839,-2672 839,-2666 845,-2660 851,-2660 851,-2660 955,-2660 955,-2660 961,-2660 967,-2666 967,-2672 967,-2672 967,-2684 967,-2684 967,-2690 961,-2696 955,-2696"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-2674.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bunny Hopping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bunny hopping",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="5c24ee50eadb8367b58a63ebd7aba3aeba9829fe" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M716.14,-2645.31C751.56,-2651.54 793.58,-2658.93 828.7,-2665.11"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="828.44,-2668.61 838.89,-2666.9 829.65,-2661.72 828.44,-2668.61"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M1618.5,-1696C1618.5,-1696 1531.5,-1696 1531.5,-1696 1525.5,-1696 1519.5,-1690 1519.5,-1684 1519.5,-1684 1519.5,-1672 1519.5,-1672 1519.5,-1666 1525.5,-1660 1531.5,-1660 1531.5,-1660 1618.5,-1660 1618.5,-1660 1624.5,-1660 1630.5,-1666 1630.5,-1672 1630.5,-1672 1630.5,-1684 1630.5,-1684 1630.5,-1690 1624.5,-1696 1618.5,-1696"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-1674.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Tornado Spin"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Directional air roll"
                }}><GroupWrapper id="78aa13f7936aab916925ecbebe2ff683e64c6d1d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M716.16,-2632.95C788.71,-2632.69 901.05,-2629.22 997,-2613 1105.8,-2594.61 1402.5,-2559.05 1474,-2475 1517.08,-2424.36 1501.78,-2243.97 1510,-2178 1532.38,-1998.39 1560.37,-1782.63 1570.3,-1706.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1573.81,-1706.52 1571.63,-1696.16 1566.87,-1705.62 1573.81,-1706.52"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Flip resets",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "Hitting anything with the bottom of the car on all of the wheels at once to reset the flip timer on the car. Mainly used for ceiling shots, flip resets can also be used with dribbling and redirects.",
                        {
                            text: "Sir Classy Flip Reset Tutorial.",
                            url: "https://www.youtube.com/watch?v=TFNzBRRda7k"
                        },
                        {
                            text: "Kronovi Ceiling shot & Flip reset tutorial.",
                            url: "https://www.youtube.com/watch?v=TbIqMoPTvEA&t=301s"
                        },
                        {
                            text: "FLuuMP flip reset tutorial.",
                            url: "https://www.youtube.com/watch?v=kDhYkOlXrxM&t=24s"
                        }
                    ],

                    title: "Flip resets",
                    upstreamSkills: ["Flip window"],
                    downstreamSkills: []
                }}><GroupWrapper id="0fe3247bc2c9e35723c70886c2da1c9b57cf642b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M939.5,-1988C939.5,-1988 866.5,-1988 866.5,-1988 860.5,-1988 854.5,-1982 854.5,-1976 854.5,-1976 854.5,-1964 854.5,-1964 854.5,-1958 860.5,-1952 866.5,-1952 866.5,-1952 939.5,-1952 939.5,-1952 945.5,-1952 951.5,-1958 951.5,-1964 951.5,-1964 951.5,-1976 951.5,-1976 951.5,-1982 945.5,-1988 939.5,-1988"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1966.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Flip Resets"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Flip resets",
                    tailId: "Flip window"
                }}><GroupWrapper id="3afc56c662b85082767d2e1dfb1268c22473e11f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.54,-1913.03C717.02,-1918.83 746.57,-1926.02 773,-1933 786.8,-1936.64 816.95,-1945.28 844.64,-1953.29"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="843.72,-1956.67 854.29,-1956.09 845.66,-1949.94 843.72,-1956.67"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rumble - UFO Shots",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "When using spikes in rumble, the player spikes the ball with all four of their wheels, allowing for infinite flip resets.",
                        {
                            text: "Likuru’s video on UFO shots.",
                            url: "https://www.youtube.com/watch?v=fI1Qry4LqKY"
                        }
                    ],

                    title: "Rumble - UFO Shots",
                    upstreamSkills: ["Flip window"],
                    downstreamSkills: []
                }}><GroupWrapper id="17075a55ee3dc99408922e99aa3b9d8397b11618" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M972.5,-1934C972.5,-1934 833.5,-1934 833.5,-1934 827.5,-1934 821.5,-1928 821.5,-1922 821.5,-1922 821.5,-1910 821.5,-1910 821.5,-1904 827.5,-1898 833.5,-1898 833.5,-1898 972.5,-1898 972.5,-1898 978.5,-1898 984.5,-1904 984.5,-1910 984.5,-1910 984.5,-1922 984.5,-1922 984.5,-1928 978.5,-1934 972.5,-1934"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1912.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rumble - UFO Shots"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rumble - UFO Shots",
                    tailId: "Flip window"
                }}><GroupWrapper id="0250975e69ab579c1a04a079b5a1a0e21c674911" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M692.79,-1904C726.66,-1905.94 771.67,-1908.52 811.26,-1910.8"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="811.28,-1914.3 821.47,-1911.38 811.68,-1907.31 811.28,-1914.3"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Zap dash",
                    tailId: "Speed flipping"
                }}><GroupWrapper id="d76756184096fb581ac06959e244cb32f1f993a4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M945.39,-2567.97C970.49,-2557.38 1003.29,-2544.13 1033,-2534 1053.39,-2527.05 1076.19,-2520.43 1096.01,-2515.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1097.03,-2518.38 1105.77,-2512.4 1095.21,-2511.62 1097.03,-2518.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Doinking",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "When you are under the ball and just kind of 'pop it', not so much a new direction, but adding speed to the ball by doing so.",
                        {
                            text: "SuParButinHd’s 10 pro skills video.",
                            url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                        }
                    ],

                    title: "Doinking",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: ["Spring Roll"]
                }}><GroupWrapper id="22b7d554e91104658d1fd7dd53c5509ac0553f92" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M931,-1696C931,-1696 875,-1696 875,-1696 869,-1696 863,-1690 863,-1684 863,-1684 863,-1672 863,-1672 863,-1666 869,-1660 875,-1660 875,-1660 931,-1660 931,-1660 937,-1660 943,-1666 943,-1672 943,-1672 943,-1684 943,-1684 943,-1690 937,-1696 931,-1696"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1674.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Doinking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Doinking"
                }}><GroupWrapper id="f74ec4708b4af8a62b07acaf86411af898938406" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M943.04,-1669.32C982.58,-1660.54 1044.18,-1646.85 1089.34,-1636.81"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1090.29,-1640.19 1099.29,-1634.6 1088.77,-1633.36 1090.29,-1640.19"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kuxir pinch",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["Pinching the ball against the wall to make a shot on goal.", {
                        text: "Helvetiagaming's kuxir pinch tutorial.",
                        url: "https://www.youtube.com/watch?v=aYuTibfTZ4M"
                    }],

                    title: "Kuxir pinch",
                    upstreamSkills: ["Wall pinch"],
                    downstreamSkills: ["Hoops - Basket Pinch"]
                }}><GroupWrapper id="19f714137c3551fd679698d1528df94f691d1694" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1186,-2242C1186,-2242 1110,-2242 1110,-2242 1104,-2242 1098,-2236 1098,-2230 1098,-2230 1098,-2218 1098,-2218 1098,-2212 1104,-2206 1110,-2206 1110,-2206 1186,-2206 1186,-2206 1192,-2206 1198,-2212 1198,-2218 1198,-2218 1198,-2230 1198,-2230 1198,-2236 1192,-2242 1186,-2242"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2220.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Kuxir Pinch"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Hoops - Basket Pinch",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Pinching the ball against the rim of the goal to kuxir pinch and attempt to score.",
                        {
                            text: "Hoops net pinch example",
                            url: "https://streamable.com/y3nme"
                        }
                    ],

                    title: "Hoops - Basket Pinch",
                    upstreamSkills: ["Kuxir pinch"],
                    downstreamSkills: []
                }}><GroupWrapper id="9d18007d3de438d638a68348f5957c2bde716b8f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1458.5,-2242C1458.5,-2242 1314.5,-2242 1314.5,-2242 1308.5,-2242 1302.5,-2236 1302.5,-2230 1302.5,-2230 1302.5,-2218 1302.5,-2218 1302.5,-2212 1308.5,-2206 1314.5,-2206 1314.5,-2206 1458.5,-2206 1458.5,-2206 1464.5,-2206 1470.5,-2212 1470.5,-2218 1470.5,-2218 1470.5,-2230 1470.5,-2230 1470.5,-2236 1464.5,-2242 1458.5,-2242"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2220.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hoops - Basket Pinch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hoops - Basket Pinch",
                    tailId: "Kuxir pinch"
                }}><GroupWrapper id="e2579cb88734ffd2d7fb450753917b52053100b1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1198,-2224C1225.11,-2224 1259.7,-2224 1291.78,-2224"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1292.09,-2227.5 1302.09,-2224 1292.09,-2220.5 1292.09,-2227.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Dribbling",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: ["A type of push dribble, where the player is turtling while dribbling."],
                    title: "Turtle Dribbling",
                    upstreamSkills: ["Turtling", "Push dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="0a0ec5499fd29060e4849605f069cc89d07aebab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1202,-2377C1202,-2377 1094,-2377 1094,-2377 1088,-2377 1082,-2371 1082,-2365 1082,-2365 1082,-2353 1082,-2353 1082,-2347 1088,-2341 1094,-2341 1094,-2341 1202,-2341 1202,-2341 1208,-2341 1214,-2347 1214,-2353 1214,-2353 1214,-2365 1214,-2365 1214,-2371 1208,-2377 1202,-2377"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2355.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turtle Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Turtling"
                }}><GroupWrapper id="c9e95ffab6a02abd861459b79c033ee19ec33712" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M940.17,-2174.48C958.56,-2178.17 980.46,-2184.87 997,-2197 1020.26,-2214.06 1014.41,-2228.94 1033,-2251 1059.04,-2281.91 1093.15,-2313.23 1117.25,-2334.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1115.15,-2336.94 1125.01,-2340.8 1119.71,-2331.63 1115.15,-2336.94"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Turtle Flick",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "After popping the ball into the air, the player starts turtling then jumps when the ball almost hits the ground to flick it.",
                        {
                            text: "R.C Freestylers Reuben Turtle Flick tutorial",
                            url: "https://www.youtube.com/watch?v=JFRvlROxcCQ"
                        }
                    ],

                    title: "Turtle Flick",
                    upstreamSkills: ["Turtling"],
                    downstreamSkills: []
                }}><GroupWrapper id="d694e122c43be2d97de647a2a32990e547b54583" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1185.5,-2188C1185.5,-2188 1110.5,-2188 1110.5,-2188 1104.5,-2188 1098.5,-2182 1098.5,-2176 1098.5,-2176 1098.5,-2164 1098.5,-2164 1098.5,-2158 1104.5,-2152 1110.5,-2152 1110.5,-2152 1185.5,-2152 1185.5,-2152 1191.5,-2152 1197.5,-2158 1197.5,-2164 1197.5,-2164 1197.5,-2176 1197.5,-2176 1197.5,-2182 1191.5,-2188 1185.5,-2188"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2166.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Turtle Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Turtle Flick",
                    tailId: "Turtling"
                }}><GroupWrapper id="af34872fb0c9c299694b3c45d92970eb48888303" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M940.12,-2170C979.08,-2170 1041.73,-2170 1087.9,-2170"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1088.07,-2173.5 1098.07,-2170 1088.07,-2166.5 1088.07,-2173.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wavedash Kickoff",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["During the kickoff, the player wavedashes to gain speed.", {
                        text: "Dignitas’s guide to kickoffs",
                        url: "http://dignitas.gg/articles/blogs/rocket-league/12642/take-your-rocket-league-gameplay-to-the-next-level-kickoffs"
                    }],

                    title: "Wavedash Kickoff",
                    upstreamSkills: ["Fast Kickoffs"],
                    downstreamSkills: []
                }}><GroupWrapper id="46cec1e55d05a6e20e991106ff55c5e0d10bbe29" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1445.5,-2134C1445.5,-2134 1327.5,-2134 1327.5,-2134 1321.5,-2134 1315.5,-2128 1315.5,-2122 1315.5,-2122 1315.5,-2110 1315.5,-2110 1315.5,-2104 1321.5,-2098 1327.5,-2098 1327.5,-2098 1445.5,-2098 1445.5,-2098 1451.5,-2098 1457.5,-2104 1457.5,-2110 1457.5,-2110 1457.5,-2122 1457.5,-2122 1457.5,-2128 1451.5,-2134 1445.5,-2134"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2112.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wavedash Kickoff"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wavedash Kickoff",
                    tailId: "Fast Kickoffs"
                }}><GroupWrapper id="67d9afd180d6e1f10cc6a76e7f00728105982e64" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1202.08,-2116C1232.31,-2116 1270.82,-2116 1304.74,-2116"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1305.1,-2119.5 1315.1,-2116 1305.1,-2112.5 1305.1,-2119.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Half flipping",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Diagonal backflipping then flicking up on the analog stick or “W” on keyboard when the car is parallel to the floor to invert the direction of the car. This move allows the player to constantly boost throughout.",
                        {
                            text: "Kronovi half flip tutorial.",
                            url: "https://www.youtube.com/watch?v=9920AGZg620"
                        },
                        {
                            text: "Dignitas’s half-flip guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12628/half-flips-where-when-and-how"
                        },
                        {
                            text: "SuParButinHd’s 10 pro skills video.",
                            url: "https://www.youtube.com/watch?v=0ohM0iPynUI&feature=youtu.be"
                        }
                    ],

                    title: "Half flipping",
                    upstreamSkills: ["Flip canceling"],
                    downstreamSkills: ["Forward half flipping"]
                }}><GroupWrapper id="6e456ff83a6fb39702fb4818a12508833212f04e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1191,-2466C1191,-2466 1105,-2466 1105,-2466 1099,-2466 1093,-2460 1093,-2454 1093,-2454 1093,-2442 1093,-2442 1093,-2436 1099,-2430 1105,-2430 1105,-2430 1191,-2430 1191,-2430 1197,-2430 1203,-2436 1203,-2442 1203,-2442 1203,-2454 1203,-2454 1203,-2460 1197,-2466 1191,-2466"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2444.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Half Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Half flipping",
                    tailId: "Flip canceling"
                }}><GroupWrapper id="27e3db83e2cb3f4ddec06f20804f6b0c40463e73" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M962.51,-2482.92C998.71,-2476.07 1045.22,-2467.27 1082.49,-2460.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1083.56,-2463.57 1092.74,-2458.27 1082.26,-2456.69 1083.56,-2463.57"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doinking",
                    tailId: "Popping"
                }}><GroupWrapper id="2c4d9f9f18fcf706152e3f4ba6b7590de8a75010" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M672.04,-1809.91C719.46,-1782.71 809.1,-1731.29 861.35,-1701.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="863.41,-1704.17 870.35,-1696.16 859.93,-1698.1 863.41,-1704.17"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Double touches",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Usually after a pop (Hitting the ball in a way where it allows the player to hit it again,) a double touch is where the player hits the ball off the wall to pass to themselves.",
                        {
                            text: "Ytzi13 Air roll usage comment",
                            url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                        },
                        {
                            text: "Dignitas air rolling guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12633/air-rolling-a-rocket-league-guide-on-effective-aerials"
                        }
                    ],

                    title: "Double touches",
                    upstreamSkills: ["Popping"],
                    downstreamSkills: []
                }}><GroupWrapper id="f0e48d8570476a93f9304a0346a5f0cbf9687edc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M955.5,-1842C955.5,-1842 850.5,-1842 850.5,-1842 844.5,-1842 838.5,-1836 838.5,-1830 838.5,-1830 838.5,-1818 838.5,-1818 838.5,-1812 844.5,-1806 850.5,-1806 850.5,-1806 955.5,-1806 955.5,-1806 961.5,-1806 967.5,-1812 967.5,-1818 967.5,-1818 967.5,-1830 967.5,-1830 967.5,-1836 961.5,-1842 955.5,-1842"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1820.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Double Touches"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Double touches",
                    tailId: "Popping"
                }}><GroupWrapper id="d490c51b781f4314627ff622454f363a65369b60" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M676.59,-1827.45C715.58,-1826.85 778.79,-1825.88 828.37,-1825.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="828.46,-1828.63 838.41,-1824.97 828.35,-1821.63 828.46,-1828.63"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "45 degree flick",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "Usually during a hood dribble, the player pops (Hitting the ball in a way where it allows the player to hit it again) the ball then angles their car to hit the",
                        "ball with the corner of their car for power.",
                        {
                            text: "Avatarmanz 45 Degree Flick Tutorial.",
                            url: "https://www.youtube.com/watch?v=bmnALGzj_LE"
                        },
                        {
                            text: "Dignitas 45-Degree flick guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12789/how-to-master-the-45-degree-flick"
                        }
                    ],

                    title: "45 degree flick",
                    upstreamSkills: ["Popping", "Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="a44c3fda54c2848638e74852c4edfad6b48b6a7b" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1628,-2223C1628,-2223 1522,-2223 1522,-2223 1516,-2223 1510,-2217 1510,-2211 1510,-2211 1510,-2199 1510,-2199 1510,-2193 1516,-2187 1522,-2187 1522,-2187 1628,-2187 1628,-2187 1634,-2187 1640,-2193 1640,-2199 1640,-2199 1640,-2211 1640,-2211 1640,-2217 1634,-2223 1628,-2223"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-2201.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"45 Degree Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "45 degree flick",
                    tailId: "Popping"
                }}><GroupWrapper id="89aab463b2aa42e628b16805c3e43a3f78983a9d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M676.73,-1833.13C754.87,-1844.36 937.01,-1871.54 997,-1889 1217.72,-1953.25 1288,-1953.91 1474,-2089 1508.06,-2113.74 1538.24,-2152.25 1556.31,-2178.03"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1553.64,-2180.32 1562.19,-2186.58 1559.41,-2176.36 1553.64,-2180.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
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
                        d="M677,-506C677,-506 602,-506 602,-506 596,-506 590,-500 590,-494 590,-494 590,-482 590,-482 590,-476 596,-470 602,-470 602,-470 677,-470 677,-470 683,-470 689,-476 689,-482 689,-482 689,-494 689,-494 689,-500 683,-506 677,-506"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-484.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Team Pinch"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kuxir pinch",
                    tailId: "Wall pinch"
                }}><GroupWrapper id="238c61ab422a7413770f10cb5d2481a371395195" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M949.14,-2224C988.19,-2224 1044.95,-2224 1087.67,-2224"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1087.93,-2227.5 1097.93,-2224 1087.93,-2220.5 1087.93,-2227.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Awareness",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Game awareness is keeping track of everything on the field. From if you are being boost starved (when an opponent is taking your goal side boost) to where players are on the field, and if you can win a challenge or not.",
                        {
                            text: "Tutorial by Rocket League Academy",
                            url: "https://www.youtube.com/watch?v=pn0d3BFbbf4"
                        },
                        {
                            text: "Reddit Post by u/dondochaka",
                            url: "https://www.reddit.com/r/RocketLeague/comments/8dyxgj/psa_awareness_is_just_as_more_important_than/"
                        }
                    ],

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
                        d="M961,-414C961,-414 845,-414 845,-414 839,-414 833,-408 833,-402 833,-402 833,-390 833,-390 833,-384 839,-378 845,-378 845,-378 961,-378 961,-378 967,-378 973,-384 973,-390 973,-390 973,-402 973,-402 973,-408 967,-414 961,-414"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-392.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Game Awareness"}</TextWrapper></GroupWrapper></Skill><Skill
                {...{
                    id: "Shadowing",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "When falling back on defense, shadowing allows the player to slow the pace of the game down by staying a moderate distance away from the ball while mimicking the opponent who has control of the ball. Also known as shadow defence.",
                        {
                            text: "Video by SunlessKhan about shadow defence.",
                            url: "https://www.youtube.com/watch?v=2aZA-NCRRgI&vl=en"
                        }
                    ],

                    title: "Shadowing",
                    upstreamSkills: ["Game Awareness", "Positioning"],
                    downstreamSkills: []
                }}><GroupWrapper id="e53555343e30299d84ed9ce47681c9d59614d7fc" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1183.5,-36C1183.5,-36 1112.5,-36 1112.5,-36 1106.5,-36 1100.5,-30 1100.5,-24 1100.5,-24 1100.5,-12 1100.5,-12 1100.5,-6 1106.5,0 1112.5,0 1112.5,0 1183.5,0 1183.5,0 1189.5,0 1195.5,-6 1195.5,-12 1195.5,-12 1195.5,-24 1195.5,-24 1195.5,-30 1189.5,-36 1183.5,-36"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-14.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Shadowing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="21204dd13f3ebc8562e7c30347a6ed2beea4a3b4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.11,-386.13C982.23,-382.12 990.61,-376.59 997,-369 1090.28,-258.13 936.98,-153.5 1033,-45 1047.31,-28.83 1069.34,-21.43 1090.24,-18.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1090.86,-21.76 1100.37,-17.09 1090.03,-14.81 1090.86,-21.76"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent Boost Management",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Mostly used in one verses one games and an advanced version of self boost management; It is the practice of knowing how much boost the opponent currently has at any moment."
                    ],

                    title: "Opponent Boost Management",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="706e36a274b1cefd87f6a0b56902596027196f36" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1251,-522C1251,-522 1045,-522 1045,-522 1039,-522 1033,-516 1033,-510 1033,-510 1033,-498 1033,-498 1033,-492 1039,-486 1045,-486 1045,-486 1251,-486 1251,-486 1257,-486 1263,-492 1263,-498 1263,-498 1263,-510 1263,-510 1263,-516 1257,-522 1251,-522"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-500.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Opponent Boost Management"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent Boost Management",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="86d86f548fb4ae64e6c33c63d7d1a638f3be6a08" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.14,-410.07C981.62,-413.49 989.81,-417.73 997,-423 1020.26,-440.06 1009.32,-460.53 1033,-477 1035.12,-478.47 1037.31,-479.87 1039.55,-481.19"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1038,-484.32 1048.48,-485.9 1041.28,-478.14 1038,-484.32"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Possession Prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="3f2bf2ce818de0032db4a4a2cab7c52c512cd922" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.3,-405.72C982.4,-409.75 990.72,-415.32 997,-423 1058.26,-497.91 972.01,-781.86 1033,-857 1038.47,-863.74 1045.22,-869.19 1052.68,-873.58"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1051.25,-876.77 1061.73,-878.26 1054.46,-870.56 1051.25,-876.77"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Playstyle Reading",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Being able to watch a player and understand their weaknesses and play against them."
                    ],

                    title: "Playstyle Reading",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6e557670f4bc0f5c3a2d75244514eca81de801ad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1208.5,-468C1208.5,-468 1087.5,-468 1087.5,-468 1081.5,-468 1075.5,-462 1075.5,-456 1075.5,-456 1075.5,-444 1075.5,-444 1075.5,-438 1081.5,-432 1087.5,-432 1087.5,-432 1208.5,-432 1208.5,-432 1214.5,-432 1220.5,-438 1220.5,-444 1220.5,-444 1220.5,-456 1220.5,-456 1220.5,-462 1214.5,-468 1208.5,-468"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-446.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Playstyle Reading"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Playstyle Reading",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="20995368ade62436142b3311fab09e973cf901ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.31,-411.4C1002.04,-417.79 1035.59,-425.24 1065.5,-431.89"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1064.96,-435.36 1075.49,-434.11 1066.48,-428.52 1064.96,-435.36"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Kickoff prediction",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: ["Reading the opponent in a 50/50 but during kickoff."],
                    title: "Kickoff prediction",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="f739d0f6e6e90379c4c56d3ccfe6c0f612094445" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1207.5,-414C1207.5,-414 1088.5,-414 1088.5,-414 1082.5,-414 1076.5,-408 1076.5,-402 1076.5,-402 1076.5,-390 1076.5,-390 1076.5,-384 1082.5,-378 1088.5,-378 1088.5,-378 1207.5,-378 1207.5,-378 1213.5,-378 1219.5,-384 1219.5,-390 1219.5,-390 1219.5,-402 1219.5,-402 1219.5,-408 1213.5,-414 1207.5,-414"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-392.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Kickoff Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Kickoff prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="e8f6624f6272b0e403d7efe20e8240e98780eabf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.31,-396C1002.3,-396 1036.18,-396 1066.28,-396"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1066.33,-399.5 1076.33,-396 1066.33,-392.5 1066.33,-399.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Opponent prediction",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Understanding what the opponent will do from experience and responding beforehand."
                    ],

                    title: "Opponent prediction",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b358190da5082ad2e952824b0c66563b8bf3b812" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218,-360C1218,-360 1078,-360 1078,-360 1072,-360 1066,-354 1066,-348 1066,-348 1066,-336 1066,-336 1066,-330 1072,-324 1078,-324 1078,-324 1218,-324 1218,-324 1224,-324 1230,-330 1230,-336 1230,-336 1230,-348 1230,-348 1230,-354 1224,-360 1218,-360"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-338.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Opponent Prediction"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Opponent prediction",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="4f5def919719b5a5d7e006c1d5bcc03154641b15" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.31,-380.6C998.92,-374.91 1028.35,-368.37 1055.63,-362.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1056.56,-365.68 1065.56,-360.1 1055.04,-358.85 1056.56,-365.68"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Boost Stealing",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Taking large boost or dollars (another name for large boost) at the opponents goal side."
                    ],

                    title: "Boost Stealing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="4dc40bb7caf9fed2ed66bb13f46fbb1df2387ff2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1196.5,-306C1196.5,-306 1099.5,-306 1099.5,-306 1093.5,-306 1087.5,-300 1087.5,-294 1087.5,-294 1087.5,-282 1087.5,-282 1087.5,-276 1093.5,-270 1099.5,-270 1099.5,-270 1196.5,-270 1196.5,-270 1202.5,-270 1208.5,-276 1208.5,-282 1208.5,-282 1208.5,-294 1208.5,-294 1208.5,-300 1202.5,-306 1196.5,-306"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-284.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Boost Stealing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Boost Stealing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cb3916ed6895d30b621b55760369746d38aca7bf" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.14,-381.93C981.62,-378.51 989.81,-374.27 997,-369 1020.26,-351.94 1009.32,-331.47 1033,-315 1046.01,-305.95 1061.67,-299.91 1077.15,-295.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1078.33,-299.2 1087.27,-293.51 1076.73,-292.38 1078.33,-299.2"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Clear Prevention",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Being able to predict where the ball will be cleared and try to keep the ball in the opponent's side."
                    ],

                    title: "Clear Prevention",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="5ea77ad958d862ae971aa72ce8101208cc8fd5b6" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1204.5,-252C1204.5,-252 1091.5,-252 1091.5,-252 1085.5,-252 1079.5,-246 1079.5,-240 1079.5,-240 1079.5,-228 1079.5,-228 1079.5,-222 1085.5,-216 1091.5,-216 1091.5,-216 1204.5,-216 1204.5,-216 1210.5,-216 1216.5,-222 1216.5,-228 1216.5,-228 1216.5,-240 1216.5,-240 1216.5,-246 1210.5,-252 1204.5,-252"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-230.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Clear Prevention"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Clear Prevention",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b4b3e97ec498cd1c679051ecdd4af42abf11f05b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.17,-384.26C981.95,-380.49 990.21,-375.53 997,-369 1033.47,-333.93 995.66,-295.15 1033,-261 1043.27,-251.61 1056.18,-245.31 1069.6,-241.12"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1070.71,-244.45 1079.43,-238.43 1068.86,-237.7 1070.71,-244.45"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cherry picking",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Usually during infield passes, the player angles a powershot during an aerial for a shot on goal."
                    ],

                    title: "Cherry picking",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="b18dcf1bf8d0f5cecb3079a28bfad5b15164a811" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1197.5,-198C1197.5,-198 1098.5,-198 1098.5,-198 1092.5,-198 1086.5,-192 1086.5,-186 1086.5,-186 1086.5,-174 1086.5,-174 1086.5,-168 1092.5,-162 1098.5,-162 1098.5,-162 1197.5,-162 1197.5,-162 1203.5,-162 1209.5,-168 1209.5,-174 1209.5,-174 1209.5,-186 1209.5,-186 1209.5,-192 1203.5,-198 1197.5,-198"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-176.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Cherry Picking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cherry picking",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="6ed1c637384cc9a334843c2a35aeb18256a48035" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.34,-385.09C982.2,-381.2 990.44,-375.99 997,-369 1047.46,-315.21 981.21,-259.51 1033,-207 1044.59,-195.25 1060.29,-188.23 1076.33,-184.13"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1077.3,-187.5 1086.32,-181.94 1075.8,-180.66 1077.3,-187.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Corner pass",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Hitting or rolling the ball into the opponent's corner with the purpose to get the ball in front of the goal for a pass."
                    ],

                    title: "Corner pass",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="51a5e5c46fb1d44a5bf47841bef257507504eff4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1187.5,-144C1187.5,-144 1108.5,-144 1108.5,-144 1102.5,-144 1096.5,-138 1096.5,-132 1096.5,-132 1096.5,-120 1096.5,-120 1096.5,-114 1102.5,-108 1108.5,-108 1108.5,-108 1187.5,-108 1187.5,-108 1193.5,-108 1199.5,-114 1199.5,-120 1199.5,-120 1199.5,-132 1199.5,-132 1199.5,-138 1193.5,-144 1187.5,-144"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-122.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Corner Pass"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Corner pass",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="461158952042e2b2d3d40833ee16ebb46418a4d8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.21,-385.61C982.2,-381.66 990.52,-376.29 997,-369 1061.66,-296.26 966.54,-224.1 1033,-153 1046.72,-138.32 1066.83,-130.95 1086.35,-127.43"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1087.09,-130.86 1096.46,-125.93 1086.06,-123.94 1087.09,-130.86"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Powershot passing",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Clearing from the players side of the field to an teammate in midfield (between the players goal and the opponents goal) or near the opponents goal.",
                        {
                            text: "Dignitas’s Power shot guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/13229/take-your-rocket-league-gameplay-to-the-next-level-powershots"
                        }
                    ],

                    title: "Powershot passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="04c45cc997fa47189f5c85cf56f1bfcad9a0654f" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1211.5,-90C1211.5,-90 1084.5,-90 1084.5,-90 1078.5,-90 1072.5,-84 1072.5,-78 1072.5,-78 1072.5,-66 1072.5,-66 1072.5,-60 1078.5,-54 1084.5,-54 1084.5,-54 1211.5,-54 1211.5,-54 1217.5,-54 1223.5,-60 1223.5,-66 1223.5,-66 1223.5,-78 1223.5,-78 1223.5,-84 1217.5,-90 1211.5,-90"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-68.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Powershot Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Powershot passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="73177d9443084b5fe018c1d95df1c3f588c7d818" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.43,-385.8C982.39,-381.82 990.64,-376.39 997,-369 1075.95,-277.22 951.78,-188.78 1033,-99 1041.05,-90.1 1051.44,-83.87 1062.67,-79.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1063.88,-82.84 1072.26,-76.36 1061.67,-76.2 1063.88,-82.84"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Backboard passing",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Hitting the ball against the wall above the opponent’s goal with the intent for a pass."
                    ],

                    title: "Backboard passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="7c745c1619ce496adb98ad777a43ffab482afad4" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1212,-684C1212,-684 1084,-684 1084,-684 1078,-684 1072,-678 1072,-672 1072,-672 1072,-660 1072,-660 1072,-654 1078,-648 1084,-648 1084,-648 1212,-648 1212,-648 1218,-648 1224,-654 1224,-660 1224,-660 1224,-672 1224,-672 1224,-678 1218,-684 1212,-684"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-662.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Backboard Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Backboard passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="9bbc79b2c3b8d3750a50d19d48dcdbbc70c3991b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.21,-406.39C982.2,-410.34 990.52,-415.71 997,-423 1061.66,-495.74 966.54,-567.9 1033,-639 1041,-647.56 1051.18,-653.64 1062.14,-657.91"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1061.35,-661.34 1071.95,-661.22 1063.59,-654.71 1061.35,-661.34"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Back-passing",
                    isUnnecessary: false,
                    isRecommended: true,
                    notes: ["Hitting the ball towards an teammate closer to goal."],
                    title: "Back-passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="6dbb66d80f6a9020c7a2bd3cd6e334226b358b0d" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1191,-630C1191,-630 1105,-630 1105,-630 1099,-630 1093,-624 1093,-618 1093,-618 1093,-606 1093,-606 1093,-600 1099,-594 1105,-594 1105,-594 1191,-594 1191,-594 1197,-594 1203,-600 1203,-606 1203,-606 1203,-618 1203,-618 1203,-624 1197,-630 1191,-630"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-608.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Back-passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Back-passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="d13f3701214bb777840e3fb34cd86a1f8bd83764" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.34,-406.91C982.2,-410.8 990.44,-416.01 997,-423 1047.46,-476.79 981.21,-532.49 1033,-585 1046.13,-598.32 1064.55,-605.55 1082.75,-609.35"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1082.34,-612.84 1092.8,-611.13 1083.56,-605.94 1082.34,-612.84"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Infield passing",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Hitting the ball towards an teammate in midfield (between the players goal and the opponents goal.)"
                    ],

                    title: "Infield passing",
                    upstreamSkills: ["Game Awareness"],
                    downstreamSkills: []
                }}><GroupWrapper id="19ffb85246b85d1c44fbe34397993326cba4856e" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1196.5,-576C1196.5,-576 1099.5,-576 1099.5,-576 1093.5,-576 1087.5,-570 1087.5,-564 1087.5,-564 1087.5,-552 1087.5,-552 1087.5,-546 1093.5,-540 1099.5,-540 1099.5,-540 1196.5,-540 1196.5,-540 1202.5,-540 1208.5,-546 1208.5,-552 1208.5,-552 1208.5,-564 1208.5,-564 1208.5,-570 1202.5,-576 1196.5,-576"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-554.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Infield Passing"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Infield passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="45961b3c10fe38e8bdc7b6a52f83abd5a8896dd1" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.17,-407.74C981.95,-411.51 990.21,-416.47 997,-423 1033.47,-458.07 995.66,-496.85 1033,-531 1045.24,-542.2 1061.26,-549 1077.4,-553.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1076.91,-556.55 1087.43,-555.27 1078.41,-549.71 1076.91,-556.55"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Guillotine passing",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="b005fdaa002b8f52350e95e56a2474fa71b071f6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.22,-405.79C982.32,-409.81 990.67,-415.36 997,-423 1050.81,-487.99 978.11,-736.92 1033,-801 1041.52,-810.95 1052.93,-817.73 1065.25,-822.31"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1064.22,-825.66 1074.81,-825.4 1066.37,-819 1064.22,-825.66"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Spring Roll",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="ce96d7f23d91250787935e64e821ff1ea5fe14e0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.13,-405.28C982.37,-409.36 990.78,-415.06 997,-423 1057.68,-500.48 1014.08,-1211.42 1033,-1308 1054.69,-1418.72 1108.7,-1542.56 1133.8,-1596.46"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1130.71,-1598.13 1138.13,-1605.69 1137.05,-1595.15 1130.71,-1598.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="cdd8d95c5408a6d51155d7141ff7f6c1b55bd653" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.37,-405.66C982.46,-409.7 990.76,-415.29 997,-423 1066.39,-508.73 962.54,-833.15 1033,-918 1044.31,-931.62 1061,-939.46 1078.14,-943.87"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1077.72,-947.37 1088.24,-946.09 1079.22,-940.53 1077.72,-947.37"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Game Awareness"
                }}><GroupWrapper id="aa8fbdc7897fcfac22ecf32c76380b4325889b5b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M973.42,-405.62C982.5,-409.66 990.79,-415.27 997,-423 1073.98,-518.84 953.65,-881.11 1033,-975 1045.19,-989.42 1063.52,-996.93 1081.95,-1000.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1081.41,-1004.11 1091.85,-1002.31 1082.57,-997.2 1081.41,-1004.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Shadowing",
                    tailId: "Positioning"
                }}><GroupWrapper id="26d39c2706f7dff1eab4875355a404b12dd1f07a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M220.86,-387.87C336.78,-330.66 709.05,-151.42 1033,-45 1051.51,-38.92 1072.13,-33.61 1090.68,-29.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1091.48,-32.75 1100.47,-27.15 1089.94,-25.92 1091.48,-32.75"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Teammate Awareness",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: ["Being  able to watch and react to a teammate/s location on the field.", {
                        text: "Jammicus’s awareness + teamplay tutorial.",
                        url: "https://www.youtube.com/watch?v=zvQFR_3s-0k"
                    }],

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
                        d="M458,-460C458,-460 309,-460 309,-460 303,-460 297,-454 297,-448 297,-448 297,-436 297,-436 297,-430 303,-424 309,-424 309,-424 458,-424 458,-424 464,-424 470,-430 470,-436 470,-436 470,-448 470,-448 470,-454 464,-460 458,-460"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="383.5"
                        y="-438.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Teammate Awareness"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Teammate Awareness",
                    tailId: "Positioning"
                }}><GroupWrapper id="a9a17bcbe95848ce2fbe64466fe7579b0df9f2dd" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M231.67,-414.58C248.33,-417.61 267.71,-421.13 286.92,-424.62"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="286.47,-428.1 296.94,-426.44 287.72,-421.21 286.47,-428.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Rotation",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Rotation is the art of combining Positioning and Teammate Awareness which allows for faster game speed, teamwork, and passing plays.",
                        {
                            text: "SunlessKhan’s tutorial video.",
                            url: "https://www.youtube.com/watch?v=THcMLWOEc_o&vl=en"
                        },
                        {
                            text: "Graph by u/lmfao__schwarz.",
                            url: "https://www.reddit.com/r/RocketLeague/comments/5stuiu/an_infographic_of_more_correct_positioning_and/"
                        },
                        {
                            text: "Allstar IV’s 3 v 3 rotation tutorial.",
                            url: "https://www.youtube.com/watch?v=YQvlIwJZePE"
                        },
                        {
                            text: "Allstar IV’s 2 v 2 rotation tutorial.",
                            url: "https://www.youtube.com/watch?v=vHiTUOKDqfE"
                        },
                        {
                            text: "Dignitas’s 1v1 guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/12629/becoming-the-best-solo-duel-a-high-level-1v1-guide"
                        }
                    ],

                    title: "Rotation",
                    upstreamSkills: ["Positioning", "Teammate Awareness"],
                    downstreamSkills: ["Game Awareness", "Self Boost Management"]
                }}><GroupWrapper id="96df7e6ae52ce92ca621526e553a7673744a55f2" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M666,-360C666,-360 613,-360 613,-360 607,-360 601,-354 601,-348 601,-348 601,-336 601,-336 601,-330 607,-324 613,-324 613,-324 666,-324 666,-324 672,-324 678,-330 678,-336 678,-336 678,-348 678,-348 678,-354 672,-360 666,-360"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-338.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Rotation"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Positioning"
                }}><GroupWrapper id="a427c282c94acc51433e7494a2c9cbe0a942c74c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M231.8,-399.33C318.86,-387.06 503.52,-361.03 590.84,-348.72"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="591.33,-352.18 600.75,-347.32 590.35,-345.25 591.33,-352.18"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Team pinch",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="ba3e3f3aec20599a233ce03099dfe7218b1137d6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M470.14,-457.51C506.14,-464.03 547.11,-471.45 579.63,-477.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="579.4,-480.85 589.87,-479.19 580.65,-473.97 579.4,-480.85"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="6fa49c5829505d35fa1ab40353a79027f811101a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M470.1,-441.67C549.05,-440.46 669.35,-436.3 773,-423 789.16,-420.93 806.32,-417.92 822.66,-414.65"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="823.62,-418.03 832.71,-412.59 822.22,-411.17 823.62,-418.03"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rotation",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="e28ebf8d1f01dc0e418be90fdb1bf793bea2d8fb" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M408.8,-423.98C432.45,-407.29 469.99,-383.01 506,-369 533.23,-358.4 565.31,-351.73 591.08,-347.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="591.61,-351.13 600.98,-346.18 590.58,-344.2 591.61,-351.13"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Hoops - Friendship / fusion Kickoff",
                    tailId: "Teammate Awareness"
                }}><GroupWrapper id="ea4238ca45b3842e8fbae81d40e6b537dc4c4aae" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M385.22,-460.33C388.62,-527.94 407.4,-767.77 506,-931 529.77,-970.36 570.87,-1003.93 601.01,-1025.09"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="599.36,-1028.21 609.58,-1030.99 603.32,-1022.44 599.36,-1028.21"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Rotation"
                }}><GroupWrapper id="2179051b6b220f67738b5881612b5c4bd33724ed" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M678.21,-349.63C704.73,-355.01 741.04,-362.4 773,-369 789.05,-372.32 806.22,-375.89 822.62,-379.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="822.22,-382.81 832.72,-381.43 823.65,-375.96 822.22,-382.81"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Self Boost Management",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Keeping track of how much boost the player has while picking up small pennies (smaller boost pads in the field.)"
                    ],

                    title: "Self Boost Management",
                    upstreamSkills: ["Rotation"],
                    downstreamSkills: []
                }}><GroupWrapper id="e6eb7a78d9abbbc4245ab4f3ab258b6f827e13ff" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M985,-360C985,-360 821,-360 821,-360 815,-360 809,-354 809,-348 809,-348 809,-336 809,-336 809,-330 815,-324 821,-324 821,-324 985,-324 985,-324 991,-324 997,-330 997,-336 997,-336 997,-348 997,-348 997,-354 991,-360 985,-360"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-338.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Self Boost Management"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Self Boost Management",
                    tailId: "Rotation"
                }}><GroupWrapper id="73746e89f85b52d1f9d9a4f84871bea6859d5c75" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M678.25,-342C709.8,-342 756.35,-342 798.82,-342"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="798.95,-345.5 808.95,-342 798.95,-338.5 798.95,-345.5"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Game Speed",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: ["The general speed that each player is constantly going.", {
                        text: "FLuuMP’s game speed tutorial.",
                        url: "https://www.youtube.com/watch?v=wCuL8ILJye0"
                    }, {
                        text: "Amustycow’s game speed tutorial.",
                        url: "https://www.youtube.com/watch?v=IUvJvlv9r4o"
                    }],

                    title: "Game Speed",
                    upstreamSkills: [],
                    downstreamSkills: ["Game Awareness"]
                }}><GroupWrapper id="c47f3d4df7d8556cd1bf2b526a12ce140a896a94" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M681,-414C681,-414 598,-414 598,-414 592,-414 586,-408 586,-402 586,-402 586,-390 586,-390 586,-384 592,-378 598,-378 598,-378 681,-378 681,-378 687,-378 693,-384 693,-390 693,-390 693,-402 693,-402 693,-408 687,-414 681,-414"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="639.5"
                        y="-392.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Game Speed"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Game Speed"
                }}><GroupWrapper id="630e285f11754702182280c9673f6d7525052569" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693.1,-396C730.17,-396 780.47,-396 822.42,-396"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="822.61,-399.5 832.61,-396 822.61,-392.5 822.61,-399.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Game Awareness",
                    tailId: "Prediction"
                }}><GroupWrapper id="2fbce5d5cb08c9e3b5b28c5b2e122d00c7b59e01" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M665.92,-620.84C695.23,-598.76 743.21,-558.94 773,-515 797.64,-478.66 776.58,-452.61 809,-423 813.37,-419 818.31,-415.6 823.56,-412.69"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="825.2,-415.79 832.66,-408.26 822.14,-409.49 825.2,-415.79"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Pre-Jumping",
                    isUnnecessary: false,
                    isRecommended: false,
                    notes: ["Jumping in expectation of an opponents shot, clear, or save."],
                    title: "Pre-Jumping",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Dunking"]
                }}><GroupWrapper id="31b1c68d0c763bd78d74aa80fa015f89ca816635" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M943.5,-468C943.5,-468 862.5,-468 862.5,-468 856.5,-468 850.5,-462 850.5,-456 850.5,-456 850.5,-444 850.5,-444 850.5,-438 856.5,-432 862.5,-432 862.5,-432 943.5,-432 943.5,-432 949.5,-432 955.5,-438 955.5,-444 955.5,-444 955.5,-456 955.5,-456 955.5,-462 949.5,-468 943.5,-468"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-446.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Pre-Jumping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Pre-Jumping",
                    tailId: "Prediction"
                }}><GroupWrapper id="d4e13a0daae87bc7082db04fd54cc27db9a4a959" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M660.61,-620.88C686.88,-597.04 734.12,-553.64 773,-515 789.5,-498.6 789.14,-489.11 809,-477 818.66,-471.11 829.67,-466.45 840.64,-462.78"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="841.73,-466.11 850.25,-459.81 839.66,-459.42 841.73,-466.11"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Cutting",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "When an opponent is dribbling (keeping the ball close to oneself), the player comes at an angle to the dribble and forces it out of the opponent's possession."
                    ],

                    title: "Cutting",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="750fe6eb4a39e4f1fd5ae30f1e7e0384a489c056" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M926.5,-522C926.5,-522 879.5,-522 879.5,-522 873.5,-522 867.5,-516 867.5,-510 867.5,-510 867.5,-498 867.5,-498 867.5,-492 873.5,-486 879.5,-486 879.5,-486 926.5,-486 926.5,-486 932.5,-486 938.5,-492 938.5,-498 938.5,-498 938.5,-510 938.5,-510 938.5,-516 932.5,-522 926.5,-522"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-500.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Cutting"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Cutting",
                    tailId: "Prediction"
                }}><GroupWrapper id="7a0bd30db6e0621af48c9cc65ab6295c941fb508" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M663.8,-620.96C695.22,-597.38 753.63,-556.14 809,-531 824.19,-524.1 841.59,-518.49 857.19,-514.21"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="858.36,-517.52 867.14,-511.59 856.58,-510.75 858.36,-517.52"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Faking",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Being able to predict a opponent's movements and stop yours in reaction to that prediction."
                    ],

                    title: "Faking",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="cb7144819d80f8b5b3a7e0d5f75f4e1a9642b668" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M923.5,-684C923.5,-684 882.5,-684 882.5,-684 876.5,-684 870.5,-678 870.5,-672 870.5,-672 870.5,-660 870.5,-660 870.5,-654 876.5,-648 882.5,-648 882.5,-648 923.5,-648 923.5,-648 929.5,-648 935.5,-654 935.5,-660 935.5,-660 935.5,-672 935.5,-672 935.5,-678 929.5,-684 923.5,-684"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-662.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Faking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Faking",
                    tailId: "Prediction"
                }}><GroupWrapper id="9cb42e435c1a2484a1d90b27ada123b31d29ed07" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.56,-643.55C733.52,-648.6 811.98,-656.71 860.06,-661.67"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="859.82,-665.16 870.13,-662.71 860.54,-658.2 859.82,-665.16"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Softblock",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Blocking the ball after an opponent shot with the wheels to slow the ball down.",
                        {
                            text: "Ytzi13 Lead offence 3v3 guide",
                            url: "https://www.reddit.com/r/RocketLeague/comments/ab9490/playing_the_first_man_role_a_guide_for_all_skill/?st=JQFHERHK&sh=9ac03a3b"
                        }
                    ],

                    title: "Softblock",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: []
                }}><GroupWrapper id="69add1126959a35c36aa060f4a758a5e3ff23617" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M932.5,-630C932.5,-630 873.5,-630 873.5,-630 867.5,-630 861.5,-624 861.5,-618 861.5,-618 861.5,-606 861.5,-606 861.5,-600 867.5,-594 873.5,-594 873.5,-594 932.5,-594 932.5,-594 938.5,-594 944.5,-600 944.5,-606 944.5,-606 944.5,-618 944.5,-618 944.5,-624 938.5,-630 932.5,-630"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-608.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Softblock"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Softblock",
                    tailId: "Prediction"
                }}><GroupWrapper id="6653f1c7ab683566a092a4bb4dd44dbc5b5e38d5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.56,-634.45C730.63,-629.69 802.83,-622.24 851.25,-617.24"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="851.62,-620.72 861.2,-616.21 850.9,-613.76 851.62,-620.72"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Catching",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Stopping and slowing the ball with a dribble when it hits the ground after being in the air."
                    ],

                    title: "Catching",
                    upstreamSkills: ["Prediction"],
                    downstreamSkills: ["Wall catch"]
                }}><GroupWrapper id="2b9bcf7bbecd708379dfee8a9b9b2044a98476b3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M931,-576C931,-576 875,-576 875,-576 869,-576 863,-570 863,-564 863,-564 863,-552 863,-552 863,-546 869,-540 875,-540 875,-540 931,-540 931,-540 937,-540 943,-546 943,-552 943,-552 943,-564 943,-564 943,-570 937,-576 931,-576"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-554.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Catching"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Catching",
                    tailId: "Prediction"
                }}><GroupWrapper id="02d351bfa707895de9cc91d3f16b92318244efa6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.74,-624.45C718.67,-613.39 766.69,-597.92 809,-585 823.1,-580.69 838.46,-576.17 852.56,-572.08"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="853.92,-575.33 862.56,-569.19 851.98,-568.6 853.92,-575.33"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Prediction"
                }}><GroupWrapper id="9edddb9f9f4947781b86746b9f875bc69a1e8cbc" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M651.21,-657.3C674.29,-696.92 730.08,-793.78 773,-877 818.25,-964.74 867.17,-1071.03 889.55,-1120.37"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="886.48,-1122.06 893.79,-1129.73 892.85,-1119.17 886.48,-1122.06"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce dribbling",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Popping (Hitting the ball in a way where it allows the player to hit it again)  the ball multiple times in a row.",
                        {
                            text: "Dignitas’s dribbling guide",
                            url: "http://dignitas.gg/articles/blogs/rocket-league/13015/advanced-dribbling-techniques-in-rocket-league"
                        },
                        {
                            text: "Sir Timbers AirDribble Tutorial.",
                            url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                        }
                    ],

                    title: "Bounce dribbling",
                    upstreamSkills: ["Prediction", "Push dribbling"],
                    downstreamSkills: ["Bounce to air dribble", "Tornado Flick / Spin", "Breezi Flick"]
                }}><GroupWrapper id="cb5f223c0110f96fa41789e4d7d0a30e93b35cd5" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1206.5,-1750C1206.5,-1750 1089.5,-1750 1089.5,-1750 1083.5,-1750 1077.5,-1744 1077.5,-1738 1077.5,-1738 1077.5,-1726 1077.5,-1726 1077.5,-1720 1083.5,-1714 1089.5,-1714 1089.5,-1714 1206.5,-1714 1206.5,-1714 1212.5,-1714 1218.5,-1720 1218.5,-1726 1218.5,-1726 1218.5,-1738 1218.5,-1738 1218.5,-1744 1212.5,-1750 1206.5,-1750"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1728.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bounce Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce dribbling",
                    tailId: "Prediction"
                }}><GroupWrapper id="18ffd6d5c0815ba52b742a26c23bb8e84655a92f" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M684.57,-653.61C777.81,-684.73 987.36,-755.77 997,-769 1058.3,-853.11 966.88,-1624.62 1033,-1705 1041.89,-1715.81 1054.23,-1722.76 1067.54,-1727.14"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1066.78,-1730.56 1077.36,-1729.9 1068.67,-1723.82 1066.78,-1730.56"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall Clears",
                    tailId: "Prediction"
                }}><GroupWrapper id="6bc6bf6f6cd4304d059809f4565e825bab3d5f13" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M652.05,-657.2C676.43,-694.14 736.89,-778.2 809,-823 819.59,-829.58 831.85,-834.62 843.93,-838.45"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="842.95,-841.81 853.54,-841.27 844.93,-835.09 842.95,-841.81"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Dunking",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Jumping before an opponent's pop (Hitting the ball in a way where it allows the player to hit it again) to get the ball over their head and in the players possession."
                    ],

                    title: "Dunking",
                    upstreamSkills: ["Pre-Jumping"],
                    downstreamSkills: []
                }}><GroupWrapper id="1ce809bfee8fa8ad999a8fad944514ab2a193edd" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1174.5,-738C1174.5,-738 1121.5,-738 1121.5,-738 1115.5,-738 1109.5,-732 1109.5,-726 1109.5,-726 1109.5,-714 1109.5,-714 1109.5,-708 1115.5,-702 1121.5,-702 1121.5,-702 1174.5,-702 1174.5,-702 1180.5,-702 1186.5,-708 1186.5,-714 1186.5,-714 1186.5,-726 1186.5,-726 1186.5,-732 1180.5,-738 1174.5,-738"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-716.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Dunking"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Dunking",
                    tailId: "Pre-Jumping"
                }}><GroupWrapper id="624eb4431d3a01fbcda01962bb9606910f24d20b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M955.98,-454.56C971.17,-458.41 986.5,-465.19 997,-477 1061.66,-549.74 966.54,-621.9 1033,-693 1049.82,-710.99 1076.23,-718 1099.4,-720.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1099.19,-723.89 1109.43,-721.18 1099.73,-716.91 1099.19,-723.89"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Goalie Demos",
                    isUnnecessary: false,
                    isRecommended: true,

                    notes: [
                        "Demoing (demolishing and / or bumping)  a goalie while the opponent is in a defencive position.",
                        {
                            text: "Rocket Sledge’s Goalie Demos tutorial.",
                            url: "https://www.youtube.com/watch?v=qQGh0bvug7o"
                        },
                        {
                            text: "Ytzi13 Air roll usage comment",
                            url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                        }
                    ],

                    title: "Goalie Demos",
                    upstreamSkills: ["Basic Demos"],
                    downstreamSkills: []
                }}><GroupWrapper id="4a28cafe911bf4ae8e044789441ae3d4cd2c6576" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M948.5,-1328C948.5,-1328 857.5,-1328 857.5,-1328 851.5,-1328 845.5,-1322 845.5,-1316 845.5,-1316 845.5,-1304 845.5,-1304 845.5,-1298 851.5,-1292 857.5,-1292 857.5,-1292 948.5,-1292 948.5,-1292 954.5,-1292 960.5,-1298 960.5,-1304 960.5,-1304 960.5,-1316 960.5,-1316 960.5,-1322 954.5,-1328 948.5,-1328"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1306.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Goalie Demos"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Goalie Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="02e51b4e5b1f27760f2c22fdbe3eba01bfd80e33" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693.73,-1326.73C734.6,-1323.44 791.29,-1318.89 835.2,-1315.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="835.53,-1318.85 845.22,-1314.56 834.97,-1311.87 835.53,-1318.85"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Demos",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Demo’s (demolishing and / or bumping) an opponent during their aerial or in the air.",
                        {
                            text: "Amustycow’s air demo tutorial.",
                            url: "https://www.youtube.com/watch?v=XIG84V6ERCA"
                        }
                    ],

                    title: "Air Demos",
                    upstreamSkills: ["Basic Demos", "Basic aerials"],
                    downstreamSkills: ["Air Dribble to Demo"]
                }}><GroupWrapper id="bad725340e6b5269093a4ee7bb2589b16cb4b07c" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M936.5,-1382C936.5,-1382 869.5,-1382 869.5,-1382 863.5,-1382 857.5,-1376 857.5,-1370 857.5,-1370 857.5,-1358 857.5,-1358 857.5,-1352 863.5,-1346 869.5,-1346 869.5,-1346 936.5,-1346 936.5,-1346 942.5,-1346 948.5,-1352 948.5,-1358 948.5,-1358 948.5,-1370 948.5,-1370 948.5,-1376 942.5,-1382 936.5,-1382"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="903"
                        y="-1360.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Demos"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic Demos"
                }}><GroupWrapper id="fe6b2b43b66db6b558febc32a7bfbac1bfff3165" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693.73,-1337.72C738.34,-1343.35 801.8,-1351.35 846.92,-1357.05"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="846.75,-1360.56 857.11,-1358.34 847.63,-1353.61 846.75,-1360.56"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air Dribble to Demo",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Usually a one verses one move, after an air dribble, the player goes towards the opponent to demolish or bump.",
                        {
                            text: "Amustycow’s air demo tutorial.",
                            url: "https://www.youtube.com/watch?v=XIG84V6ERCA"
                        }
                    ],

                    title: "Air Dribble to Demo",
                    upstreamSkills: ["Air Demos", "Air dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="cc0f8509ac5d9e08c6be164a987b56555f0b2005" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1455.5,-1696C1455.5,-1696 1317.5,-1696 1317.5,-1696 1311.5,-1696 1305.5,-1690 1305.5,-1684 1305.5,-1684 1305.5,-1672 1305.5,-1672 1305.5,-1666 1311.5,-1660 1317.5,-1660 1317.5,-1660 1455.5,-1660 1455.5,-1660 1461.5,-1660 1467.5,-1666 1467.5,-1672 1467.5,-1672 1467.5,-1684 1467.5,-1684 1467.5,-1690 1461.5,-1696 1455.5,-1696"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1674.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Dribble To Demo"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble to Demo",
                    tailId: "Air Demos"
                }}><GroupWrapper id="c4e39ecafc958bef406000ddc9296e8f93d2a1c0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M931.98,-1382.05C992.48,-1421.09 1139.94,-1516.38 1263,-1597 1292.25,-1616.16 1325.32,-1638.04 1349.72,-1654.23"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1348.03,-1657.3 1358.3,-1659.92 1351.9,-1651.47 1348.03,-1657.3"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Wall catch",
                    tailId: "Catching"
                }}><GroupWrapper id="04255f1ce01cff07d202d051c087cf16444e85ec" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M943.17,-560.31C961.9,-563.43 983.2,-570.29 997,-585 1047.46,-638.79 981.21,-694.49 1033,-747 1048.22,-762.43 1070.52,-769.69 1091.37,-772.92"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1091.09,-776.41 1101.45,-774.19 1091.97,-769.46 1091.09,-776.41"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Forward half flipping",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "A back flip that is canceled when parallel with the ground. Then air roll to have the wheels hit the ground."
                    ],

                    title: "Forward half flipping",
                    upstreamSkills: ["Half flipping"],
                    downstreamSkills: []
                }}><GroupWrapper id="d4e2f4dd965ce87f034484e11bc002c0f51b4cad" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1462,-2466C1462,-2466 1311,-2466 1311,-2466 1305,-2466 1299,-2460 1299,-2454 1299,-2454 1299,-2442 1299,-2442 1299,-2436 1305,-2430 1311,-2430 1311,-2430 1462,-2430 1462,-2430 1468,-2430 1474,-2436 1474,-2442 1474,-2442 1474,-2454 1474,-2454 1474,-2460 1468,-2466 1462,-2466"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2444.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Forward Half Flipping"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Forward half flipping",
                    tailId: "Half flipping"
                }}><GroupWrapper id="3c4a0763becb7b270f1521194a57cb81990b7454" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.26,-2448C1228.51,-2448 1259.33,-2448 1288.4,-2448"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1288.59,-2451.5 1298.59,-2448 1288.59,-2444.5 1288.59,-2451.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Air Demos",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="78bdf96a28ae2d5fa30ddb36fa10c0123ef2e9d0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.02,-1464.95C719.23,-1458.21 748.97,-1447.95 773,-1433 792.48,-1420.88 789.62,-1408.29 809,-1396 820.83,-1388.49 834.64,-1382.51 847.94,-1377.85"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="849.1,-1381.15 857.49,-1374.68 846.9,-1374.5 849.1,-1381.15"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Aerial Powershot",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="3800ea18673cc16cddd3c4d4de11234809ab25f8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.28,-1470.93C721.43,-1465.62 752.8,-1454.84 773,-1433 819.55,-1382.66 761.67,-1332.61 809,-1283 813.49,-1278.29 818.76,-1274.39 824.45,-1271.16"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="826.27,-1274.16 833.71,-1266.61 823.19,-1267.88 826.27,-1274.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Double jump aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="d64a14ba6ae8d0a80c29e380c9eb93b01b9c3493" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M672.98,-1494.13C706.36,-1512.25 760.21,-1540.07 809,-1559 814.09,-1560.98 819.39,-1562.89 824.76,-1564.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="823.89,-1568.11 834.48,-1567.91 826.08,-1561.46 823.89,-1568.11"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Fast aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="1d02213e3107a4ebb7aa91ceae7b22268523e48d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.05,-1487.47C737.11,-1496.69 797.59,-1509.64 842.22,-1519.2"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="841.55,-1522.63 852.07,-1521.31 843.02,-1515.79 841.55,-1522.63"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Backwards aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="3f235ad3a8524a6801f94ccb9b6dfc7ff26adcb7" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M673.07,-1494.06C703.25,-1512.42 747.25,-1543.58 773,-1582 804.71,-1629.32 775.78,-1658.73 809,-1705 821.13,-1721.9 839.08,-1735.91 855.98,-1746.55"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="854.31,-1749.63 864.68,-1751.8 857.93,-1743.64 854.31,-1749.63"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Sideways aerials",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Hitting the ball in an aerial but, having either side of the car towards the floor."
                    ],

                    title: "Sideways aerials",
                    upstreamSkills: ["Basic aerials", "Air roll shots"],
                    downstreamSkills: ["Tornado spin"]
                }}><GroupWrapper id="bcfeb56f9d582050fe5b94a3c8328133136aba87" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1443.5,-1504C1443.5,-1504 1329.5,-1504 1329.5,-1504 1323.5,-1504 1317.5,-1498 1317.5,-1492 1317.5,-1492 1317.5,-1480 1317.5,-1480 1317.5,-1474 1323.5,-1468 1329.5,-1468 1329.5,-1468 1443.5,-1468 1443.5,-1468 1449.5,-1468 1455.5,-1474 1455.5,-1480 1455.5,-1480 1455.5,-1492 1455.5,-1492 1455.5,-1498 1449.5,-1504 1443.5,-1504"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1482.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Sideways Aerials"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Sideways aerials",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="8130ae266add859e91df1269174e8fe3d4b4c4d9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.08,-1476.72C823.8,-1478.46 1155.24,-1482.91 1307.22,-1484.95"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1307.36,-1488.45 1317.4,-1485.09 1307.45,-1481.45 1307.36,-1488.45"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Rebound shots",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="fadc556dadbe15d619d890597983a84f224b8ef4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M670.4,-1457.86C701.2,-1437.52 748.11,-1401.6 773,-1358 814.1,-1286.01 753.03,-1236.14 809,-1175 815.02,-1168.42 822.54,-1163.41 830.68,-1159.6"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="832.13,-1162.79 840.08,-1155.79 829.5,-1156.3 832.13,-1162.79"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Doomsee dish",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="47c1377f4d0f354dfba0026f47c5378ce578cd6e" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M693.15,-1457.88C726.14,-1447 769.71,-1433.47 809,-1424 891.47,-1404.12 939.69,-1453.55 997,-1391 1059.68,-1322.58 972.36,-1045.23 1033,-975 1044.5,-961.68 1061.25,-954.28 1078.38,-950.32"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1079.33,-953.7 1088.48,-948.37 1078,-946.83 1079.33,-953.7"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Ceiling shots",
                    tailId: "Basic aerials"
                }}><GroupWrapper id="b75a8be85276490a8b8bcd8b6b43bf46d55153a4" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M694.23,-1475.44C782.87,-1473.36 954.23,-1464.12 997,-1424 1053.33,-1371.16 1008.94,-1327.39 1033,-1254 1060.86,-1169.01 1108.52,-1074.3 1132.43,-1029"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1135.55,-1030.58 1137.15,-1020.1 1129.37,-1027.29 1135.55,-1030.58"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Air dribbling",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Keeping the ball close to the car in the air while pushing it towards a push or goal.",
                        {
                            text: "Sir Timbers AirDribble Tutorial.",
                            url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                        },
                        {
                            text: "Jhzer’s air dribbling tutorial.",
                            url: "https://www.youtube.com/watch?v=eU4hUqS5IS4"
                        },
                        {
                            text: "FLuuMP’s Air dribble tutorial.",
                            url: "https://www.youtube.com/watch?v=6Cy-LwvNpkI"
                        },
                        {
                            text: "Iridium ground to Air Dribble tutorial.",
                            url: "https://www.youtube.com/watch?v=3VyjtI_fGsg"
                        }
                    ],

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
                        d="M1191,-1804C1191,-1804 1105,-1804 1105,-1804 1099,-1804 1093,-1798 1093,-1792 1093,-1792 1093,-1780 1093,-1780 1093,-1774 1099,-1768 1105,-1768 1105,-1768 1191,-1768 1191,-1768 1197,-1768 1203,-1774 1203,-1780 1203,-1780 1203,-1792 1203,-1792 1203,-1798 1197,-1804 1191,-1804"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-1782.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Air Dribbling"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Air Dribble to Demo",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="d8c849e07c4e21b64676bde51be8b8feb662d45c" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.19,-1781.57C1223.35,-1777.86 1245.55,-1771.14 1263,-1759 1286.68,-1742.53 1275.91,-1722.29 1299,-1705 1300.84,-1703.62 1302.76,-1702.31 1304.73,-1701.07"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1306.69,-1703.98 1313.7,-1696.03 1303.26,-1697.88 1306.69,-1703.98"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "hood to air dribble",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Popping (Hitting the ball in a way where it allows the player to hit it again) the ball while hood dribbling then air dribbling it with the purpose of a goal.",
                        {
                            text: "Iridium ground to Air Dribble tutorial.",
                            url: "https://www.youtube.com/watch?v=3VyjtI_fGsg"
                        },
                        {
                            text: "Sir Timbers AirDribble Tutorial.",
                            url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                        },
                        {
                            text: "Ytzi13 Air roll usage comment",
                            url: "https://www.reddit.com/r/RocketLeague/comments/9z063d/comment/ea6fkn9/?st=JORGHW4X&sh=a3097bd5"
                        }
                    ],

                    title: "hood to air dribble",
                    upstreamSkills: ["Air dribbling", "Hood dribble"],
                    downstreamSkills: []
                }}><GroupWrapper id="ba2dc3a69ab1146a34f6909c21e4ef807b14ad37" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.5,-2188C1453.5,-2188 1319.5,-2188 1319.5,-2188 1313.5,-2188 1307.5,-2182 1307.5,-2176 1307.5,-2176 1307.5,-2164 1307.5,-2164 1307.5,-2158 1313.5,-2152 1319.5,-2152 1319.5,-2152 1453.5,-2152 1453.5,-2152 1459.5,-2152 1465.5,-2158 1465.5,-2164 1465.5,-2164 1465.5,-2176 1465.5,-2176 1465.5,-2182 1459.5,-2188 1453.5,-2188"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-2166.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hood To Air Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "hood to air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="5f703ff28fee8e5da5396bf9a480519af4baa336" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1155.61,-1804.19C1180.94,-1873.47 1271.7,-2118.18 1299,-2143 1300.28,-2144.16 1301.61,-2145.28 1302.98,-2146.34"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1301.03,-2149.24 1311.27,-2151.94 1304.94,-2143.44 1301.03,-2149.24"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Bounce to air dribble",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Starting an air dribble after popping the ball up in a bounce dribble.",
                        {
                            text: "Sir Timbers AirDribble Tutorial.",
                            url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                        }
                    ],

                    title: "Bounce to air dribble",
                    upstreamSkills: ["Air dribbling", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="9354bfe67d752a0f523ec603919747179ff365a8" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1461,-1750C1461,-1750 1312,-1750 1312,-1750 1306,-1750 1300,-1744 1300,-1738 1300,-1738 1300,-1726 1300,-1726 1300,-1720 1306,-1714 1312,-1714 1312,-1714 1461,-1714 1461,-1714 1467,-1714 1473,-1720 1473,-1726 1473,-1726 1473,-1738 1473,-1738 1473,-1744 1467,-1750 1461,-1750"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1728.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Bounce To Air Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Bounce to air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="f7894eef5cb5acdf00b84d9ae060eea6ede5864a" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.26,-1773.61C1230.82,-1767.32 1265.03,-1759.51 1296.33,-1752.36"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1297.41,-1755.7 1306.38,-1750.07 1295.85,-1748.88 1297.41,-1755.7"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Wall Air dribble",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Rolling the ball up the wall then popping it then jumping from the wall to push it mid-air into goal or onto the backboard to set up a backboard pass.",
                        {
                            text: "Sir Timbers AirDribble Tutorial.",
                            url: "https://www.youtube.com/watch?v=UZNsoMdDj5Y"
                        }
                    ],

                    title: "Wall Air dribble",
                    upstreamSkills: ["Air dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="c2a8946dd0dab510c518dda78067266ecd466515" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1440,-1804C1440,-1804 1333,-1804 1333,-1804 1327,-1804 1321,-1798 1321,-1792 1321,-1792 1321,-1780 1321,-1780 1321,-1774 1327,-1768 1333,-1768 1333,-1768 1440,-1768 1440,-1768 1446,-1768 1452,-1774 1452,-1780 1452,-1780 1452,-1792 1452,-1792 1452,-1798 1446,-1804 1440,-1804"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1386.5"
                        y="-1782.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Wall Air Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Wall Air dribble",
                    tailId: "Air dribbling"
                }}><GroupWrapper id="a17f4812c0305752a343e9c54e2f545defb256e8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1203.26,-1786C1235.16,-1786 1275.95,-1786 1310.85,-1786"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1310.99,-1789.5 1320.99,-1786 1310.99,-1782.5 1310.99,-1789.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Sideways aerials",
                    tailId: "Air roll shots"
                }}><GroupWrapper id="cb221c554e41d3109ed5343d97cec2c4a70220c6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1169.99,-1299.19C1212.5,-1336.04 1308.83,-1419.54 1356.98,-1461.28"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1354.71,-1463.94 1364.56,-1467.85 1359.3,-1458.65 1354.71,-1463.94"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Backwards aerials"
                }}><GroupWrapper id="b946e51387a79af9781dccec86a3a3f0a40dac57" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M970.4,-1788.08C979.41,-1790.88 988.47,-1793.88 997,-1797 1013.45,-1803.01 1015.87,-1809.37 1033,-1813 1128.87,-1833.34 1386.48,-1857.09 1474,-1813 1518.38,-1790.64 1547.98,-1738.25 1562.82,-1705.7"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1566.13,-1706.86 1566.95,-1696.29 1559.72,-1704.04 1566.13,-1706.86"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado spin",
                    tailId: "Sideways aerials"
                }}><GroupWrapper id="b152fdb4137fa7058fa0ee1360879b1ffe8fd749" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1405.05,-1504.06C1438.37,-1538.37 1510.9,-1613.04 1549.19,-1652.45"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1546.89,-1655.11 1556.37,-1659.85 1551.91,-1650.23 1546.89,-1655.11"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Tornado Flick / Spin",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: ["A mix of the tornado spin, upside down aerials, and bounce dribbling.", {
                        text: "Mertzy’s Tornado Flick Tutorial.",
                        url: "https://www.youtube.com/watch?v=On02SxAppfY"
                    }, "Mertzy’s custom training code, 59D5-1411-36A2-8B76."],

                    title: "Tornado Flick / Spin",
                    upstreamSkills: ["Tornado spin", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="58c831a400d054a656225db6965364b2dbd9ba76" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1871,-1681C1871,-1681 1736,-1681 1736,-1681 1730,-1681 1724,-1675 1724,-1669 1724,-1669 1724,-1657 1724,-1657 1724,-1651 1730,-1645 1736,-1645 1736,-1645 1871,-1645 1871,-1645 1877,-1645 1883,-1651 1883,-1657 1883,-1657 1883,-1669 1883,-1669 1883,-1675 1877,-1681 1871,-1681"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1803.5"
                        y="-1659.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Tornado Flick / Spin"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Tornado spin"
                }}><GroupWrapper id="730633388a8ffa5dbcb6e4b8a8c1d335830d5742" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1630.54,-1674.39C1655.37,-1672.74 1685.41,-1670.75 1713.39,-1668.9"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1713.84,-1672.38 1723.59,-1668.23 1713.38,-1665.39 1713.84,-1672.38"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Breezi Flick",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "An advanced version of the tornado spin, musty flick, and hood dribbling all combined into one shot.",
                        {
                            text: "NeXL Breezi Flick Tutorial",
                            url: "https://www.youtube.com/watch?v=WZu8wYja770"
                        }
                    ],

                    title: "Breezi Flick",
                    upstreamSkills: ["Tornado spin", "Bounce dribbling"],
                    downstreamSkills: []
                }}><GroupWrapper id="78c633192e33640847f65ab13614156fc4721a49" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1842,-1620C1842,-1620 1765,-1620 1765,-1620 1759,-1620 1753,-1614 1753,-1608 1753,-1608 1753,-1596 1753,-1596 1753,-1590 1759,-1584 1765,-1584 1765,-1584 1842,-1584 1842,-1584 1848,-1584 1854,-1590 1854,-1596 1854,-1596 1854,-1608 1854,-1608 1854,-1614 1848,-1620 1842,-1620"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1803.5"
                        y="-1598.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Breezi Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Tornado spin"
                }}><GroupWrapper id="ded1f8273b2b83fa63d22a2814ea4316f9d7ae35" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1615.43,-1659.99C1633.64,-1652.05 1655.69,-1642.96 1676,-1636 1697.54,-1628.62 1721.59,-1621.81 1742.88,-1616.25"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1743.96,-1619.59 1752.77,-1613.71 1742.22,-1612.81 1743.96,-1619.59"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Hood dribble",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "Being able to keep the ball on the top of the players car. Normally just called dribbling.",
                        {
                            text: "Sir Timbers Dribbling Tutorial.",
                            url: "https://www.youtube.com/watch?v=eBmgRPOmh98"
                        }
                    ],

                    title: "Hood dribble",
                    upstreamSkills: ["Push dribbling"],
                    downstreamSkills: ["hood to air dribble", "Power Slide Dribble", "Directional Flick"]
                }}><GroupWrapper id="4c61f86edb9a6722edee939ef919a0f3f51681a3" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1192,-2693C1192,-2693 1104,-2693 1104,-2693 1098,-2693 1092,-2687 1092,-2681 1092,-2681 1092,-2669 1092,-2669 1092,-2663 1098,-2657 1104,-2657 1104,-2657 1192,-2657 1192,-2657 1198,-2657 1204,-2663 1204,-2669 1204,-2669 1204,-2681 1204,-2681 1204,-2687 1198,-2693 1192,-2693"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1148"
                        y="-2671.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Hood Dribble"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Hood dribble",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="171d3393df4e87a5d37dd9ade1883b19d3b3fb41" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.22,-2770.39C975.96,-2767.04 986.92,-2763.22 997,-2759 1037.42,-2742.08 1080.81,-2716.94 1110.47,-2698.57"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1112.59,-2701.37 1119.22,-2693.11 1108.88,-2695.44 1112.59,-2701.37"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce dribbling",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="ea33b285cc29ef5dd53146a0ce166e8907d90c3b" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.15,-2779.83C977.46,-2775.72 989.04,-2769.21 997,-2759 1065.35,-2671.31 962.48,-1844.95 1033,-1759 1041.88,-1748.18 1054.22,-1741.23 1067.52,-1736.84"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1068.65,-1740.16 1077.33,-1734.09 1066.76,-1733.42 1068.65,-1740.16"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Turtle Dribbling",
                    tailId: "Push dribbling"
                }}><GroupWrapper id="bc8ee86d653fdb76f81d6e04a8e0036198d849d0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M965.11,-2779.25C977.27,-2775.16 988.8,-2768.8 997,-2759 1094,-2643.18 949.03,-2546.58 1033,-2421 1044.57,-2403.7 1062.63,-2390.81 1081,-2381.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1082.52,-2384.55 1090.01,-2377.06 1079.49,-2378.25 1082.52,-2384.55"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "hood to air dribble",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="c76613cf8ab5ade59c84cf6fb9e193af47351fa0" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1168.75,-2656.94C1195.29,-2631.35 1241.6,-2581.74 1263,-2529 1290.9,-2460.24 1251.87,-2254.32 1299,-2197 1299.61,-2196.26 1300.24,-2195.53 1300.9,-2194.83"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1303.41,-2197.28 1308.54,-2188 1298.74,-2192.05 1303.41,-2197.28"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Power Slide Dribble",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="d299a91979286074dcc1ba023402956113417ab6" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1204.15,-2684.79C1231.74,-2689.69 1265.81,-2695.74 1296.94,-2701.27"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1296.48,-2704.74 1306.93,-2703.05 1297.7,-2697.85 1296.48,-2704.74"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Directional Flick",
                    tailId: "Hood dribble"
                }}><GroupWrapper id="b2539993659fa6ad68fb4efe04bff79dc2bdeb2d" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1201.78,-2656.92C1237.65,-2644.64 1285.25,-2628.34 1323.01,-2615.4"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1324.55,-2618.57 1332.88,-2612.02 1322.29,-2611.95 1324.55,-2618.57"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Bounce to air dribble",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="edc991954571e41ad4b6e92aafb66f09c388dbd9" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218.68,-1732C1240.97,-1732 1266.06,-1732 1289.87,-1732"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1289.98,-1735.5 1299.98,-1732 1289.98,-1728.5 1289.98,-1735.5"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Tornado Flick / Spin",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="007ee0c3010fd2f75044a149df90bd0965f401ba" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218.51,-1724.21C1234.1,-1720.18 1249.89,-1714.12 1263,-1705 1286.68,-1688.53 1273.57,-1664.61 1299,-1651 1368.34,-1613.89 1588.82,-1634.86 1713.81,-1650.61"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1713.39,-1654.08 1723.75,-1651.87 1714.28,-1647.14 1713.39,-1654.08"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "Breezi Flick",
                    tailId: "Bounce dribbling"
                }}><GroupWrapper id="9aba1c670dc9d53349ceb3a3ebd3384003960793" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1218.7,-1725.87C1234.55,-1721.8 1250.4,-1715.3 1263,-1705 1292.56,-1680.83 1267.36,-1648.37 1299,-1627 1435.03,-1535.13 1642,-1564.46 1742.95,-1586.71"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1742.44,-1590.18 1752.97,-1588.97 1743.98,-1583.35 1742.44,-1590.18"></PolygonWrapper></GroupWrapper></Prerequisite><Prerequisite
                {...{
                    headId: "45 degree flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="20b84fca4ce8c7c8a278f764abbffe62cba90175" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.56,-2577.32C1461.17,-2573.27 1468.25,-2568.24 1474,-2562 1562.03,-2466.52 1573.41,-2299.78 1574.29,-2233.42"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1577.79,-2233.32 1574.35,-2223.3 1570.79,-2233.28 1577.79,-2233.32"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Musty Flick",
                    isUnnecessary: true,
                    isRecommended: false,

                    notes: [
                        "After popping (Hitting the ball in a way where it allows the player to hit it again)  the ball during a hood dribble, angling the car to be upside down, then backflipping to delay and flick the ball. Also known as an underflip.",
                        {
                            text: "Amustycow’s musty flick tutorial.",
                            url: "https://www.youtube.com/watch?v=96tNxK5vTsQ"
                        }
                    ],

                    title: "Musty Flick",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: []
                }}><GroupWrapper id="2f919bdec851e293a32953373f2fe7249af39cab" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1613.5,-2585C1613.5,-2585 1536.5,-2585 1536.5,-2585 1530.5,-2585 1524.5,-2579 1524.5,-2573 1524.5,-2573 1524.5,-2561 1524.5,-2561 1524.5,-2555 1530.5,-2549 1536.5,-2549 1536.5,-2549 1613.5,-2549 1613.5,-2549 1619.5,-2549 1625.5,-2555 1625.5,-2561 1625.5,-2561 1625.5,-2573 1625.5,-2573 1625.5,-2579 1619.5,-2585 1613.5,-2585"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-2563.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Musty Flick"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Musty Flick",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="702449faeb3b2b4420f8ef7f458b5c724ca44ad8" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.52,-2584.44C1473.32,-2581.57 1494.93,-2578.45 1514.31,-2575.64"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1514.82,-2579.1 1524.22,-2574.21 1513.82,-2572.18 1514.82,-2579.1"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Delayed Flicks",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: ["Slowing down the pace of the game during a flick.", {
                        text: "KevPert’s tutorial on Delayed Flicks.",
                        url: "https://www.youtube.com/watch?v=hOarxtWuZ5E"
                    }],

                    title: "Delayed Flicks",
                    upstreamSkills: ["Directional Flick"],
                    downstreamSkills: ["Mognus Flick (180 backflip flick)"]
                }}><GroupWrapper id="f98ade5cba23fdc5ba98b6019d8a6c89885d1eca" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1623.5,-2639C1623.5,-2639 1526.5,-2639 1526.5,-2639 1520.5,-2639 1514.5,-2633 1514.5,-2627 1514.5,-2627 1514.5,-2615 1514.5,-2615 1514.5,-2609 1520.5,-2603 1526.5,-2603 1526.5,-2603 1623.5,-2603 1623.5,-2603 1629.5,-2603 1635.5,-2609 1635.5,-2615 1635.5,-2615 1635.5,-2627 1635.5,-2627 1635.5,-2633 1629.5,-2639 1623.5,-2639"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1575"
                        y="-2617.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Delayed Flicks"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Delayed Flicks",
                    tailId: "Directional Flick"
                }}><GroupWrapper id="09a925621b6b66c33763adab53b0f6fb39fff733" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1453.52,-2603.56C1469.92,-2605.93 1487.55,-2608.48 1504.13,-2610.88"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1503.9,-2614.39 1514.29,-2612.36 1504.9,-2607.46 1503.9,-2614.39"></PolygonWrapper></GroupWrapper></Prerequisite><Skill
                {...{
                    id: "Mognus Flick (180 backflip flick)",
                    isUnnecessary: false,
                    isRecommended: false,

                    notes: [
                        "After popping the ball into the air with a hood dribble. The player spins around (180) then backflips into the ball, causing power and some delay to the ball. Also known as the 180 backflip flick.",
                        {
                            text: "Jonniboi_i's mognus flick only 1v1 video.",
                            url: "https://www.youtube.com/watch?v=QXUo6bARX1Y"
                        }
                    ],

                    title: "Mognus Flick (180 backflip flick)",
                    upstreamSkills: ["Delayed Flicks"],
                    downstreamSkills: []
                }}><GroupWrapper id="8acee1c4e2c55e829ffa2d1fb40445ac3bd2b84a" className="node"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1919,-2639C1919,-2639 1688,-2639 1688,-2639 1682,-2639 1676,-2633 1676,-2627 1676,-2627 1676,-2615 1676,-2615 1676,-2609 1682,-2603 1688,-2603 1688,-2603 1919,-2603 1919,-2603 1925,-2603 1931,-2609 1931,-2615 1931,-2615 1931,-2627 1931,-2627 1931,-2633 1925,-2639 1919,-2639"></PathWrapper><TextWrapper
                        textAnchor="middle"
                        x="1803.5"
                        y="-2617.3"
                        fontFamily="Times,serif"
                        fontSize="14.00">{"Mognus Flick (180 Backflip Flick)"}</TextWrapper></GroupWrapper></Skill><Prerequisite
                {...{
                    headId: "Mognus Flick (180 backflip flick)",
                    tailId: "Delayed Flicks"
                }}><GroupWrapper id="019b72d3cf8cd5ad78f9a6ddae510156779c3fb5" className="edge"><PathWrapper
                        fill="none"
                        stroke="black"
                        d="M1635.51,-2621C1645.05,-2621 1655.24,-2621 1665.72,-2621"></PathWrapper><PolygonWrapper
                        fill="black"
                        stroke="black"
                        points="1665.84,-2624.5 1675.84,-2621 1665.84,-2617.5 1665.84,-2624.5"></PolygonWrapper></GroupWrapper></Prerequisite></GroupWrapper></></SvgWrapper>)})