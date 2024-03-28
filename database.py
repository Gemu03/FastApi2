from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

URL_DATABASE = 'mysql+pymysql://sql10691174:Tl7JJAkI61@sql10.freesqldatabase.com:3306/sql10691174'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
