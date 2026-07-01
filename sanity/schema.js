// Sanity schema blueprint for Portfolio Projects.
// You can use this inside your Sanity Studio schemas folder.

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fintech', value: 'fintech' },
          { title: 'Enterprise', value: 'enterprise' },
          { title: 'Utility / Geolocation', value: 'utility' },
          { title: 'CRUD', value: 'crud' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true // Enables cropping in dashboard
      }
    },
    {
      name: 'icon',
      title: 'FontAwesome Icon Class',
      type: 'string',
      description: 'Example: fa-wallet, fa-building-columns, fa-location-crosshairs, fa-users-gear',
      validation: Rule => Rule.required()
    },
    {
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      description: 'Sorting order number (e.g. 1, 2, 3...)',
      validation: Rule => Rule.required()
    }
  ]
}
