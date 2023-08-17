import Image from 'next/image'

const ProductImage = (props:{src:string, name:string , cname:string}) => {

  const{src, name, cname} =props
  return (
    <Image
        className={cname}
        src={src}
        alt={name}
        width={175}
        height={150}
        priority={true}
      />
  )
}

export default ProductImage
