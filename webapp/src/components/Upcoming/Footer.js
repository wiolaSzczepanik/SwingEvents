import './Footer.css'

import React from 'react';

// based on https://bootsnipp.com/snippets/rlXdE

const Footer = props => {
  return (

    	<section id="footer">
    		<div class="container">
    			<div class="row">
    				<div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
    					<p class="h6">Brakuje wydarzenia? Masz sugestie? Daj nam znać!</p>

                        <ul class="list-unstyled list-inline social text-center">
    						<li class="list-inline-item"><a href="https://www.facebook.com/Kiedytanczepl-101366517919928" target="_blank"><i class="fa fa-facebook"></i></a></li>
    						<li class="list-inline-item"><a href="http://m.me/101366517919928" target="_blank"><i class="fab fa-facebook-messenger"></i></a></li>
    						<li class="list-inline-item"><a href="mailto:info@kiedytancze.pl" target="_blank"><i class="fa fa-envelope"></i></a></li>
    					</ul>

    				</div>
    				<hr />
    			</div>
    		</div>
    	</section>
  );
};

export default Footer;


