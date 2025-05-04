
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Play, 
  Pencil, 
  Trash, 
  FileAudio, 
  Upload, 
  Search,
  Plus,
  FileCheck,
  Volume2,
} from 'lucide-react';
import { allSermons } from '@/data/sermons';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    category: '',
    description: '',
  });
  const { toast } = useToast();
  
  const filteredSermons = allSermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an audio file
      if (selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setAudioFileName(selectedFile.name);
        
        // Show toast for successful file selection
        toast({
          title: "Fichier audio sélectionné",
          description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
        });
      } else {
        toast({
          title: "Format de fichier incorrect",
          description: "Veuillez sélectionner un fichier audio (.mp3, .wav, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (selectedFile.type.startsWith('image/')) {
        setImageFile(selectedFile);
        
        // Show toast for successful file selection
        toast({
          title: "Image sélectionnée",
          description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
        });
      } else {
        toast({
          title: "Format de fichier incorrect",
          description: "Veuillez sélectionner une image (.jpg, .png, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.title || !formData.preacher || !formData.category || !file || !imageFile) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would handle the upload process to your backend
    console.log('Form data:', formData);
    console.log('Files to upload:', { audio: file, image: imageFile });
    
    // Show success toast
    toast({
      title: "Sermon ajouté avec succès",
      description: `"${formData.title}" a été ajouté à la bibliothèque`,
    });
    
    // Reset form after submission
    setFile(null);
    setImageFile(null);
    setAudioFileName('');
    setFormData({
      title: '',
      preacher: '',
      category: '',
      description: '',
    });
  };

  return (
    <Layout withBottomNavPadding={false}>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      
      <Tabs defaultValue="sermons" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="sermons">Prédications</TabsTrigger>
          <TabsTrigger value="add">Ajouter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sermons" className="space-y-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Rechercher une prédication..." 
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Prédicateur</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSermons.map((sermon, index) => (
                  <TableRow key={sermon.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{sermon.title}</TableCell>
                    <TableCell>{sermon.preacher}</TableCell>
                    <TableCell>{sermon.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Play size={16} />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Pencil size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="add">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Titre de la prédication" 
                  value={formData.title}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="preacher">Prédicateur</Label>
                <Input 
                  id="preacher" 
                  name="preacher"
                  placeholder="Nom du prédicateur" 
                  value={formData.preacher}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <select 
                  id="category" 
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="amour">Amour</option>
                  <option value="saintete">Sainteté</option>
                  <option value="equilibre">Équilibre</option>
                  <option value="puissance">Puissance</option>
                  <option value="developpement">Développement</option>
                  <option value="mentalite">Changement de Mentalité</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  name="description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Description de la prédication"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="grid gap-2 border border-compa-600 rounded-lg p-4">
                <Label htmlFor="audio" className="flex items-center gap-2">
                  <Volume2 size={18} />
                  Fichier Audio (MP3 ou WAV)
                </Label>
                {file ? (
                  <div className="bg-compa-700/50 p-3 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <FileCheck size={18} className="mr-2 text-green-500" />
                      <span className="text-sm truncate max-w-[200px]">{audioFileName}</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setFile(null);
                        setAudioFileName('');
                      }}
                    >
                      Changer
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById('audio')?.click()}
                      variant="outline"
                      className="w-full flex gap-2 items-center justify-center"
                    >
                      <FileAudio size={16} />
                      Sélectionner un fichier MP3
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Format supporté: MP3, WAV (max. 50MB)
                </p>
              </div>
              
              <div className="grid gap-2 border border-compa-600 rounded-lg p-4">
                <Label htmlFor="image" className="mb-2">Image d'illustration</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('image')?.click()}
                    variant="outline" 
                    className="w-full flex gap-2 items-center justify-center"
                  >
                    <Upload size={16} />
                    {imageFile ? "Changer d'image" : "Sélectionner une image"}
                  </Button>
                </div>
                {imageFile && (
                  <div className="mt-2 w-full max-w-full">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="w-full h-auto max-h-[200px] object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Format supporté: JPG, PNG (max. 5MB)
                </p>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              <Plus size={16} className="mr-2" />
              Ajouter la prédication
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
