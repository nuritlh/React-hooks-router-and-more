import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #e4c6c6;
  font-weight: 700;
`;

const Img = styled.img`
  width: 5rem;
  margin: 10px;
`;

const Artist = ({artist}) => {
  const { name, url, thumb_url, upcoming_event_count, facebook_page_url } = artist;
  const [imgSrc, setImgSrc] = useState('/mic.jpg');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if(thumb_url) setImgSrc(thumb_url);
  },[thumb_url]);

  return (
    <Wrapper>
      <Img
        src={imgSrc}
        alt="artist-img"
        onMouseOut={() => setIsHovered(false)}
        onMouseOver={() => setIsHovered( true)}
        style={{transform: `${isHovered ? 'scale(2.5,2.5)' : 'scale(1,1)'}`}}
      />
      <div>
        <div>{name}</div>
        <div>Future events: <span>{upcoming_event_count > 0 ? upcoming_event_count : 'No Future events'}</span> </div>
        <div>
          { facebook_page_url !== '' && <Link href={facebook_page_url} variant="caption" target="_blank" rel="noreferrer">
            <FacebookIcon/>
          </Link>
          }
        </div>
        <div>
          { url !== '' && <Link href={url} variant="caption" target="_blank" rel="noreferrer">
            Read more
          </Link>
          }
        </div>
      </div>
    </Wrapper>
  )
};

export default Artist;