import React from 'react';

type Props = {};

export default function Visibility({}: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const playVideo = () => videoRef?.current?.play();

  const pauseVideo = () => videoRef?.current?.pause();

  const visibilityCallback = () => {
    if (document.visibilityState === 'hidden') {
      pauseVideo();
      fetch('/api/hello', {
        keepalive: true,
        method: 'GET',
      });
    } else playVideo();
  };

  // 1. window / visibilityAPI

  React.useEffect(() => {
    // if (window) {
    //   window.onblur = pauseVideo;
    // }
    document.addEventListener('visibilitychange', visibilityCallback);
    return () =>
      document.removeEventListener('visibilitychange', visibilityCallback);
  }, []); // ComponentDidMount

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-red-500'>
      <video ref={videoRef} width='480' height='540' controls>
        <source src='/sample-video.mp4' type='video/mp4' />
        Error Message
      </video>
    </div>
  );
}
