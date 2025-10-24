import Image from "next/image";

export default function Home() {
  const stores = [
    {
      name: "TechZone",
      logo: "/logos/techzone.png",
      products: [
        { id: 1, name: "Notebook Gamer", image: "/products/notebook.png" },
        { id: 2, name: "Headset Pro", image: "/products/headset.png" },
        { id: 3, name: "Mouse RGB", image: "/products/mouse.png" },
        { id: 4, name: "Headset Pro", image: "/products/headset.png" },
        { id: 5, name: "Mouse RGB", image: "/products/mouse.png" },
      ],
    },
    {
      name: "Casa & Cozinha",
      logo: "/logos/kitchen.png",
      products: [
        {
          id: 1,
          name: "Liquidificador",
          image: "/products/liquidificador.png",
        },
        { id: 2, name: "Panela Elétrica", image: "/products/panela.png" },
        { id: 3, name: "Cafeteira", image: "/products/cafeteira.png" },
        { id: 4, name: "Panela Elétrica", image: "/products/panela.png" },
        { id: 5, name: "Cafeteira", image: "/products/cafeteira.png" },
      ],
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-[80vw] bg-secondary-light py-8 px-8 flex justify-between items-center absolute top-10 z-50 backdrop-blur-md left-[50%] -translate-x-[50%] rounded-4xl">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide">
          Ecommerce
        </h1>
        <nav className="flex text-button gap-10 text-gray-700 font-medium">
          <a href="#stores" className="hover:text-secondary transition">
            Lojas
          </a>
          <a href="#contact" className="hover:text-secondary transition">
            Contato
          </a>
        </nav>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-36 bg-gradient-to-r from-blue-50 to-blue-100 pt-[15rem] rounded-b-3xl shadow-sm">
        <div className="flex-1 flex justify-center">
          <div className="w-[50rem] h-[40rem] ">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Encontre tudo o que você precisa em um só lugar!
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              cumque, rem accusamus natus
            </p>
            <button className="bg-secondary text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition transform font-semibold">
              Explorar lojas
            </button>
          </div>
        </div>
        <div className="flex-1 mt-12 md:mt-0 flex justify-center">
          <Image
            src="/assets/placeholder.png"
            alt="Compras online"
            width={500}
            height={400}
            className="rounded-xl shadow-sm bg-white"
          />
        </div>
      </section>

      <section id="stores" className="px-8 md:px-20 py-20 space-y-20">
        {stores.map((store) => (
          <div key={store.name}>
            <div className="flex justify-start mb-10">
              <div className="w-[10rem] h-[10rem] cursor-pointer rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transform hover:scale-105 transition">
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
              {store.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white cursor-pointer rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center transform hover:-translate-y-[0.2px]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mx-auto mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="bg-gray-900 text-gray-300 text-center py-8">
        <p className="mb-4">
          © {new Date().getFullYear()} Ecommerce. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
