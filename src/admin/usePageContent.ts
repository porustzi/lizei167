import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface PageContentRow {
  id: string;
  page_name: string;
  content: any;
  updated_at: string;
}

export function usePageContent(pageName: string) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('page_content')
      .select('content')
      .eq('page_name', pageName)
      .single();
    if (err && err.code !== 'PGRST116') {
      setError(err.message);
    } else if (data) {
      setContent((data as PageContentRow).content);
    }
    setLoading(false);
  }, [pageName]);

  useEffect(() => { load(); }, [load]);

  const save = async (newContent: any) => {
    setSaving(true);
    setError('');
    setSuccess('');
    const { error: err } = await supabase
      .from('page_content')
      .upsert({ page_name: pageName, content: newContent, updated_at: new Date().toISOString() },
        { onConflict: 'page_name' }
      );
    if (err) {
      setError(err.message);
    } else {
      setContent(newContent);
      setSuccess('Збережено!');
      setTimeout(() => setSuccess(''), 3000);
    }
    setSaving(false);
  };

  return { content, setContent, loading, saving, error, success, load, save };
}
