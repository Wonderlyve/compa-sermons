
import React, { useState } from 'react';
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
  ArrowLeft,
  Bell,
  Menu,
  Calendar,
  BookOpen,
  Radio as RadioIcon,
  Layers
} from 'lucide-react';
import { allSermons, recentRadioSermons } from '@/data/sermons';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { categories } from '@/data/categories';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('sermons');
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
  const navigate = useNavigate();
  
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-compa-800 pb-16">
      {/* Custom header */}
      <div className="px-3">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white h-8 w-8 p-1.5" 
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="text-white h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <Link to="/profile">
              <Avatar className="h-7 w-7 border border-compa-600">
                <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white h-7 w-7 p-1.5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="mb-4">
                  <SheetTitle>Admin Menu</SheetTitle>
                </SheetHeader>
                <div className="space-y-3">
                  <Button
                    variant="ghost" 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('sermons')}
                  >
                    <FileAudio className="mr-2 h-4 w-4" />
                    Prédications
                  </Button>
                  <Button
                    variant="ghost" 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('categories')}
                  >
                    <Layers className="mr-2 h-4 w-4" />
                    Catégories
                  </Button>
                  <Button
                    variant="ghost" 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('radio')}
                  >
                    <RadioIcon className="mr-2 h-4 w-4" />
                    Radio
                  </Button>
                  <Button
                    variant="ghost" 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('programme')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Programme
                  </Button>
                  <Button
                    variant="ghost" 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('daily-bread')}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Pain du jour
                  </Button>
                  <hr className="border-compa-700" />
                  <Link to="/" className="block">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Retour à l'accueil
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      <main className="px-3 py-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="sermons">Prédications</TabsTrigger>
            <TabsTrigger value="add">Ajouter</TabsTrigger>
          </TabsList>
          
          {/* Sermon management tab */}
          <TabsContent value="sermons" className="space-y-4">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
          
          {/* Add sermon tab */}
          <TabsContent value="add">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
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
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Description de la prédication"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <div className="grid gap-2 border border-compa-600 rounded-lg p-3">
                  <Label htmlFor="audio" className="flex items-center gap-2">
                    <Volume2 size={16} />
                    Fichier Audio (MP3 ou WAV)
                  </Label>
                  {file ? (
                    <div className="bg-compa-700/50 p-2 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileCheck size={16} className="mr-2 text-green-500" />
                        <span className="text-xs truncate max-w-[200px]">{audioFileName}</span>
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
                        <FileAudio size={14} />
                        Sélectionner un fichier MP3
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-400">
                    Format supporté: MP3, WAV (max. 50MB)
                  </p>
                </div>
                
                <div className="grid gap-2 border border-compa-600 rounded-lg p-3">
                  <Label htmlFor="image" className="mb-1">Image d'illustration</Label>
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
                      <Upload size={14} />
                      {imageFile ? "Changer d'image" : "Sélectionner une image"}
                    </Button>
                  </div>
                  {imageFile && (
                    <div className="mt-2 w-full max-w-full">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="w-full h-auto max-h-[150px] object-cover rounded-md"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-400">
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
          
          {/* Category management tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-white">Gestion des catégories</h2>
              <Button size="sm">
                <Plus size={16} className="mr-1" />
                Nouvelle catégorie
              </Button>
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="glass-card p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img 
                        src={category.imageUrl} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{category.name}</h3>
                      <p className="text-xs text-gray-400">{category.count} sermons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Pencil size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Radio management tab */}
          <TabsContent value="radio" className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-white">Diffusions récentes</h2>
              <Button size="sm">
                <Plus size={16} className="mr-1" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-3">
              {recentRadioSermons.map((sermon) => (
                <div key={sermon.id} className="glass-card p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img 
                        src={sermon.imageUrl} 
                        alt={sermon.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">{sermon.title}</h3>
                      <p className="text-xs text-gray-400">{sermon.preacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Pencil size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Programme management tab */}
          <TabsContent value="programme" className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-white">Événements</h2>
              <Button size="sm">
                <Plus size={16} className="mr-1" />
                Nouvel événement
              </Button>
            </div>
            <div className="space-y-3">
              <div className="glass-card p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507692049790-de58290a4abd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Veillée de prière"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Veillée de prière</h3>
                    <p className="text-xs text-gray-400">25 Mai 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
              <div className="glass-card p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Séminaire Famille"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Séminaire Famille</h3>
                    <p className="text-xs text-gray-400">2 Juin 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Daily Bread management tab */}
          <TabsContent value="daily-bread" className="space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-white">Pain du jour</h2>
              <Button size="sm">
                <Plus size={16} className="mr-1" />
                Nouvelle étude
              </Button>
            </div>
            <div className="space-y-3">
              <div className="glass-card p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800" 
                      alt="La foi qui déplace les montagnes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">La foi qui déplace les montagnes</h3>
                    <p className="text-xs text-gray-400">Matthieu 17:20</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
              <div className="glass-card p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1518826778770-a9a28dac0769?auto=format&fit=crop&q=80&w=800" 
                      alt="L'amour inconditionnel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">L'amour inconditionnel</h3>
                    <p className="text-xs text-gray-400">1 Corinthiens 13:4-7</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
