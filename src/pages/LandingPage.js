import React from 'react'
import "../stylesheet/LandingPage.css"
import Navbar from './Navbar'

export default function LandingPage() {
    return (
        <div className='landingPage'>
            <Navbar />
            <div className='landingPage-text'>
                <div className='text'>
                    <h2>
                    {/* Experience a taste symphony that redefines dining artistry. */}
                    Redefined dining through taste symphony.
                    </h2>
                    <p>
                    &emsp;Embark on a delicious journey with our diverse menu that caters to every palate. Our chefs blend traditional and innovative flavors, creating masterpieces for your taste buds. We go beyond just eating – it's an immersive experience where the ambiance, service, and presentation all come together seamlessly. Join us in redefining great dining and making every meal an extraordinary adventure for you.
                    </p>
                </div>
            </div>
        </div>
    )
}
