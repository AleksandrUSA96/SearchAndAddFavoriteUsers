import React from 'react';

const Highlight = (props) => {
    const { matchSubString, str } = props
    if (!matchSubString) return str
    const regexp = new RegExp(matchSubString, 'ig')
    const matchValue = str.match(regexp)
    if (matchValue) {
        console.log('matchValue', matchValue)
        console.log('str.split(regexp)', str.split(regexp))
        return str.split(regexp).map((s, index, array) => {
            if (index < array.length - 1) {
                const c = matchValue.shift()
                return <>{s}<span style={{fontWeight: 'bold'}}>{c}</span></>
            }
            return s
        })
    }
    return str
}

export default Highlight;