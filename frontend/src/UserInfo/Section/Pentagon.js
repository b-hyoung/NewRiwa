import React, { userEffect } from 'react'
import './pentagon.css'

function Pentagon() {
    return (
        <div className="pentagon">
                {/* Rank 
                (top)               (t,r)         (b,r)          (b,l)              (t,l)
                  First             Second        Third          Forth              Fifth
                S  : 2 90        S  : 85.5 -27.5 S  : 53 73     S : -53 73         S : -85.5  -27.5
                A  : 2 -78.75    A  : 78 -25       A  : 0 ??      A  : -49 68        A  : -75 -24  
                A- : 2 -67.5     A- : 0 ??       A- : 0 ??      A- : 0 ??          A- : -64.7 -21.0
                B  : 2 -56.25    B  : 52.5 -17   B  : 32.5 48.5 B  : 0 ??          B  : -47 -15 
                B- : 2 -45       B- : 42 -13     B- : 26 36     B- : -26 36        B- : 42 -13  
                C  : 2 -33.75    C  : L31 -10.5  C  : 0 ??      C  : 0 ??          C  : -31 -10    
                C- : 2 -22.5     C- : 22 -6      C- : 0 ??      C- : 0 ??          C- : -20 , -6
                D  : 2 11.25     D  : 12,-7      D  : 0 ??      D  : -9 12         D  : -10 -5 
                D- : 2 0         D- : 0 0        D- : 0 0       D- : 0 0           D- : 0 0   

                */} 
            <svg>
            <g>
                <circle  r="22.5px" opacity="0.2"  transform="translate(125,125)" ></circle>
                <circle  r="45px"   opacity="0.2"  transform="translate(125,125)" ></circle>
                <circle  r="67.5px" opacity="0.2"  transform="translate(125,125)" ></circle>
                <circle  r="90px"   opacity="0.4"  transform="translate(125,125)" ></circle>

                <line transform="translate(125,125)" stroke='white' x="0" y="0" x2="0" y2="-90" />
                <line transform="translate(125,125)" x2="85.5" y2="-28" x="0" y="0" stroke='white' ></line>
                <line transform="translate(125,125)" x2="53" y2="73" x="0" y="0" stroke='white'></line>
                <line transform="translate(125,125)" x2="-53" y2="73" x="0" y="0" stroke='white' ></line>
                <line transform="translate(125,125)" x2="-85.5" y2="-27.5" x="0" y="0" stroke='white' ></line>

                <path   d="M2,-45 L42,-13 L26,36 L-26,36 L-42,-13.5 Z"  stroke='orange' fill='none' transform="translate(125,125)"></path>
                <path   d="M2, -45 L78 -25 L26,36 L-26,36 L-85.5  -27.5 Z" stroke='aqua' fill='none' transform="translate(125,125)"></path>
                {/* <path d="M50 -75   L160 0   L130 140   L-30 140   L-65 0 Z" stroke='white'fill='none' transform="translate(75, 75)" />
                <path d="M50 0   L100 32   L79 100   L20 100   L0 32 Z" stroke='orange' fill='none' transform="translate(75, 75)" /> */}
            </g>
            </svg>
        </div>
    )
}
export default Pentagon