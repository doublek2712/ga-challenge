import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { useRef, type FC } from 'react';
import type { PhotoType } from '../../services/photos/type';

interface IPhotosViewer {
  photos: PhotoType[]
}

export const PhotosViewer: FC<IPhotosViewer> = ({ photos }) => {
  const containerRef = useRef(null);

  const handleClick = (startIndex: number) => {
    const tempContainer = document.createElement('div')
    photos.forEach((photo) => {
      const img = document.createElement('img')
      img.src = photo.url
      tempContainer.appendChild(img)
    })

    const viewer = new Viewer(tempContainer, {
      inline: false,
      navbar: true,
      toolbar: true,
      title: true,
      hidden() {
        viewer.destroy()
      },
    });

    viewer.view(startIndex)
  }

  return (
    <div ref={containerRef} className='flex flex-wrap gap-2'>
      {photos.map((photo, index) => (
        <div key={index} className='relative group w-36' onClick={() => handleClick(index)}>
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
          />
          <div className='hidden absolute top-0 left-0 w-full h-full bg-black/50 group-hover:flex group-hover:cursor-pointer 
          items-center justify-center text-white'>
            Preview
          </div>
        </div>
      ))}
    </div>
  )
}
