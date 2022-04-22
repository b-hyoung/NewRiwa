import React, { userEffect } from 'react'
import './pentagon.css'

function Pentagon() {
    return(
        <div className="pentagon">
        <svg>
            {/* Rank 
                S 
                A
                B
                C
                D
+
            */}
            <path d="M50 -75   L160 0   L130 140   L-30 140   L-65 0 Z"  stroke='white'  transform="translate(75, 75)" />
            <path d="M50 0   L100 32   L79 100   L20 100   L0 32 Z"  stroke='orange'  transform="translate(75, 75)" />
         </svg>
    </div>
    )
}
export default Pentagon