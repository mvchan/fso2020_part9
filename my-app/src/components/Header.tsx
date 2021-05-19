import React from 'react';

// less verbose syntax for defining interface type for props
const Header = ({ courseName } : { courseName : string }) => (
    <>
        <h1>{courseName}</h1>
    </>
)

export default Header;