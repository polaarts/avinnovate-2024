"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Assuming the JSON data is imported or fetched
import concertData from './artistas_web.json'
import filteredConcertData from './artistas_web_filtrado.json'

export default function ConcertTickets() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const artistsPerPage = 9
  const allArtists = concertData[0].artistas
  const filteredArtists = filteredConcertData[0].artistas
  const artists = isLoggedIn ? filteredArtists : allArtists
  const totalPages = Math.ceil(artists.length / artistsPerPage)

  const indexOfLastArtist = currentPage * artistsPerPage
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist)

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage(1) // Reset to first page when logging in
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage(1) // Reset to first page when logging out
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ConcertTix</h1>
          <div className="space-x-4 flex items-center">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Events</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
            {isLoggedIn ? (
              <Button variant="secondary" className="flex items-center" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="secondary" className="flex items-center" onClick={handleLogin}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Login with Spotify
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="bg-secondary text-secondary-foreground py-20">
        <div className="container mx-auto text-center">
          {isLoggedIn ? (
            <h2 className="text-4xl font-bold mb-4">¡Hola, Usuario de Spotify!</h2>
          ) : (
            <h2 className="text-4xl font-bold mb-4">Find Your Next Concert Experience</h2>
          )}
          <p className="text-xl mb-8">Discover amazing artists and unforgettable performances</p>
          <Button size="lg">Browse All Events</Button>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {isLoggedIn ? "Your Recommended Concerts" : "Featured Concerts"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArtists.map((artist) => (
            <Card key={artist.artist_id} className="flex flex-col">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{artist.artist_name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <img
                  src={artist.photo_url}
                  alt={artist.artist_name}
                  className="w-full h-40 object-cover mb-2 rounded-md"
                />
                <p className="text-sm"><strong>Genres:</strong> {artist.genres.join(', ')}</p>
                <p className="text-sm"><strong>Date:</strong> {artist.concert_date}</p>
                <p className="text-sm"><strong>Time:</strong> {artist.concert_time}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full">Comprar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex flex-col items-center mt-8">
          <div className="flex justify-between items-center w-full mb-4">
            <Button onClick={prevPage} disabled={currentPage === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <span>Página {currentPage} de {totalPages}</span>
            <Button onClick={nextPage} disabled={currentPage === totalPages}>
              Siguiente <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {isLoggedIn && (
            <Button variant="outline" onClick={handleLogout} className="mt-4">
              Ver todos los conciertos
            </Button>
          )}
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">About Us</h3>
            <p className="text-sm">ConcertTix is your go-to platform for the best concert experiences.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact Us</h3>
            <p className="text-sm">Email: info@concerttix.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          © 2024 ConcertTix. All rights reserved.
        </div>
      </footer>
    </div>
  )
}