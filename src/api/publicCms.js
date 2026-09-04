/**
 * DISCONNECTED FROM BACKEND
 * These functions now return mock data to allow the frontend to run independently.
 */

export async function fetchBlogList() {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 400));
  return [
    {
      _id: 'mock-1',
      title: 'Transforming Manufacturing with Smart ERP',
      content: 'Digital transformation is no longer optional for modern manufacturers. IDMS Smart ERP provides the connectivity needed to thrive.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'mock-2',
      title: 'The Future of HRMS',
      content: 'Employee experience is at the heart of HRMS. Discover how automation simplifies lifecycle management.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'mock-3',
      title: 'Real-time Data Analytics',
      content: 'Making informed decisions requires real-time insights. Learn how our dashboard unifies your data stream.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString()
    }
  ];
}

export async function fetchBlogById(id) {
  const blogs = await fetchBlogList();
  return blogs.find(b => b._id === id) || blogs[0];
}

export async function fetchGalleryList() {
  await new Promise(r => setTimeout(r, 300));
  return [
    {
      _id: 'g1',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      title: 'Our Modern Workspace'
    },
    {
      _id: 'g2',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      title: 'Global Operations Center'
    },
    {
      _id: 'g3',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      title: 'Innovation Lab'
    },
    {
      _id: 'g4',
      imageUrl: 'https://images.unsplash.com/photo-1522071823991-b9671f903f6a?auto=format&fit=crop&w=800&q=80',
      title: 'Collaboration Zone'
    }
  ];
}
