-- Create service requests table
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert service requests
CREATE POLICY "Anyone can submit service requests"
ON public.service_requests
FOR INSERT
WITH CHECK (true);

-- Only admins can view all service requests
CREATE POLICY "Admins can view all service requests"
ON public.service_requests
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update service requests
CREATE POLICY "Admins can update service requests"
ON public.service_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete service requests
CREATE POLICY "Admins can delete service requests"
ON public.service_requests
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();