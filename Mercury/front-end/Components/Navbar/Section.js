import React from 'react'
import styled from 'styled-components'
import {Container} from 'react-bootstrap'
import placeholder from '../../Assets/placeholder.gif';
import {Link} from 'react-router-dom'
const Style = styled.div` 
  body{
    background-color: #1c40617c;
  }
  .wrapper h1{
    color:#fff;
    font-size: 52px;
    margin-bottom: 60px;
    text-align: center;
    
  }
  .team{
    display: flex;
    text-align: center;
    width: auto;
    justify-content: center;
    flex-wrap:wrap;
  
  }
  .team .team_member{
    background-color:#1c40617c;
    margin:5px;
    margin-bottom: 50px;
    width:300px;
    padding:20px;
    line-height: 20px;
    color:#000000;
    position: relative;
  }

  .team .team_member a{
   color:#fff;
  }

  .team .team_member h3{
    color:#fff;
    font-size:26px;
    margin-top:50px;
    text-transform:uppercase;
  
  }

  .team .team_member .team_img{


    border-radius: 50%;
    position:relative;

  
 
  }



`;
const Section = (params) => {
    return (
<Style>
    <Container>
        <div className="wrapper">
        <h1>Lorem ipsum dolor sit amet</h1>
        <div className="team">
          <div className="team_member">
            <div className="team_img">
              <img src={placeholder} alt="none" />
            </div>
            <h3>Login</h3>
            <p className="role"></p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in 
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              <Link to="/Login"> View More</Link>
              </p>
          </div>
          <div className="team_member">
            <div className="team_img">
                <img src={placeholder} alt="none" />   
            </div>
            <h3>About</h3>
            <p className="role"></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <Link to="/About"> View More</Link>
              </p>
              
          </div>
          <div className="team_member">
            <div className="team_img">
                <img src={placeholder} alt="none" />
            </div>
            <h3>Contact</h3>
            <p className="role"></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <Link to="/Contact"> View More</Link></p>
              
          </div>
        </div>
      </div>
      </Container>
      </Style>
    );    
}

export default Section;
