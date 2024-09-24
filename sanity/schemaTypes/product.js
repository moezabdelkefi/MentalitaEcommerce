export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    { 
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    { 
      name: 'details',
      title: 'Details',
      type: 'string',
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          {
            name: 'size',
            title: 'Size',
            type: 'string',
            validation: Rule => Rule.custom(size => {
              return size === size.toUpperCase() ? true : 'Sizes must be uppercase';
            })
          },
          {
            name: 'outOfStock',
            title: 'Out of Stock',
            type: 'boolean'
          }
        ]
      }],
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'color',
          options: {
            disableAlpha: true,
          },
        },
      ],
    },
  ]
}
