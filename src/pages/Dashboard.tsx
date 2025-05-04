
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
  Plus
} from 'lucide-react';
import { allSermons } from '@/data/sermons';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const filteredSermons = allSermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the upload process to your backend
    console.log('Files to upload:', { audio: file, image: imageFile });
    // Reset form after submission
    setFile(null);
    setImageFile(null);
    (e.target as HTMLFormElement).reset();
    alert('Sermon added successfully! (This is a demo, no actual upload performed)');
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
                <Input id="title" placeholder="Titre de la prédication" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="preacher">Prédicateur</Label>
                <Input id="preacher" placeholder="Nom du prédicateur" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <select 
                  id="category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Description de la prédication"
                ></textarea>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="audio">Fichier Audio</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="audio"
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileChange}
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('audio')?.click()}
                    className="flex gap-2 items-center"
                  >
                    <FileAudio size={16} />
                    {file ? file.name : "Sélectionner un fichier audio"}
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Image d'illustration</Label>
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
                    className="flex gap-2 items-center"
                  >
                    <Upload size={16} />
                    {imageFile ? imageFile.name : "Sélectionner une image"}
                  </Button>
                </div>
                {imageFile && (
                  <div className="mt-2 w-full max-w-[200px]">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}
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
