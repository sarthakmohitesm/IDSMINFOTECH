import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from './adminApi.js';
import { clearAdminToken, getAdminToken } from './adminAuth.js';
import { fetchBlogList, fetchGalleryList } from '../api/publicCms.js';
import AdminNavbar from './AdminNavbar.jsx';

/** Match `ContactFormSection` / contact page field styling. */
const inputClass =
  'contact-form-field w-full rounded-[5px] border border-solid border-[#1e82e6] bg-white px-4 py-3 text-[14px] leading-normal text-gray-900 outline-none transition-[border-color,box-shadow] duration-200 [font-size:15px] placeholder:text-gray-500 focus:border-[#0E81FA] focus:shadow-[0_0_0_3px_rgba(14,129,250,0.25)]';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500';

const primaryBtnClass =
  'rounded-[5px] border-0 bg-[#1e82e6] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-[#0E81FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] disabled:pointer-events-none disabled:opacity-60';

const secondaryBtnClass =
  'rounded-[5px] border border-solid border-[#1e82e6] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#1e82e6] transition-[background-color] duration-200 hover:bg-[#eef4fb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]';

const panelClass =
  'rounded-[5px] border border-solid border-[#1e82e6] bg-white p-5 shadow-[0_2px_12px_rgba(30,130,230,0.08)] sm:p-6';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('contacts');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [galUrl, setGalUrl] = useState('');
  const [galTitle, setGalTitle] = useState('');

  const notify = (msg, isErr = false) => {
    if (isErr) {
      setError(msg);
      setMessage('');
    } else {
      setMessage(msg);
      setError('');
    }
    window.setTimeout(() => {
      setMessage('');
      setError('');
    }, 4000);
  };

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const loadContacts = useCallback(async () => {
    const data = await authFetch('/api/contact', { method: 'GET' });
    setContacts(Array.isArray(data) ? data : []);
  }, []);

  const loadBlogs = useCallback(async () => {
    const data = await fetchBlogList();
    setBlogs(Array.isArray(data) ? data : []);
  }, []);

  const loadGallery = useCallback(async () => {
    const data = await fetchGalleryList();
    setGallery(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    if (!getAdminToken()) return;
    (async () => {
      try {
        if (tab === 'contacts') await loadContacts();
        if (tab === 'blogs') await loadBlogs();
        if (tab === 'gallery') await loadGallery();
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Load failed';
        notify(msg, true);
        if (
          e instanceof Error &&
          (e.message === 'Not authenticated' ||
            e.message.includes('Invalid or expired') ||
            e.message.includes('Authorization'))
        ) {
          clearAdminToken();
          navigate('/admin/login', { replace: true });
        }
      }
    })();
  }, [tab, loadContacts, loadBlogs, loadGallery, navigate]);

  const logout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await authFetch(`/api/contact/${id}`, { method: 'DELETE' });
      notify('Lead deleted');
      await loadContacts();
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Delete failed', true);
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    try {
      if (editingBlogId) {
        await authFetch(`/api/blogs/${editingBlogId}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: blogTitle,
            content: blogContent,
            image: blogImage,
          }),
        });
        notify('Blog updated');
      } else {
        await authFetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({
            title: blogTitle,
            content: blogContent,
            image: blogImage,
          }),
        });
        notify('Blog created');
      }
      setBlogTitle('');
      setBlogContent('');
      setBlogImage('');
      setEditingBlogId(null);
      await loadBlogs();
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Save failed', true);
    }
  };

  const startEditBlog = (b) => {
    setEditingBlogId(b._id);
    setBlogTitle(b.title || '');
    setBlogContent(b.content || '');
    setBlogImage(b.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditBlog = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogContent('');
    setBlogImage('');
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await authFetch(`/api/blogs/${id}`, { method: 'DELETE' });
      notify('Blog deleted');
      if (editingBlogId === id) cancelEditBlog();
      await loadBlogs();
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Delete failed', true);
    }
  };

  const submitGallery = async (e) => {
    e.preventDefault();
    try {
      await authFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify({ imageUrl: galUrl, title: galTitle }),
      });
      notify('Gallery item added');
      setGalUrl('');
      setGalTitle('');
      await loadGallery();
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Save failed', true);
    }
  };

  const deleteGallery = async (id) => {
    if (!window.confirm('Remove this image?')) return;
    try {
      await authFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      notify('Gallery item removed');
      await loadGallery();
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Delete failed', true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] font-noto-sans text-gray-900">
      <AdminNavbar activeTab={tab} onTabChange={setTab} onLogout={logout} />

      <div
        className="pointer-events-none h-px w-full shrink-0"
        style={{
          background: 'linear-gradient(90deg, #c2e3ff 0%, #1e82e6 50%, #c2e3ff 100%)',
        }}
        aria-hidden
      />

      <main className="px-4 pb-14 pt-8 lg:px-[80px]">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-[clamp(26px,3vw,34px)] font-semibold leading-tight tracking-tight text-[#122a66]">
            {tab === 'contacts' && 'Contact leads'}
            {tab === 'blogs' && 'Blog posts'}
            {tab === 'gallery' && 'Gallery'}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-600">
            {tab === 'contacts' && 'Review and manage form submissions from the marketing site.'}
            {tab === 'blogs' && 'Create and edit articles shown on the public blog when published.'}
            {tab === 'gallery' && 'Add image URLs displayed in the CMS gallery section on the site.'}
          </p>

          {message ? (
            <div
              className="mt-6 rounded-[5px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
              role="status"
            >
              {message}
            </div>
          ) : null}
          {error ? (
            <div
              className="mt-6 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          <div className="mt-8">
            {tab === 'contacts' && (
              <div className={`overflow-x-auto ${panelClass} p-0`}>
                <table className="min-w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[#1e82e6]/25 bg-[#eef4fb] text-[11px] font-bold uppercase tracking-[0.12em] text-[#122a66]">
                      <th className="whitespace-nowrap px-4 py-3">Name</th>
                      <th className="whitespace-nowrap px-4 py-3">Email</th>
                      <th className="whitespace-nowrap px-4 py-3">Phone</th>
                      <th className="whitespace-nowrap px-4 py-3">Company</th>
                      <th className="min-w-[180px] px-4 py-3">Message</th>
                      <th className="whitespace-nowrap px-4 py-3">Created</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {contacts.map((c) => (
                      <tr key={c._id} className="text-gray-800">
                        <td className="max-w-[140px] truncate px-4 py-3 font-medium text-[#122a66]">{c.name}</td>
                        <td className="max-w-[180px] truncate px-4 py-3 text-gray-700">{c.email}</td>
                        <td className="max-w-[130px] truncate px-4 py-3 text-gray-600">{c.phone || '—'}</td>
                        <td className="max-w-[130px] truncate px-4 py-3 text-gray-600">{c.company || '—'}</td>
                        <td className="max-w-[220px] truncate px-4 py-3 text-gray-600">{c.message}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => deleteContact(c._id)}
                            className="text-[13px] font-semibold text-red-600 underline-offset-2 transition hover:text-red-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {contacts.length === 0 ? (
                  <p className="p-6 text-center text-[15px] text-gray-500">No leads yet.</p>
                ) : null}
              </div>
            )}

            {tab === 'blogs' && (
              <div className="space-y-10">
                <form onSubmit={submitBlog} className={`${panelClass} space-y-4`}>
                  <div>
                    <h2 className="text-lg font-semibold text-[#1e82e6]">
                      {editingBlogId ? 'Edit blog post' : 'New blog post'}
                    </h2>
                    <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
                      Fields use the same focus ring and borders as the site contact form.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="admin-blog-title" className={labelClass}>
                      Title
                    </label>
                    <input
                      id="admin-blog-title"
                      placeholder="Title"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-blog-content" className={labelClass}>
                      Content
                    </label>
                    <textarea
                      id="admin-blog-content"
                      placeholder="Content"
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      rows={8}
                      className={`${inputClass} min-h-[200px] resize-y`}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-blog-image" className={labelClass}>
                      Image URL (optional)
                    </label>
                    <input
                      id="admin-blog-image"
                      placeholder="https://…"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button type="submit" className={primaryBtnClass}>
                      {editingBlogId ? 'Update post' : 'Publish post'}
                    </button>
                    {editingBlogId ? (
                      <button type="button" onClick={cancelEditBlog} className={secondaryBtnClass}>
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </form>

                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">All posts</h3>
                  <ul className="mt-4 space-y-3">
                    {blogs.map((b) => (
                      <li
                        key={b._id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-[5px] border border-solid border-[#1e82e6]/35 bg-white px-4 py-3 shadow-sm transition hover:border-[#1e82e6]/60 hover:shadow-[0_4px_14px_rgba(30,130,230,0.1)]"
                      >
                        <span className="font-semibold text-[#122a66]">{b.title}</span>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => startEditBlog(b)}
                            className="text-[13px] font-semibold text-[#1e82e6] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteBlog(b._id)}
                            className="text-[13px] font-semibold text-red-600 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {blogs.length === 0 ? <p className="mt-4 text-[15px] text-gray-500">No blog posts yet.</p> : null}
                </div>
              </div>
            )}

            {tab === 'gallery' && (
              <div className="space-y-10">
                <form onSubmit={submitGallery} className={`${panelClass} max-w-xl space-y-4`}>
                  <h2 className="text-lg font-semibold text-[#1e82e6]">Add gallery image</h2>
                  <div>
                    <label htmlFor="admin-gal-url" className={labelClass}>
                      Image URL
                    </label>
                    <input
                      id="admin-gal-url"
                      placeholder="https://…"
                      value={galUrl}
                      onChange={(e) => setGalUrl(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-gal-title" className={labelClass}>
                      Title (optional)
                    </label>
                    <input
                      id="admin-gal-title"
                      placeholder="Caption"
                      value={galTitle}
                      onChange={(e) => setGalTitle(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <button type="submit" className={primaryBtnClass}>
                    Add to gallery
                  </button>
                </form>

                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Library</h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {gallery.map((g) => (
                      <div
                        key={g._id}
                        className="overflow-hidden rounded-[5px] border-2 border-[#1e82e6] bg-[#eef4fb] shadow-sm"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                          <img src={g.imageUrl} alt={g.title || ''} className="h-full w-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex items-center justify-between gap-2 border-t border-[#1e82e6]/20 bg-white px-3 py-2.5">
                          <span className="truncate text-[13px] font-medium text-[#122a66]">{g.title || 'Untitled'}</span>
                          <button
                            type="button"
                            onClick={() => deleteGallery(g._id)}
                            className="shrink-0 text-[12px] font-semibold text-red-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {gallery.length === 0 ? <p className="mt-4 text-[15px] text-gray-500">No gallery items yet.</p> : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
